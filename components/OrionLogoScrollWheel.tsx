"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ScrollTrigger } from "gsap/all";

interface OrionLogoScrollWheelProps {
  progressRef?: React.MutableRefObject<number>;
  targetRef?: React.RefObject<HTMLElement | null>;
  onWheelClick?: () => void;
}

export default function OrionLogoScrollWheel({
  progressRef,
  targetRef,
  onWheelClick,
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

  // Handle click on the right-side wheel
  const handleClick = useCallback(() => {
    if (onWheelClick) {
      onWheelClick();
      return;
    }

    // Scroll forward by approximately one chapter (~16% of scroll)
    const st = ScrollTrigger.getById("cinematic-pin");
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number) => void; limit: number; scroll: number } }).lenis;

    if (st) {
      const curProg = st.progress;
      const targetProg = Math.min(1, curProg + 0.16);
      const targetY = st.start + targetProg * (st.end - st.start);
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
  }, [onWheelClick]);

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

    // 3. WebGL Renderer with High-DPI and Tone Mapping
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
    // Calibrated specifically for Orion Brand theme color #214546 (rgb(33, 69, 70))
    // Soft deep cyan/forest ambient fill
    const ambientLight = new THREE.AmbientLight(new THREE.Color("#153D3D"), 2.0);
    scene.add(ambientLight);

    // Key Light: Warm Ivory Cream for architectural highlight
    const keyLight = new THREE.DirectionalLight(new THREE.Color("#EDE5DA"), 2.8);
    keyLight.position.set(5, 7, 8);
    scene.add(keyLight);

    // Rim Light: Emerald/Sage accent (#62AA9E) to bring out the beveled silhouette
    const rimLight = new THREE.DirectionalLight(new THREE.Color("#62AA9E"), 3.4);
    rimLight.position.set(-6, -4, 6);
    scene.add(rimLight);

    // Top Light for metallic bevel sparkle
    const topLight = new THREE.DirectionalLight(new THREE.Color("#FFFFFF"), 1.6);
    topLight.position.set(0, 9, 4);
    scene.add(topLight);

    // Back fill to prevent dark occlusion
    const backFillLight = new THREE.DirectionalLight(new THREE.Color("#214546"), 1.2);
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

    // Orion Theme Material: #214546 / rgb(33, 69, 70)
    const orionMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#214546"), // Exact theme color
      emissive: new THREE.Color("#0c1e1e"),
      emissiveIntensity: 0.3,
      roughness: 0.25,
      metalness: 0.72,
      clearcoat: 0.6,
      clearcoatRoughness: 0.16,
      reflectivity: 0.92,
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

    // 6. Responsive Resize Handler & Dimension Caching
    let cachedWidth = container.clientWidth;
    let cachedHeight = container.clientHeight;
    let isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    let cachedCtaX = cachedWidth * 0.5;
    let cachedCtaY = cachedHeight * 0.32;
    let cachedCtaSize = 88;
    let lastRectUpdateProg = -1;

    const updateCtaCoords = () => {
      if (targetRef && targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          cachedCtaX = rect.left + rect.width * 0.5;
          cachedCtaY = rect.top + rect.height * 0.5;
          cachedCtaSize = Math.max(rect.width, rect.height);
        }
      }
    };

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      cachedWidth = container.clientWidth;
      cachedHeight = container.clientHeight;
      isMobile = window.innerWidth < 768;
      if (cachedWidth === 0 || cachedHeight === 0) return;

      camera.aspect = cachedWidth / cachedHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(cachedWidth, cachedHeight, false);
      updateCtaCoords();
    };

    window.addEventListener("resize", handleResize);
    // Initial CTA anchor measure after mount
    setTimeout(updateCtaCoords, 600);

    // 7. High-Performance Animation Loop (Replacing deprecated THREE.Clock with high-precision timestamp)
    const startTime = performance.now();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // On mobile viewports (< 768px), disable heavy WebGL render loop to guarantee 60 FPS touch scroll
      if (isMobile) {
        return;
      }

      const width = cachedWidth;
      const height = Math.max(cachedHeight, 1);
      const time = (performance.now() - startTime) * 0.001;

      // Read current progress from ref or ScrollTrigger directly
      let targetProg = 0;
      if (progressRef && typeof progressRef.current === "number") {
        targetProg = progressRef.current;
      } else {
        const st = ScrollTrigger.getById("cinematic-pin");
        if (st) {
          targetProg = st.progress;
        }
      }

      // Smooth progress dampening for ultra-fluid 60/120fps motion
      smoothedProgressRef.current += (targetProg - smoothedProgressRef.current) * 0.14;
      const prog = smoothedProgressRef.current;

      // Hover scale smoothing
      const targetHoverScale = isHoveredRef.current ? 1.12 : 1.0;
      currentHoverScaleRef.current += (targetHoverScale - currentHoverScaleRef.current) * 0.15;

      if (camera && logoWrapper && pivot) {
        // Calculate 3D viewport visible extent at z = 0
        const visibleHeight = 2 * Math.tan((fov * Math.PI) / 360) * camera.position.z;
        const visibleWidth = visibleHeight * camera.aspect;
        const worldUnitsPerPixel = visibleHeight / height;

        const isTablet = width >= 768 && width < 1024;

        // -----------------------------------------------------------------
        // STATE 1: Right-Side Scroll Wheel Position & Dimensions
        // -----------------------------------------------------------------
        const wheelPixelSize = isTablet ? 50 : 58;
        const wheelRightMargin = isTablet ? 42 : 50;
        const wheelScreenX = width - wheelRightMargin;
        const wheelScreenY = height * 0.5;

        // -----------------------------------------------------------------
        // STATE 2: Target CTA Heading Position & Dimensions (Cached)
        // -----------------------------------------------------------------
        if (prog >= 0.80 && (lastRectUpdateProg < 0.80 || Math.abs(prog - lastRectUpdateProg) > 0.08)) {
          lastRectUpdateProg = prog;
          updateCtaCoords();
        }

        const ctaScreenX = cachedCtaX;
        const ctaScreenY = cachedCtaY;
        const ctaPixelSize = cachedCtaSize || (isTablet ? 74 : 88);

        // -----------------------------------------------------------------
        // TRANSITION DOCKING (Progress 0.84 -> 0.96)
        // -----------------------------------------------------------------
        // Smoothly interpolates from right-side wheel into center CTA position
        const rawT = Math.max(0, Math.min(1, (prog - 0.84) / (0.96 - 0.84)));
        // Smooth cubic ease curve
        const easeT = rawT * rawT * (3 - 2 * rawT);

        // Screen-Space Coordinates
        const curScreenX = (1 - easeT) * wheelScreenX + easeT * ctaScreenX;
        const curScreenY = (1 - easeT) * wheelScreenY + easeT * ctaScreenY;
        const curPixelSize =
          ((1 - easeT) * wheelPixelSize + easeT * ctaPixelSize) * currentHoverScaleRef.current;

        // Convert Screen Coordinates directly to 3D World Space
        const worldX = (curScreenX / width - 0.5) * visibleWidth;
        const worldY = -(curScreenY / height - 0.5) * visibleHeight;

        // Natural dimension of Sub Mark mesh is ~2.125
        const modelScale = (curPixelSize * worldUnitsPerPixel) / 2.125;

        logoWrapper.position.set(worldX, worldY, 0);
        logoWrapper.scale.setScalar(modelScale);

        // -----------------------------------------------------------------
        // 360-DEGREE ROTATION & HEADING ORIENTATION
        // -----------------------------------------------------------------
        // Wheel mode: Rotates continuously 360° in sync with scroll
        // Standing straight up, rotating 360 degrees as user scrolls
        const scrollRevolutions = prog * Math.PI * 12;
        const wheelRotY = scrollRevolutions;
        const wheelRotX = 0.0; // Completely straight up (not tilted flat)
        const wheelRotZ = -scrollRevolutions * 0.3; // subtle wheel rolling motion

        // CTA mode: Front-facing upright orientation with gentle shimmer
        const idleFloatY = Math.sin(time * 1.5) * (isMobile ? 0.04 : 0.08);
        const ctaRotY = Math.sin(time * 0.9) * 0.1;
        const ctaRotX = 0.0;
        const ctaRotZ = 0.0;

        // Smoothly ease rotations between wheel spin and docked CTA orientation
        pivot.rotation.y = (1 - easeT) * wheelRotY + easeT * ctaRotY;
        pivot.rotation.x = (1 - easeT) * wheelRotX + easeT * ctaRotX;
        pivot.rotation.z = (1 - easeT) * wheelRotZ + easeT * ctaRotZ;

        // Subtle floating luxury hover motion when docked at CTA
        if (easeT > 0.3) {
          logoWrapper.position.y += idleFloatY * easeT;
        }

        // Fade out right-side HUD ring as logo moves to the center
        if (hudRef.current) {
          hudRef.current.style.opacity = `${(1 - easeT).toFixed(3)}`;
          hudRef.current.style.pointerEvents = easeT > 0.75 ? "none" : "auto";
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

      orionMaterial.dispose();

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          if (m.geometry) m.geometry.dispose();
        }
      });

      renderer.dispose();
    };
  }, [progressRef, targetRef]);

  return (
    <div
      ref={containerRef}
      className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-35 overflow-hidden"
    >
      {/* 3D WebGL Canvas for Orion Sub Mark */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* Right-Side Interactive Touch/Click Area directly over the 3D Logo */}
      <div
        ref={hudRef}
        className="absolute right-3.5 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 pointer-events-auto transition-opacity duration-300 select-none cursor-pointer rounded-full"
        onClick={handleClick}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        title="Orion Scroll Wheel"
        style={{ width: "64px", height: "64px" }}
      />
    </div>
  );
}
