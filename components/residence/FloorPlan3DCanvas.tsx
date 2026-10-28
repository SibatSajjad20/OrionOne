"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Edges, Line, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import gsap from "gsap";
import type {
  FloorPlanData,
  FloorPlanRoom,
  WallOpening,
} from "@/app/residence/plans/types";

export type FloorPlanViewMode = "top" | "iso" | "walkthrough";

export interface JoystickVector {
  /** -1 (left) to +1 (right) */
  x: number;
  /** -1 (backward) to +1 (forward) */
  y: number;
}

interface WallBoxPiece {
  key: string;
  position: [number, number, number];
  rotationY: number;
  size: [number, number, number];
}

interface CollisionSegment {
  x1: number;
  z1: number;
  x2: number;
  z2: number;
  thickness: number;
}

/**
 * Decomposes each wall [x1, y1, x2, y2, thickness] into 3D box segments
 * leaving door and window openings cut out cleanly, and builds 2D collision segments
 * for solid wall parts at eye/body height (doors are passable in walkthrough mode).
 */
function buildWallsAndCollisions(plan: FloorPlanData): {
  pieces: WallBoxPiece[];
  collisions: CollisionSegment[];
} {
  const pieces: WallBoxPiece[] = [];
  const collisions: CollisionSegment[] = [];
  const H = plan.wallHeight || 2.8;

  plan.walls.forEach((wall, wallIdx) => {
    const [x1, z1, x2, z2, thickness] = wall;
    const dx = x2 - x1;
    const dz = z2 - z1;
    const length = Math.hypot(dx, dz);
    if (length < 0.01) return;

    const dirX = dx / length;
    const dirZ = dz / length;
    const rotationY = -Math.atan2(dz, dx);

    const wallOpenings: WallOpening[] = plan.openings
      .filter((o) => o.wallIndex === wallIdx)
      .sort((a, b) => a.offset - b.offset);

    const addPiece = (
      uStart: number,
      uEnd: number,
      vBottom: number,
      vTop: number,
      suffix: string
    ) => {
      const segLen = uEnd - uStart;
      const segHeight = vTop - vBottom;
      if (segLen <= 0.01 || segHeight <= 0.01) return;

      const uMid = (uStart + uEnd) * 0.5;
      const vMid = (vBottom + vTop) * 0.5;
      const cx = x1 + dirX * uMid;
      const cz = z1 + dirZ * uMid;

      pieces.push({
        key: `w-${wallIdx}-${suffix}`,
        position: [cx, vMid, cz],
        rotationY,
        size: [segLen, segHeight, thickness],
      });
    };

    const addCollision = (uStart: number, uEnd: number) => {
      if (uEnd - uStart <= 0.02) return;
      collisions.push({
        x1: x1 + dirX * uStart,
        z1: z1 + dirZ * uStart,
        x2: x1 + dirX * uEnd,
        z2: z1 + dirZ * uEnd,
        thickness,
      });
    };

    let cursor = 0;
    wallOpenings.forEach((op, opIdx) => {
      const uStart = Math.max(cursor, Math.min(length, op.offset));
      const uEnd = Math.max(uStart, Math.min(length, op.offset + op.width));

      // Solid full-height wall before opening
      if (uStart > cursor + 0.01) {
        addPiece(cursor, uStart, 0, H, `pre-${opIdx}`);
        addCollision(cursor, uStart);
      }

      // Sill below window
      if (op.sillHeight > 0.02) {
        addPiece(uStart, uEnd, 0, op.sillHeight, `sill-${opIdx}`);
      }

      // Header / lintel above door or window
      const topOfOpening = op.sillHeight + op.height;
      if (topOfOpening < H - 0.02) {
        addPiece(uStart, uEnd, topOfOpening, H, `lintel-${opIdx}`);
      }

      // Windows block walkthrough movement; doors remain passable
      if (op.type === "window") {
        addCollision(uStart, uEnd);
      }

      cursor = uEnd;
    });

    // Solid full-height wall after last opening
    if (cursor < length - 0.01) {
      addPiece(cursor, length, 0, H, "tail");
      addCollision(cursor, length);
    }
  });

  return { pieces, collisions };
}

/**
 * Resolves circle vs line-segment collisions in the XZ plane so the walkthrough
 * camera slides cleanly along walls without passing through them.
 */
