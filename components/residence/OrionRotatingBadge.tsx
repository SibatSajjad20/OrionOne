"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface OrionRotatingBadgeProps {
  className?: string;
  size?: number; // size in px, defaults to 110
}

export default function OrionRotatingBadge({
  className = "",
  size = 110,
}: OrionRotatingBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [is3DReady, setIs3DReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrameId: number;
    let isCancelled = false;

    // Inner 3D canvas dimensions
    const canvasSize = Math.round(size * 0.70);

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvasSize, canvasSize);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x62aa9e, 2.2);
    dirLight1.position.set(3, 4, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xede5da, 1.8);
    dirLight2.position.set(-3, -2, 3);
    scene.add(dirLight2);

    // 3. Pivot Group
    const pivot = new THREE.Group();
    scene.add(pivot);

    // 4. Material
    const submarkMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#EDE5DA"),
      emissive: new THREE.Color("#62AA9E"),
      emissiveIntensity: 0.15,
      roughness: 0.25,
      metalness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
      side: THREE.DoubleSide,
    });

    // 5. Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      "/03 - Sub Mark.glb",
      (gltf) => {
        if (isCancelled) return;

        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.rotateX(Math.PI / 2);
            mesh.geometry.computeVertexNormals();
            mesh.material = submarkMaterial;
          }
        });

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);

        // Natural dimension of Sub Mark mesh is ~2.125
        const naturalSize = box.getSize(new THREE.Vector3()).length();
        const targetScale = 2.45 / Math.max(naturalSize, 1.0);
        gltf.scene.scale.setScalar(targetScale);

        pivot.add(gltf.scene);
        setIs3DReady(true);
      },
      undefined,
      (err) => {
        console.warn("Could not load /03 - Sub Mark.glb in badge:", err);
      }
    );

    // 6. Animation loop matching loading screen spin
    const startTime = performance.now();
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Smooth luxury continuous spin around Y with subtle micro-tilt
      pivot.rotation.y = time * 1.35;
      pivot.rotation.x = Math.sin(time * 0.8) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, [size]);

  // Unique ID for SVG path
  const pathId = "orion-badge-text-path";

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Orion One Residences Emblem"
    >
      {/* Outer Rotating Circular Typographic Ring — Inspired by reference 2nd screenshot */}
      <svg
        className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite]"
        viewBox="0 0 100 100"
      >
        <path
          id={pathId}
          d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          fill="none"
        />
        <text
          className="text-[6.5px] font-sans-body uppercase tracking-[0.22em] fill-[#EDE5DA]/85 font-semibold"
          letterSpacing="0.22em"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            • ORION ONE • RESIDENCES • ORION ONE • RESIDENCES •
          </textPath>
        </text>
      </svg>

      {/* Center 3D Rotating Submark (Transparent, No Circular Background) */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: size * 0.70, height: size * 0.70 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
          style={{ width: size * 0.70, height: size * 0.70 }}
        />

        {/* Fallback 2D Submark Icon while 3D is initializing */}
        {!is3DReady && (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <svg
              className="w-5 h-5 text-[#62AA9E]"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="20" cy="20" r="10" />
              <path d="M20 4v6M20 30v6M4 20h6M30 20h6" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
