"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export interface OrionLogoTargetRefs {
  scene1?: React.RefObject<HTMLElement | null>;
  scene2?: React.RefObject<HTMLElement | null>;
  scene3?: React.RefObject<HTMLElement | null>;
  col1?: React.RefObject<HTMLElement | null>;
  col2?: React.RefObject<HTMLElement | null>;
  col3?: React.RefObject<HTMLElement | null>;
  scene5?: React.RefObject<HTMLElement | null>;
  scene6?: React.RefObject<HTMLElement | null>;
}

interface OrionLogoScrollWheelProps {
  progressRef?: React.MutableRefObject<number>;
  targetRef?: React.RefObject<HTMLElement | null>;
  targetRefs?: OrionLogoTargetRefs;
  onWheelClick?: () => void;
  isLoaded?: boolean;
}

interface AnchorCoord {
  x: number;
  y: number;
  size: number;
}

const smoothstep = (t: number) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};

const lerpCoord = (a: AnchorCoord, b: AnchorCoord, t: number): AnchorCoord => {
  return {
    x: (1 - t) * a.x + t * b.x,
    y: (1 - t) * a.y + t * b.y,
    size: (1 - t) * a.size + t * b.size,
  };
};

export default function OrionLogoScrollWheel({
  progressRef,
  targetRef,
  targetRefs,
  onWheelClick,
  isLoaded = true,
}: OrionLogoScrollWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const isHoveredRef = useRef(false);

  // Three.js instances ref
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const logoGroupRef = useRef<THREE.Group | null>(null);
  const pivotGroupRef = useRef<THREE.Group | null>(null);

  // Smooth dampening refs
  const smoothedProgressRef = useRef(0);
  const currentHoverScaleRef = useRef(1);

  // Intro loading spin (1080° + 2s pause) and travel animation state
  const introTravelRef = useRef({ progress: isLoaded ? 1 : 0 });
  const currentLoadingSpinYRef = useRef(0);
  const startTravelAngleRef = useRef(0);
  const targetTravelAngleRef = useRef(0);
  const prevLoadedRef = useRef(isLoaded);

  // Stable prop holders to prevent any effect re-runs
  const targetRefsHolder = useRef<OrionLogoTargetRefs | undefined>(targetRefs);
  targetRefsHolder.current = targetRefs;
  const targetRefHolder = useRef<React.RefObject<HTMLElement | null> | undefined>(targetRef);
  targetRefHolder.current = targetRef;
  const progressRefHolder = useRef(progressRef);
  progressRefHolder.current = progressRef;

  // Cached anchor coordinates
  const cachedCoordsRef = useRef<{
    scene1: AnchorCoord;
    scene2: AnchorCoord;
    scene3: AnchorCoord;
    col1: AnchorCoord;
    col2: AnchorCoord;
    col3: AnchorCoord;
    scene5: AnchorCoord;
    scene6: AnchorCoord;
  }>({
    scene1: { x: 0, y: 0, size: 58 },
    scene2: { x: 0, y: 0, size: 54 },
    scene3: { x: 0, y: 0, size: 48 },
    col1: { x: 0, y: 0, size: 42 },
    col2: { x: 0, y: 0, size: 42 },
    col3: { x: 0, y: 0, size: 42 },
    scene5: { x: 0, y: 0, size: 52 },
    scene6: { x: 0, y: 0, size: 64 },
  });

  // Handle click to advance to next narrative milestone
  const handleClick = useCallback(() => {
    if (onWheelClick) {
      onWheelClick();
      return;
    }

    const st = ScrollTrigger.getById("cinematic-pin");
    const lenis = (
      window as unknown as {
        lenis?: {
          scrollTo: (target: number) => void;
          limit: number;
          scroll: number;
        };
      }
    ).lenis;

    const milestones = [0.0, 0.16, 0.30, 0.44, 0.54, 0.64, 0.77, 0.94];
    const curProg = st ? st.progress : (progressRef?.current ?? 0);
    const nextTargetProg = milestones.find((m) => m > curProg + 0.03) ?? 1.0;

    if (st) {
      const targetY = st.start + nextTargetProg * (st.end - st.start);
      if (lenis) {
        lenis.scrollTo(targetY);
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    } else if (lenis && lenis.limit > 0) {
      const nextTarget = Math.min(lenis.limit, lenis.scroll + window.innerHeight * 1.5);
      lenis.scrollTo(nextTarget);
    } else {
      window.scrollBy({ top: window.innerHeight * 1.5, behavior: "smooth" });
    }
  }, [onWheelClick, progressRef]);

  // Measure and cache all anchor coordinates relative to container
  const updateAllAnchorCoords = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const width = container.clientWidth;
    const height = Math.max(container.clientHeight, 1);
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    const getCoord = (
      ref: React.RefObject<HTMLElement | null> | undefined,
      fallback: AnchorCoord
    ): AnchorCoord => {
      if (ref && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          return {
            x: rect.left - containerRect.left + rect.width * 0.5,
            y: rect.top - containerRect.top + rect.height * 0.5,
            size: Math.max(rect.width, rect.height),
          };
        }
      }
      return fallback;
    };

    // Responsive fallbacks in case DOM element isn't active or in DOM yet
    const def1: AnchorCoord = {
      x: width - (isMobile ? 42 : isTablet ? 50 : 64),
      y: height * 0.5,
      size: isMobile ? 48 : 58,
    };
    const def2: AnchorCoord = {
      x: isMobile ? width * 0.5 : isTablet ? 120 : 160,
      y: isMobile ? height * 0.32 : height * 0.38,
      size: isMobile ? 46 : 54,
    };
    const def3: AnchorCoord = {
      x: isMobile ? 70 : isTablet ? 110 : 130,
      y: isMobile ? 120 : isTablet ? 150 : 170,
      size: isMobile ? 40 : 48,
    };
    const defCol1: AnchorCoord = {
      x: isMobile ? width * 0.5 : width * 0.167,
      y: isMobile ? height * 0.68 : height * 0.72,
      size: isMobile ? 38 : 44,
    };
    const defCol2: AnchorCoord = {
      x: isMobile ? width * 0.5 : width * 0.5,
      y: isMobile ? height * 0.68 : height * 0.72,
      size: isMobile ? 38 : 44,
    };
    const defCol3: AnchorCoord = {
      x: isMobile ? width * 0.5 : width * 0.833,
      y: isMobile ? height * 0.68 : height * 0.72,
      size: isMobile ? 38 : 44,
    };
    const def5: AnchorCoord = {
      x: width * 0.5,
      y: isMobile ? height * 0.28 : height * 0.30,
      size: isMobile ? 44 : 52,
    };
    const def6: AnchorCoord = {
      x: width * 0.5,
      y: isMobile ? height * 0.32 : height * 0.36,
      size: isMobile ? 54 : 64,
    };

    const tRefs = targetRefsHolder.current;
    const tRef = targetRefHolder.current;

    cachedCoordsRef.current = {
      scene1: getCoord(tRefs?.scene1, def1),
      scene2: getCoord(tRefs?.scene2, def2),
      scene3: getCoord(tRefs?.scene3, def3),
      col1: getCoord(tRefs?.col1, defCol1),
      col2: getCoord(tRefs?.col2, defCol2),
      col3: getCoord(tRefs?.col3, defCol3),
      scene5: getCoord(tRefs?.scene5, def5),
      scene6: getCoord(tRefs?.scene6 || tRef, def6),
    };
  }, []);

  // Piecewise interpolation for journey screen positions
  const getJourneyPos = (prog: number): AnchorCoord => {
    const c = cachedCoordsRef.current;
    // 1. Scene 1 (Hero/Architecture: beside heading on right side)
    if (prog <= 0.080) {
      return c.scene1;
    }
    // 1 -> 2 (Scene 1 to Scene 2 Waterfront / Life by the Water on left side)
    if (prog <= 0.130) {
      const t = smoothstep((prog - 0.080) / (0.130 - 0.080));
      return lerpCoord(c.scene1, c.scene2, t);
    }
    // 2. Scene 2 (Life by the Water)
    if (prog <= 0.230) {
      return c.scene2;
    }
    // 2 -> 3 (Scene 2 to Scene 3 District Masterplan top of text)
    if (prog <= 0.275) {
      const t = smoothstep((prog - 0.230) / (0.275 - 0.230));
      return lerpCoord(c.scene2, c.scene3, t);
    }
    // 3. Scene 3 (District Masterplan)
    if (prog <= 0.370) {
      return c.scene3;
    }
    // 3 -> 4A (District Masterplan to Column 1 Commercial Arcade top of heading)
    if (prog <= 0.415) {
      const t = smoothstep((prog - 0.370) / (0.415 - 0.370));
      return lerpCoord(c.scene3, c.col1, t);
    }
    // 4A. Column 1 (Commercial Arcade)
    if (prog <= 0.485) {
      return c.col1;
    }
    // 4A -> 4B (Column 1 to Column 2 Curated Residences top of heading)
    if (prog <= 0.525) {
      const t = smoothstep((prog - 0.485) / (0.525 - 0.485));
      return lerpCoord(c.col1, c.col2, t);
    }
    // 4B. Column 2 (Curated Residences)
    if (prog <= 0.585) {
      return c.col2;
    }
    // 4B -> 4C (Column 2 to Column 3 Signature Amenities top of heading)
    if (prog <= 0.625) {
      const t = smoothstep((prog - 0.585) / (0.625 - 0.585));
      return lerpCoord(c.col2, c.col3, t);
    }
    // 4C. Column 3 (Signature Amenities)
    if (prog <= 0.695) {
      return c.col3;
    }
    // 4C -> 5 (Column 3 to Destination top of label)
    if (prog <= 0.740) {
      const t = smoothstep((prog - 0.695) / (0.740 - 0.695));
      return lerpCoord(c.col3, c.scene5, t);
    }
    // 5. Destination
    if (prog <= 0.825) {
      return c.scene5;
    }
    // 5 -> 6 (Destination to CTA top of heading)
    if (prog <= 0.875) {
      const t = smoothstep((prog - 0.825) / (0.875 - 0.825));
      return lerpCoord(c.scene5, c.scene6, t);
    }
    // 6. CTA Docked
    return c.scene6;
  };

  // Manage intro travel transition from loading screen to journey
  useEffect(() => {
    if (!isLoaded) {
      introTravelRef.current.progress = 0;
    } else {
      if (!prevLoadedRef.current) {
        const curAngle = currentLoadingSpinYRef.current;
        startTravelAngleRef.current = curAngle;
        // Round up to next 360-degree boundary to arrive front-facing
        targetTravelAngleRef.current = Math.ceil(curAngle / (Math.PI * 2)) * (Math.PI * 2);

        gsap.to(introTravelRef.current, {
          progress: 1,
          duration: 1.4,
          ease: "power3.inOut",
        });
      } else {
        introTravelRef.current.progress = 1;
      }
    }
    prevLoadedRef.current = isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animFrameId: number;
    let isCancelled = false;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup (FOV 40 degrees)
    const fov = 40;
    const camera = new THREE.PerspectiveCamera(
      fov,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High-DPI and Tone Mapping (100% Transparent Background)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // 4. Studio Lighting Configuration
    // Calibrated for crisp pure white #FFFFFF finish with architectural luxury depth
    const ambientLight = new THREE.AmbientLight(new THREE.Color("#FFFFFF"), 1.8);
    scene.add(ambientLight);

    // Key Light: Crisp pure white directional light
    const keyLight = new THREE.DirectionalLight(new THREE.Color("#FFFFFF"), 2.6);
    keyLight.position.set(5, 7, 8);
    scene.add(keyLight);

    // Rim Light: Pure white accent to define the beveled silhouette
    const rimLight = new THREE.DirectionalLight(new THREE.Color("#FFFFFF"), 2.2);
    rimLight.position.set(-6, -4, 6);
    scene.add(rimLight);

    // Top Light for clean bevel sparkle
    const topLight = new THREE.DirectionalLight(new THREE.Color("#FFFFFF"), 1.8);
    topLight.position.set(0, 9, 4);
    scene.add(topLight);

    // Back fill to keep shadow cavities luminous and clean
    const backFillLight = new THREE.DirectionalLight(new THREE.Color("#EDE5DA"), 1.2);
    backFillLight.position.set(0, -6, -4);
    scene.add(backFillLight);

    // 5. Load GLTF 3D Model: /03 - Sub Mark.glb
    const loader = new GLTFLoader();
    const pivot = new THREE.Group();
    const logoWrapper = new THREE.Group();
    logoWrapper.add(pivot);
    scene.add(logoWrapper);
    logoGroupRef.current = logoWrapper;
    pivotGroupRef.current = pivot;

    // Pure White Luxury Architectural Material (#FFFFFF)
    const orionMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FFFFFF"), // Pure white #FFFFFF
      emissive: new THREE.Color("#FFFFFF"),
      emissiveIntensity: 0.08,
      roughness: 0.22,
      metalness: 0.1,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95,
      side: THREE.DoubleSide,
    });

    loader.load(
      "/03 - Sub Mark.glb",
      (gltf) => {
        if (isCancelled) return;

        // Apply theme color material and orient geometry straight up (XY plane)
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            // Rotate geometry 90 degrees around X so the logo stands straight up
            mesh.geometry.rotateX(Math.PI / 2);
            mesh.geometry.computeVertexNormals();
            mesh.material = orionMaterial;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        // Exact geometric centering for upright geometry
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);

        pivot.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error("Failed to load 3D Orion submark logo:", error);
      }
    );

    // 6. Responsive Resize Handler
    let cachedWidth = container.clientWidth;
    let cachedHeight = container.clientHeight;

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      cachedWidth = container.clientWidth;
      cachedHeight = container.clientHeight;
      if (cachedWidth === 0 || cachedHeight === 0) return;

      camera.aspect = cachedWidth / cachedHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(cachedWidth, cachedHeight, false);
      updateAllAnchorCoords();
    };

    window.addEventListener("resize", handleResize);

    // Progressive coordinate measurement updates after initial paint and fonts load
    const timer1 = setTimeout(updateAllAnchorCoords, 300);
    const timer2 = setTimeout(updateAllAnchorCoords, 800);
    const timer3 = setTimeout(updateAllAnchorCoords, 1600);

    // 7. High-Performance Animation Loop
    const startTime = performance.now();
    let lastCoordUpdateProg = -1;
    let lastCoordUpdateTime = 0;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const introT = introTravelRef.current.progress;
      const width = cachedWidth;
      const height = Math.max(cachedHeight, 1);
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const now = performance.now();
      const time = (now - startTime) * 0.001;

      // Read current progress from ref or ScrollTrigger directly
      let targetProg = 0;
      const pRef = progressRefHolder.current;
      if (pRef && typeof pRef.current === "number") {
        targetProg = pRef.current;
      } else {
        const st = ScrollTrigger.getById("cinematic-pin");
        if (st) {
          targetProg = st.progress;
        }
      }

      // Smooth progress dampening for ultra-fluid motion; accelerate on fast scrolls/skips
      const progDiff = targetProg - smoothedProgressRef.current;
      const dampFactor = Math.abs(progDiff) > 0.08 ? 0.35 : 0.14;
      smoothedProgressRef.current += progDiff * dampFactor;
      if (Math.abs(progDiff) < 0.001) {
        smoothedProgressRef.current = targetProg;
      }
      const prog = smoothedProgressRef.current;

      // Throttled anchor coordinate refresh on scroll milestones
      if (
        now - lastCoordUpdateTime > 400 ||
        Math.abs(prog - lastCoordUpdateProg) > 0.06
      ) {
        lastCoordUpdateTime = now;
        lastCoordUpdateProg = prog;
        updateAllAnchorCoords();
      }

      // Hover scale smoothing
      const targetHoverScale = isHoveredRef.current ? 1.12 : 1.0;
      currentHoverScaleRef.current += (targetHoverScale - currentHoverScaleRef.current) * 0.15;

      if (camera && logoWrapper && pivot) {
        const visibleHeight = 2 * Math.tan((fov * Math.PI) / 360) * camera.position.z;
        const visibleWidth = visibleHeight * camera.aspect;
        const worldUnitsPerPixel = visibleHeight / height;

        // Position Resolution:
        // Loading Center Screen Position
        const loadingCenter: AnchorCoord = {
          x: width * 0.5,
          y: height * 0.44,
          size: isMobile ? 120 : isTablet ? 140 : 160,
        };

        const journeyTarget = getJourneyPos(prog);
        const curScreenCoord =
          introT < 1 ? lerpCoord(loadingCenter, journeyTarget, introT) : journeyTarget;

        const effectivePixelSize = curScreenCoord.size * currentHoverScaleRef.current;

        // Convert Screen Coordinates directly to 3D World Space
        const worldX = (curScreenCoord.x / width - 0.5) * visibleWidth;
        let worldY = -(curScreenCoord.y / height - 0.5) * visibleHeight;

        // Subtle luxury floating bob while on loading screen
        if (introT < 1) {
          worldY += Math.sin(time * 1.5) * 0.04 * (1 - introT);
        }

        // Natural dimension of Sub Mark mesh is ~2.125
        const modelScale = (effectivePixelSize * worldUnitsPerPixel) / 2.125;

        logoWrapper.position.set(worldX, worldY, 0);
        logoWrapper.scale.setScalar(modelScale);

        // Rotation & Choreography:
        // Continuous rotation around Y as user scrolls
        const scrollRotY = prog * Math.PI * 18;
        const tiltZ = Math.sin(prog * Math.PI * 6) * 0.08;
        const tiltX = Math.cos(prog * Math.PI * 4) * 0.04;

        // CTA docking forward-facing alignment
        const ctaBlend = Math.max(0, Math.min(1, (prog - 0.875) / (0.920 - 0.875)));
        const ctaRotY = Math.sin(time * 0.9) * 0.06;
        const targetDockRotY = Math.round(scrollRotY / (Math.PI * 2)) * (Math.PI * 2);

        const activeRotY = (1 - ctaBlend) * scrollRotY + ctaBlend * (targetDockRotY + ctaRotY);
        const activeRotX = (1 - ctaBlend) * tiltX;
        const activeRotZ = (1 - ctaBlend) * tiltZ;

        if (introT < 1) {
          // 1080° spin (1.8s) + 2.0s pause loop calculated smoothly and deterministically
          const cycleDuration = 3.8; // 1.8s spin + 2.0s pause
          const spinDuration = 1.8;
          const spinAngle = Math.PI * 6; // 1080 degrees (3 full 360° revolutions)

          const cycleIndex = Math.floor(time / cycleDuration);
          const cycleTime = time % cycleDuration;

          let currentSpinY = cycleIndex * spinAngle;
          if (cycleTime < spinDuration) {
            // 1.8s active spin with luxury power2.inOut ease
            const p = cycleTime / spinDuration;
            const easeP = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            currentSpinY += easeP * spinAngle;
          } else {
            // 2.0s resting pause facing front
            currentSpinY += spinAngle;
          }

          currentLoadingSpinYRef.current = currentSpinY;
          const targetRevY = targetTravelAngleRef.current;
          const travelRotY =
            introT <= 0
              ? currentSpinY
              : (1 - introT) * startTravelAngleRef.current + introT * (targetRevY + activeRotY);
          pivot.rotation.y = travelRotY;
          pivot.rotation.x = 0;
          pivot.rotation.z = introT * activeRotZ;
        } else {
          pivot.rotation.y = activeRotY;
          pivot.rotation.x = activeRotX;
          pivot.rotation.z = activeRotZ;
        }

        // Dynamic Interactive Floating HUD tracking the live 3D logo
        if (hudRef.current) {
          hudRef.current.style.left = `${curScreenCoord.x}px`;
          hudRef.current.style.top = `${curScreenCoord.y}px`;
          const hitSize = Math.max(48, effectivePixelSize + 16);
          hudRef.current.style.width = `${hitSize}px`;
          hudRef.current.style.height = `${hitSize}px`;
          hudRef.current.style.transform = `translate(-50%, -50%)`;
          hudRef.current.style.opacity = introT >= 1 ? "1" : "0";
          hudRef.current.style.pointerEvents = introT >= 1 ? "auto" : "none";
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup & Resource Disposal
    return () => {
      isCancelled = true;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      orionMaterial.dispose();

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          if (m.geometry) m.geometry.dispose();
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[45] overflow-hidden"
    >
      {/* 3D WebGL Canvas for Orion Sub Mark (100% Transparent Background) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* Interactive Floating Touch/Click Area dynamically tracking the 3D Logo */}
      <div
        ref={hudRef}
        className="absolute pointer-events-auto select-none cursor-pointer rounded-full transition-opacity duration-300"
        onClick={handleClick}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        title="Orion One · Click to advance"
      />
    </div>
  );
}