function resolveWallCollisions(
  nextX: number,
  nextZ: number,
  collisions: CollisionSegment[],
  playerRadius = 0.28
): [number, number] {
  let x = nextX;
  let z = nextZ;

  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < collisions.length; i++) {
      const seg = collisions[i];
      const abX = seg.x2 - seg.x1;
      const abZ = seg.z2 - seg.z1;
      const abLenSq = abX * abX + abZ * abZ;
      if (abLenSq < 1e-6) continue;

      const apX = x - seg.x1;
      const apZ = z - seg.z1;
      const t = Math.max(0, Math.min(1, (apX * abX + apZ * abZ) / abLenSq));

      const closestX = seg.x1 + t * abX;
      const closestZ = seg.z1 + t * abZ;

      const distX = x - closestX;
      const distZ = z - closestZ;
      const distSq = distX * distX + distZ * distZ;
      const minDist = playerRadius + seg.thickness * 0.5;

      if (distSq < minDist * minDist) {
        const dist = Math.sqrt(distSq) || 0.0001;
        const overlap = minDist - dist;
        x += (distX / dist) * overlap;
        z += (distZ / dist) * overlap;
      }
    }
  }

  return [x, z];
}

interface RoomFloorMeshProps {
  room: FloorPlanRoom;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (room: FloorPlanRoom | null) => void;
  onSelect: (room: FloorPlanRoom) => void;
}

function RoomFloorMesh({
  room,
  isHovered,
  isSelected,
  onHover,
  onSelect,
}: RoomFloorMeshProps) {
  const { invalidate } = useThree();

  const { shapeGeometry, borderPoints } = useMemo(() => {
    const shape = new THREE.Shape();
    const borderPts: Array<[number, number, number]> = [];

    room.polygon.forEach(([px, pz], idx) => {
      // Because mesh is rotated -PI/2 around X, shape (x, -z) maps to world (x, 0, z)
      if (idx === 0) {
        shape.moveTo(px, -pz);
      } else {
        shape.lineTo(px, -pz);
      }
      borderPts.push([px, 0.012, pz]);
    });

    if (room.polygon.length > 0) {
      const [fx, fz] = room.polygon[0];
      shape.closePath();
      borderPts.push([fx, 0.012, fz]);
    }

    const geom = new THREE.ShapeGeometry(shape);

    return {
      shapeGeometry: geom,
      borderPoints: borderPts,
    };
  }, [room]);

  useEffect(() => {
    return () => {
      shapeGeometry.dispose();
    };
  }, [shapeGeometry]);

  // Floor in slightly darker sand than walls (#EDE5DA)
  const baseFloorColor = room.kind === "exterior" ? "#D6C9B8" : "#E1D7C8";
  const activeHighlight = isHovered || isSelected;

  return (
    <group>
      {/* Base Matte Floor Plane */}
      <mesh
        geometry={shapeGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.004, 0]}
        receiveShadow
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onHover(room);
          invalidate();
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onHover(null);
          invalidate();
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect(room);
          invalidate();
        }}
      >
        <meshStandardMaterial
          color={baseFloorColor}
          roughness={0.95}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Low-Opacity Mint #62AA9E Highlight Overlay on Hovered / Selected Room */}
      {activeHighlight && (
        <mesh
          geometry={shapeGeometry}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.018, 0]}
        >
          <meshBasicMaterial
            color="#62AA9E"
            transparent
            opacity={isHovered ? 0.32 : 0.22}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Architectural Room Outline in Moss #153D3D */}
      <Line
        points={borderPoints}
        color="#153D3D"
        lineWidth={activeHighlight ? 1.5 : 1}
        transparent
        opacity={activeHighlight ? 0.85 : 0.35}
      />
    </group>
  );
}

interface RoomLabelAnchor {
  room: FloorPlanRoom;
  pos: [number, number, number];
}

const _tempLabelVec = new THREE.Vector3();

function RoomLabelsProjector({
  roomAnchors,
  labelElementsRef,
  showLabels,
}: {
  roomAnchors: RoomLabelAnchor[];
  labelElementsRef: React.RefObject<Map<string, HTMLDivElement>>;
  showLabels: boolean;
}) {
  const { camera, size } = useThree();

  useFrame(() => {
    const elMap = labelElementsRef.current;
    if (!elMap) return;

    if (!showLabels) {
      elMap.forEach((el) => {
        el.style.display = "none";
      });
      return;
    }

    camera.updateMatrixWorld();
    const halfW = size.width * 0.5;
    const halfH = size.height * 0.5;

    for (let i = 0; i < roomAnchors.length; i++) {
      const { room, pos } = roomAnchors[i];
      const el = elMap.get(room.id);
      if (!el) continue;

      _tempLabelVec.set(pos[0], pos[1], pos[2]);
      _tempLabelVec.project(camera);

      // Occlude if behind camera plane (z > 1)
      if (_tempLabelVec.z > 1) {
        el.style.display = "none";
        continue;
      }

      const x = _tempLabelVec.x * halfW + halfW;
      const y = -_tempLabelVec.y * halfH + halfH;

      el.style.display = "block";
      el.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    }
  });

  return null;
}

