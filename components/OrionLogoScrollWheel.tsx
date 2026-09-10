"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

interface OrionLogoScrollWheelProps {
  progressRef?: React.MutableRefObject<number>;
  targetRef?: React.RefObject<HTMLElement | null>;
  onWheelClick?: () => void;
  isLoaded?: boolean;
}

export default function OrionLogoScrollWheel({
  progressRef,
  targetRef,
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
  const loadingSpinAngleRef = useRef({ y: 0 });
  const spinTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const startTravelAngleRef = useRef(0);
  const targetTravelAngleRef = useRef(0);
  const prevLoadedRef = useRef(isLoaded);

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

  // Manage intro 1080° spin + 2s pause loop and travel transition
  useEffect(() => {
    if (!isLoaded) {
      introTravelRef.current.progress = 0;
      if (!spinTimelineRef.current) {
        // 1080° spin (+6π radians) + 2-second pause loop
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(loadingSpinAngleRef.current, {
          y: "+=" + Math.PI * 6, // 1080 degrees spin
          duration: 1.8,
          ease: "power2.inOut",
        }).to({}, { duration: 2.0 }); // Exactly 2 seconds delay
        spinTimelineRef.current = tl;
      }
    } else {
      if (!prevLoadedRef.current) {
        // Just transitioned to loaded: kill spin loop and glide to right side
        if (spinTimelineRef.current) {
          spinTimelineRef.current.kill();
          spinTimelineRef.current = null;
        }

        const curAngle = loadingSpinAngleRef.current.y;
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
    // Calibrated specifically for Orion Brand green theme color #214546 (rgb(33, 69, 70))
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

    // Orion Theme Material: Exact brand green #214546 / rgb(33, 69, 70)
    const orionMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#214546"), // Exact Orion green brand color
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
    let cachedCtaY = cachedHeight * 0.36;
    let cachedCtaSize = 64;

    const updateCtaCoords = () => {
      if (targetRef && targetRef.current && container) {
        const rect = targetRef.current.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          cachedCtaX = rect.left - containerRect.left + rect.width * 0.5;
          cachedCtaY = rect.top - containerRect.top + rect.height * 0.5;
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

    // 7. High-Performance Animation Loop
    const startTime = performance.now();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const introT = introTravelRef.current.progress;

      // On mobile viewports (< 768px), once docked into right-side wheel mode, sleep render loop to guarantee 60 FPS touch scroll
      if (isMobile && introT >= 1) {
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

      // Smooth progress dampening for ultra-fluid motion; accelerate on fast scrolls/skips
      const progDiff = targetProg - smoothedProgressRef.current;
      const dampFactor = Math.abs(progDiff) > 0.08 ? 0.35 : 0.14;
      smoothedProgressRef.current += progDiff * dampFactor;
      if (Math.abs(progDiff) < 0.001) {
        smoothedProgressRef.current = targetProg;
      }
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
        // STATE 0: Center Loading Screen Position & Dimensions
        // -----------------------------------------------------------------
        const loadingCenterX = width * 0.5;
        const loadingCenterY = height * 0.44;
        const loadingPixelSize = isMobile ? 120 : isTablet ? 140 : 160;

        // -----------------------------------------------------------------
        // STATE 1: Right-Side Scroll Wheel Position & Dimensions
        // -----------------------------------------------------------------
        const wheelPixelSize = isTablet ? 50 : 58;
        const wheelRightMargin = isTablet ? 42 : 50;
        const wheelScreenX = width - wheelRightMargin;
        const wheelScreenY = height * 0.5;

        // Smoothly interpolate from Center Loading (introT = 0) -> Right Wheel (introT = 1)
        const baseScreenX = (1 - introT) * loadingCenterX + introT * wheelScreenX;
        const baseScreenY = (1 - introT) * loadingCenterY + introT * wheelScreenY;
        const basePixelSize = (1 - introT) * loadingPixelSize + introT * wheelPixelSize;

        // -----------------------------------------------------------------
        // STATE 2: Target CTA Heading Position & Dimensions (Live & Fixed)
        // -----------------------------------------------------------------
        if (prog >= 0.80 || targetProg >= 0.80) {
          updateCtaCoords();
        }

        const ctaScreenX = cachedCtaX;
        const ctaScreenY = cachedCtaY;
        const ctaPixelSize = cachedCtaSize || (isTablet ? 64 : 72);

        // TRANSITION DOCKING TO CTA:
        // Glides into place from 0.840 to 0.885 so it is 100% docked and fixed when CTA text appears
        const rawT = Math.max(0, Math.min(1, (prog - 0.840) / (0.885 - 0.840)));
        const easeT = rawT * rawT * (3 - 2 * rawT);

        // Screen-Space Coordinates
        const curScreenX = (1 - easeT) * baseScreenX + easeT * ctaScreenX;
        const curScreenY = (1 - easeT) * baseScreenY + easeT * ctaScreenY;
        const curPixelSize =
          ((1 - easeT) * basePixelSize + easeT * ctaPixelSize) * currentHoverScaleRef.current;

        // Convert Screen Coordinates directly to 3D World Space
        const worldX = (curScreenX / width - 0.5) * visibleWidth;
        const worldY = -(curScreenY / height - 0.5) * visibleHeight;

        // Natural dimension of Sub Mark mesh is ~2.125
        const modelScale = (curPixelSize * worldUnitsPerPixel) / 2.125;

        logoWrapper.position.set(worldX, worldY, 0);
        logoWrapper.scale.setScalar(modelScale);

        // -----------------------------------------------------------------
        // ROTATION & CHOREOGRAPHY
        // -----------------------------------------------------------------
        // Scroll wheel revolutions
        const scrollRevolutions = prog * Math.PI * 12;
        const wheelRotY = scrollRevolutions;
        const wheelRotX = 0.0;
        const wheelRotZ = -scrollRevolutions * 0.3;

        // CTA mode forward-facing rotation with subtle luxury shimmer
        const ctaRotY = Math.sin(time * 0.9) * 0.06;
        const ctaRotX = 0.0;
        const ctaRotZ = 0.0;

        const dockedRotY = (1 - easeT) * wheelRotY + easeT * ctaRotY;
        const dockedRotX = (1 - easeT) * wheelRotX + easeT * ctaRotX;
        const dockedRotZ = (1 - easeT) * wheelRotZ + easeT * ctaRotZ;

        if (introT < 1) {
          // Loading spin + travel transition:
          const spinY = loadingSpinAngleRef.current.y;
          const targetRevY = targetTravelAngleRef.current;
          const travelRotY = (1 - introT) * spinY + introT * (targetRevY + dockedRotY);
          pivot.rotation.y = travelRotY;
          pivot.rotation.x = 0;
          pivot.rotation.z = introT * dockedRotZ;

          // Gentle organic float while in center loading screen
          logoWrapper.position.y += Math.sin(time * 1.5) * 0.04 * (1 - introT);
        } else {
          pivot.rotation.y = dockedRotY;
          pivot.rotation.x = dockedRotX;
          pivot.rotation.z = dockedRotZ;
          // In CTA section, position remains rock-solid and fixed in its anchor
        }

        // Fade out right-side HUD ring as logo moves to the center / during intro
        if (hudRef.current) {
          const hudOpacity = introT >= 1 ? 1 - easeT : 0;
          hudRef.current.style.opacity = `${hudOpacity.toFixed(3)}`;
          hudRef.current.style.pointerEvents = introT >= 1 && easeT <= 0.75 ? "auto" : "none";
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

      if (spinTimelineRef.current) {
        spinTimelineRef.current.kill();
      }

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
      className="absolute inset-0 w-full h-full pointer-events-none z-[45] overflow-hidden"
    >
      {/* 3D WebGL Canvas for Orion Sub Mark (100% Transparent Background) */}
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