interface SceneControllerProps {
  plan: FloorPlanData;
  viewMode: FloorPlanViewMode;
  collisions: CollisionSegment[];
  joystickRef: React.MutableRefObject<JoystickVector>;
  bounds: {
    centerX: number;
    centerZ: number;
    spanX: number;
    spanZ: number;
  };
}

function SceneController({
  plan,
  viewMode,
  collisions,
  joystickRef,
  bounds,
}: SceneControllerProps) {
  const { camera, gl, invalidate } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  // Walkthrough state
  const walkPosRef = useRef<THREE.Vector3>(
    new THREE.Vector3(...plan.walkthroughStart.position)
  );
  const walkYawRef = useRef<number>(plan.walkthroughStart.yaw);
  const walkPitchRef = useRef<number>(0);
  const keysRef = useRef<Record<string, boolean>>({});
  const isTransitioningRef = useRef<boolean>(false);
  const isDraggingLookRef = useRef<boolean>(false);
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Animate transitions between Top-Down, Isometric Orbit, and Walkthrough with GSAP
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const controls = controlsRef.current;

    gsap.killTweensOf(cam.position);
    gsap.killTweensOf(cam);
    if (controls) {
      gsap.killTweensOf(controls.target);
    }

    isTransitioningRef.current = true;

    const proxyTarget = controls
      ? controls.target.clone()
      : new THREE.Vector3(bounds.centerX, 0, bounds.centerZ);

    let destPos: THREE.Vector3;
    let destTarget: THREE.Vector3;
    let destFov: number;

    if (viewMode === "top") {
      destPos = new THREE.Vector3(bounds.centerX, 23.5, bounds.centerZ + 0.01);
      destTarget = new THREE.Vector3(bounds.centerX, 0, bounds.centerZ);
      destFov = 30;
    } else if (viewMode === "iso") {
      destPos = new THREE.Vector3(
        bounds.centerX + 8.5,
        11.2,
        bounds.centerZ + 11.2
      );
      destTarget = new THREE.Vector3(bounds.centerX, 0.8, bounds.centerZ);
      destFov = 38;
    } else {
      // Walkthrough at eye height 1.6m
      const startPos = walkPosRef.current;
      startPos.y = 1.6;
      const yaw = walkYawRef.current;
      const pitch = walkPitchRef.current;
      destPos = startPos.clone();
      destTarget = new THREE.Vector3(
        startPos.x + Math.sin(yaw) * Math.cos(pitch) * 2.5,
        1.6 + Math.sin(pitch) * 2.5,
        startPos.z - Math.cos(yaw) * Math.cos(pitch) * 2.5
      );
      destFov = 62;
    }

    if (controls) {
      controls.enabled = false;
    }

    const tl = gsap.timeline({
      defaults: { duration: 1.05, ease: "power3.inOut" },
      onUpdate: () => {
        cam.updateProjectionMatrix();
        if (controls) {
          controls.target.copy(proxyTarget);
        }
        cam.lookAt(proxyTarget);
        invalidate();
      },
      onComplete: () => {
        isTransitioningRef.current = false;
        if (controls && viewMode !== "walkthrough") {
          controls.target.copy(destTarget);
          controls.enabled = true;
          controls.update();
        }
        invalidate();
      },
    });

    tl.to(
      cam.position,
      { x: destPos.x, y: destPos.y, z: destPos.z },
      0
    )
      .to(
        proxyTarget,
        { x: destTarget.x, y: destTarget.y, z: destTarget.z },
        0
      )
      .to(cam, { fov: destFov }, 0);

    return () => {
      tl.kill();
    };
  }, [viewMode, bounds.centerX, bounds.centerZ, camera, invalidate]);

  // Keyboard & pointer-look listeners for Walkthrough mode
  useEffect(() => {
    if (viewMode !== "walkthrough") {
      keysRef.current = {};
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      if (
        code === "KeyW" ||
        code === "KeyA" ||
        code === "KeyS" ||
        code === "KeyD" ||
        code === "ArrowUp" ||
        code === "ArrowDown" ||
        code === "ArrowLeft" ||
        code === "ArrowRight" ||
        code === "KeyQ" ||
        code === "KeyE"
      ) {
        keysRef.current[code] = true;
        if (code.startsWith("Arrow")) {
          e.preventDefault();
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    const domElement = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingLookRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingLookRef.current) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };

      walkYawRef.current -= dx * 0.0045;
      walkPitchRef.current = Math.max(
        -0.55,
        Math.min(0.55, walkPitchRef.current - dy * 0.0035)
      );
    };

    const onPointerUp = () => {
      isDraggingLookRef.current = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [viewMode, gl.domElement]);

  // Walkthrough movement loop (1.6m eye height + wall collision)
  useFrame((_, delta) => {
    if (viewMode !== "walkthrough" || isTransitioningRef.current) return;

    const dt = Math.min(delta, 0.1);
    const keys = keysRef.current;
    const joy = joystickRef.current;

    // Optional keyboard rotation with Q / E
    if (keys["KeyQ"]) walkYawRef.current -= 1.6 * dt;
    if (keys["KeyE"]) walkYawRef.current += 1.6 * dt;

    let forwardInput = 0;
    let strafeInput = 0;

    if (keys["KeyW"] || keys["ArrowUp"]) forwardInput += 1;
    if (keys["KeyS"] || keys["ArrowDown"]) forwardInput -= 1;
    if (keys["KeyD"] || keys["ArrowRight"]) strafeInput += 1;
    if (keys["KeyA"] || keys["ArrowLeft"]) strafeInput -= 1;

    forwardInput += joy.y;
    strafeInput += joy.x;

    const mag = Math.hypot(forwardInput, strafeInput);
    if (mag > 1) {
      forwardInput /= mag;
      strafeInput /= mag;
    }

    const yaw = walkYawRef.current;
    const pitch = walkPitchRef.current;

    if (Math.abs(forwardInput) > 0.01 || Math.abs(strafeInput) > 0.01) {
      const speed = 2.65; // metres per second walking pace
      const fwdX = Math.sin(yaw);
      const fwdZ = -Math.cos(yaw);
      const rightX = Math.cos(yaw);
      const rightZ = Math.sin(yaw);

      const candidateX =
        walkPosRef.current.x +
        (fwdX * forwardInput + rightX * strafeInput) * speed * dt;
      const candidateZ =
        walkPosRef.current.z +
        (fwdZ * forwardInput + rightZ * strafeInput) * speed * dt;

      // Clamp to outer plan bounds + resolve wall collisions
      const clampedX = Math.max(-6.0, Math.min(9.6, candidateX));
      const clampedZ = Math.max(0.28, Math.min(7.62, candidateZ));

      const [resolvedX, resolvedZ] = resolveWallCollisions(
        clampedX,
        clampedZ,
        collisions,
        0.28
      );

      walkPosRef.current.set(resolvedX, 1.6, resolvedZ);
    }

    camera.position.copy(walkPosRef.current);
    const lookTarget = new THREE.Vector3(
      walkPosRef.current.x + Math.sin(yaw) * Math.cos(pitch) * 2.5,
      1.6 + Math.sin(pitch) * 2.5,
      walkPosRef.current.z - Math.cos(yaw) * Math.cos(pitch) * 2.5
    );
    camera.lookAt(lookTarget);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enableRotate={viewMode === "iso"}
      enablePan={viewMode !== "walkthrough"}
      enableZoom={viewMode !== "walkthrough"}
      minPolarAngle={viewMode === "top" ? 0 : 0.12}
      maxPolarAngle={viewMode === "top" ? 0.01 : Math.PI / 2 - 0.08}
      minDistance={4.5}
      maxDistance={32}
      onChange={() => invalidate()}
    />
  );
}

export interface FloorPlan3DCanvasProps {
  plan: FloorPlanData;
  viewMode: FloorPlanViewMode;
  hoveredRoom: FloorPlanRoom | null;
  selectedRoom: FloorPlanRoom | null;
  onHoverRoom: (room: FloorPlanRoom | null) => void;
  onSelectRoom: (room: FloorPlanRoom) => void;
  joystickRef: React.MutableRefObject<JoystickVector>;
}

export default function FloorPlan3DCanvas({
  plan,
  viewMode,
  hoveredRoom,
  selectedRoom,
  onHoverRoom,
  onSelectRoom,
  joystickRef,
}: FloorPlan3DCanvasProps) {
  const { pieces, collisions } = useMemo(
    () => buildWallsAndCollisions(plan),
    [plan]
  );

  const bounds = useMemo(() => {
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;

    plan.rooms.forEach((r) => {
      r.polygon.forEach(([x, z]) => {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;
      });
    });

    const centerX = (minX + maxX) * 0.5;
    const centerZ = (minZ + maxZ) * 0.5;
    return {
      centerX,
      centerZ,
      spanX: maxX - minX,
      spanZ: maxZ - minZ,
    };
  }, [plan]);

  const labelElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const roomLabelAnchors = useMemo<RoomLabelAnchor[]>(() => {
    return plan.rooms.map((room) => {
      let lx = 0;
      let lz = 0;
      if (room.labelPosition) {
        [lx, lz] = room.labelPosition;
      } else if (room.polygon.length > 0) {
        room.polygon.forEach(([px, pz]) => {
          lx += px;
          lz += pz;
        });
        lx /= room.polygon.length;
        lz /= room.polygon.length;
      }
      return {
        room,
        pos: [lx, 0.08, lz],
      };
    });
  }, [plan]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={viewMode === "walkthrough" ? "always" : "demand"}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{
          position: [
            bounds.centerX + 8.5,
            11.2,
            bounds.centerZ + 11.2,
          ],
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        {/* Calm Architectural Lighting: Soft Directional Sun + Ambient + ContactShadows */}
        <ambientLight intensity={0.82} color="#FFFDF9" />
        <directionalLight
          position={[11, 18, 13]}
          intensity={1.1}
          color="#FFF9F0"
          castShadow
          shadow-mapSize={[512, 512]}
          shadow-bias={-0.0005}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-12, 12, 12, -12, 1, 40]}
          />
        </directionalLight>

        <ContactShadows
          position={[bounds.centerX, 0.001, bounds.centerZ]}
          opacity={0.28}
          scale={24}
          blur={2.1}
          far={4.0}
          resolution={256}
          frames={1}
          color="#153D3D"
        />

        {/* Room Floor Polygons */}
        <group>
          {plan.rooms.map((room) => (
            <RoomFloorMesh
              key={room.id}
              room={room}
              isHovered={hoveredRoom?.id === room.id}
              isSelected={selectedRoom?.id === room.id}
              onHover={onHoverRoom}
              onSelect={onSelectRoom}
            />
          ))}
        </group>

        {/* Extruded 2.8m Matte Walls in Sand #EDE5DA with Moss #153D3D Architectural Edges */}
        <group>
          {pieces.map((piece) => (
            <mesh
              key={piece.key}
              position={piece.position}
              rotation={[0, piece.rotationY, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={piece.size} />
              <meshStandardMaterial
                color="#EDE5DA"
                roughness={0.92}
                metalness={0}
              />
              <Edges threshold={15} color="#153D3D" />
            </mesh>
          ))}
        </group>

        {/* 2D Projection for HTML Room Labels */}
        <RoomLabelsProjector
          roomAnchors={roomLabelAnchors}
          labelElementsRef={labelElementsRef}
          showLabels={viewMode !== "walkthrough"}
        />

        {/* Camera & Controls with GSAP Transitions */}
        <SceneController
          plan={plan}
          viewMode={viewMode}
          collisions={collisions}
          joystickRef={joystickRef}
          bounds={bounds}
        />
      </Canvas>

      {/* 2D HTML Room Labels Overlay (React 19 Safe: Zero Secondary Roots) */}
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-200 z-20 ${
          viewMode === "walkthrough" ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        {plan.rooms.map((room) => {
          const isHovered = hoveredRoom?.id === room.id;
          const isSelected = selectedRoom?.id === room.id;
          const activeHighlight = isHovered || isSelected;
          const isCompactCloset = room.area < 2.0;
          const shouldShow = !isCompactCloset || activeHighlight;

          return (
            <div
              key={room.id}
              ref={(el) => {
                const map = labelElementsRef.current;
                if (!map) return;
                if (el) map.set(room.id, el);
                else map.delete(room.id);
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                willChange: "transform",
                display: "none",
              }}
              className="pointer-events-none"
            >
              <div
                className={`font-sans-body select-none whitespace-nowrap rounded px-1.5 py-0.5 text-center transition-all duration-200 pointer-events-auto cursor-pointer ${
                  activeHighlight
                    ? "bg-[#EDE5DA]/95 border border-[#153D3D]/40 scale-105 shadow-sm"
                    : "bg-[#EDE5DA]/80 hover:bg-[#EDE5DA]"
                } ${shouldShow ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onPointerOver={() => onHoverRoom(room)}
                onPointerOut={() => onHoverRoom(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRoom(room);
                }}
              >
                <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] text-[#153D3D] leading-tight">
                  {room.name}
                </div>
                <div className="text-[8px] sm:text-[9px] font-medium tracking-[0.08em] text-[#153D3D]/80 leading-tight">
                  {room.areaLabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
