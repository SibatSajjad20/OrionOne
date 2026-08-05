"use client";

import { useEffect, useRef, useState, memo } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Sparkles, ChevronDown, Plus } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 239;
const PRIORITY_FRAMES_COUNT = 30; // Priority Load: First 30 frames for instant Hero interaction
const BG_CHUNK_SIZE = 50; // Background Load: Chunks of 50 frames

// 4. STRICT DATA CONSTRAINT (PARALLEL ARRAYS ONLY - NO OBJECTS/JSON)
const labelNames = ["Orion Tower", "DHA Lake", "Commercial Offices", "Retail Mall"];
const labelTopPosition = ["48%", "68%", "64%", "58%"];
const labelLeftPosition = ["38%", "65%", "26%", "72%"];
const labelDetails = [
  "28-Story Luxury Residence & Sky Suites",
  "12-Acre Serene Waterfront & Promenade",
  "Grade-A Executive Office Spaces",
  "Open-Air Waterfront Retail Boulevard",
];

function CinematicCanvasComponent() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Storytelling Stage Overlay Refs
  const heroTextRef = useRef<HTMLDivElement>(null);
  const midTextRef = useRef<HTMLDivElement>(null);
  const highTextRef = useRef<HTMLDivElement>(null);
  const masterplanTextRef = useRef<HTMLDivElement>(null);
  const labelsOverlayRef = useRef<HTMLDivElement>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Single-frame object-fit cover rendering engine
  const renderToCanvas = (img: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // High-DPI Canvas Resizing
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    if (framesRef.current.length > 0 && framesRef.current[0]) {
      renderToCanvas(framesRef.current[0]);
    }
  };

  // 2. PROGRESSIVE FRAME LOADING LOGIC
  // Phase 1 (Priority): Load first 30 frames immediately for instant interactive Hero state
  // Phase 2 (Background): Asynchronously fetch remaining frames in chunks of 50
  useEffect(() => {
    let isCancelled = false;
    const loadedFrames: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
      });
    };

    const loadPriorityFrames = async () => {
      let priorityCount = 0;
      const priorityPromises: Promise<void>[] = [];

      for (let i = 1; i <= PRIORITY_FRAMES_COUNT; i++) {
        const idx = i - 1;
        const frameNum = String(i).padStart(3, "0");
        const src = `/video-frames/ezgif-frame-${frameNum}.jpg`;

        const promise = loadImage(src).then((img) => {
          if (isCancelled) return;
          loadedFrames[idx] = img;
          priorityCount++;
          const percent = Math.floor((priorityCount / PRIORITY_FRAMES_COUNT) * 100);
          setLoadingProgress(percent);
        });

        priorityPromises.push(promise);
      }

      await Promise.all(priorityPromises);

      if (isCancelled) return;

      framesRef.current = loadedFrames;
      setIsLoaded(true); // Unlock screen instantly after priority frames
      if (loadedFrames[0]) {
        renderToCanvas(loadedFrames[0]);
      }

      // Start Background Load for remaining frames (31 -> 239) in chunks of 50
      loadBackgroundFrames(loadedFrames);
    };

    const loadBackgroundFrames = async (framesArray: HTMLImageElement[]) => {
      let currentFrame = PRIORITY_FRAMES_COUNT + 1;

      while (currentFrame <= TOTAL_FRAMES && !isCancelled) {
        const chunkEnd = Math.min(currentFrame + BG_CHUNK_SIZE - 1, TOTAL_FRAMES);
        const chunkPromises: Promise<void>[] = [];

        for (let i = currentFrame; i <= chunkEnd; i++) {
          const idx = i - 1;
          const frameNum = String(i).padStart(3, "0");
          const src = `/video-frames/ezgif-frame-${frameNum}.jpg`;

          const p = loadImage(src).then((img) => {
            if (isCancelled) return;
            framesArray[idx] = img;
          });

          chunkPromises.push(p);
        }

        await Promise.all(chunkPromises);
        if (isCancelled) break;

        framesRef.current = framesArray;
        currentFrame = chunkEnd + 1;
      }
    };

    loadPriorityFrames();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Handle Resize
  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // 1. GSAP SCROLL LOGIC USING DIRECT REACT DOM REFS & MULTI-STAGE OVERLAYS
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=500%",
        pin: true,
        pinSpacing: true, // CRITICAL: Injects scrollable space
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const frames = framesRef.current;

          // 1. Draw Canvas Frame
          if (frames.length > 0) {
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.floor(progress * TOTAL_FRAMES)
            );

            let imgToDraw = frames[frameIndex];
            if (!imgToDraw) {
              for (let k = frameIndex - 1; k >= 0; k--) {
                if (frames[k]) {
                  imgToDraw = frames[k];
                  break;
                }
              }
            }

            if (imgToDraw) {
              renderToCanvas(imgToDraw);
            }
          }

          // 2. Stage 1: Hero Text (Centered) -> 0% to 25%
          const heroOpacity =
            progress < 0.2 ? 1 : progress > 0.3 ? 0 : 1 - (progress - 0.2) / 0.1;
          if (heroTextRef.current) {
            gsap.set(heroTextRef.current, {
              opacity: heroOpacity,
              y: (1 - heroOpacity) * -20,
            });
          }

          // 3. Stage 2: Mid-Flight Text (Middle Right) -> 30% to 52%
          const midOpacity =
            progress < 0.3
              ? 0
              : progress > 0.55
              ? 0
              : progress < 0.38
              ? (progress - 0.3) / 0.08
              : progress > 0.48
              ? 1 - (progress - 0.48) / 0.07
              : 1;
          if (midTextRef.current) {
            gsap.set(midTextRef.current, {
              opacity: midOpacity,
              y: (1 - midOpacity) * 20,
            });
          }

          // 4. Stage 3: High-Altitude Text (Middle Left) -> 55% to 75%
          const highOpacity =
            progress < 0.55
              ? 0
              : progress > 0.78
              ? 0
              : progress < 0.62
              ? (progress - 0.55) / 0.07
              : progress > 0.72
              ? 1 - (progress - 0.72) / 0.06
              : 1;
          if (highTextRef.current) {
            gsap.set(highTextRef.current, {
              opacity: highOpacity,
              y: (1 - highOpacity) * 20,
            });
          }

          // 5. Stage 4: Masterplan Title (Top Right) -> 78% to 100%
          const masterplanOpacity =
            progress < 0.78 ? 0 : progress > 0.85 ? 1 : (progress - 0.78) / 0.07;
          if (masterplanTextRef.current) {
            gsap.set(masterplanTextRef.current, {
              opacity: masterplanOpacity,
              y: (1 - masterplanOpacity) * -15,
            });
          }

          // 6. Stage 4: Landscape Pins -> 82% to 100%
          const labelsOpacity =
            progress < 0.82 ? 0 : progress > 0.9 ? 1 : (progress - 0.82) / 0.08;
          if (labelsOverlayRef.current) {
            gsap.set(labelsOverlayRef.current, { opacity: labelsOpacity });
          }
        },
      });
    }, container);

    // Refresh ScrollTrigger & Lenis scrollLimit
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
      (window as any).lenis?.resize();
    }, 100);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
      (window as any).lenis?.resize();
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="cinematic-journey"
      className="relative w-full h-screen bg-[#09191a] select-none overflow-hidden"
    >
      {/* Fallback First Frame */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/video-frames/ezgif-frame-001.jpg"
        alt="Orion One Flight"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Minimalist Preloader Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-[#09191a]/98 flex flex-col items-center justify-center space-y-6 pointer-events-none">
          <div className="relative h-20 w-64 mb-2">
            <NextImage
              src="/new-logo.png"
              alt="Orion One Logo"
              fill
              sizes="256px"
              priority
              className="object-contain object-center"
            />
          </div>

          <div className="flex flex-col items-center space-y-2 text-center">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#45a3a5] font-sans-body font-semibold">
              Prestige Lakefront Address • DHA Phase III
            </span>
          </div>

          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#153b3c] via-[#276e70] to-[#45a3a5] transition-all duration-200 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-sans-body text-white/70 tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#45a3a5] animate-spin" />
            <span>Initializing Drone Journey... {loadingProgress}%</span>
          </div>
        </div>
      )}

      {/* 1. CANVAS */}
      <canvas
        ref={canvasRef}
        id="journey-canvas"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark gradient scrim */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#09191a]/90 via-transparent to-transparent pointer-events-none" />

      {/* 2. STAGE 1: HERO TEXT (EDITORIAL MAGAZINE STYLE - CENTERED) */}
      <div
        ref={heroTextRef}
        id="hero-text-overlay"
        className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 z-20 pointer-events-none transition-opacity duration-300"
      >
        {/* Official Orion One Brand Logo Mark */}
        <div className="relative h-16 sm:h-22 lg:h-26 w-72 sm:w-96 lg:w-[420px] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          <NextImage
            src="/new-logo.png"
            alt="Orion One"
            fill
            priority
            sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 420px"
            className="object-contain object-center filter brightness-125 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          />
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 sm:w-12 h-[1px] bg-[#45a3a5]/60" />
          <span className="text-[10px] sm:text-xs tracking-[0.45em] font-semibold text-[#45a3a5] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Vol. 01 — Prestige Lakefront
          </span>
          <div className="w-8 sm:w-12 h-[1px] bg-[#45a3a5]/60" />
        </div>

        <h1 className="font-playfair text-5xl sm:text-7xl lg:text-9xl font-normal tracking-tight text-white leading-[0.92] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          Where the City
          <span className="block font-serif italic text-[#45a3a5] font-light text-4xl sm:text-6xl lg:text-8xl mt-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Meets the Water
          </span>
        </h1>

        <p className="text-sm sm:text-lg font-sans-body font-light text-gray-200/90 max-w-xl mx-auto mt-6 leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          A landmark synthesis of architectural grandeur and waterfront serenity in DHA Phase III, Islamabad.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 text-[#45a3a5] animate-bounce drop-shadow-lg">
          <div className="w-8 h-[1px] bg-[#45a3a5]" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans-body font-semibold">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 text-[#45a3a5]" />
        </div>
      </div>

      {/* 3. STAGE 2: MID-FLIGHT TEXT (MAGAZINE STYLE - EXPANDABLE ON HOVER, NO BACKGROUND) */}
      <div
        ref={midTextRef}
        className="absolute right-8 sm:right-16 top-1/3 max-w-lg z-20 pointer-events-auto group cursor-pointer transition-all duration-300 opacity-0"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] tracking-[0.4em] font-semibold text-[#45a3a5] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Vol. 02 — Elevation
          </span>
          <div className="w-8 h-[1px] bg-[#45a3a5]/60" />
        </div>

        <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Ascending Above
          <span className="block font-serif italic text-[#45a3a5] font-light mt-1 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            the Horizon
          </span>
        </h2>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#45a3a5] font-semibold tracking-widest uppercase group-hover:text-white transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          <Plus className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
          <span>Hover for Architecture Specs</span>
        </div>

        {/* Expandable Content on Hover */}
        <div className="max-h-0 opacity-0 group-hover:max-h-64 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden mt-3">
          <div className="space-y-2 border-l-2 border-[#45a3a5] pl-4 py-1 text-sm font-sans-body text-gray-200/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            <p className="font-medium text-white">
              • 28+ Floors of Panoramic Waterfront Views
            </p>
            <p>• High-Performance Acoustic & Thermal Double Glazing</p>
            <p>• Direct Pedestrian Link to DHA Lake Promenade</p>
          </div>
        </div>
      </div>

      {/* 4. STAGE 3: HIGH-ALTITUDE TEXT (MAGAZINE STYLE - EXPANDABLE ON HOVER, NO BACKGROUND) */}
      <div
        ref={highTextRef}
        className="absolute left-8 sm:left-16 top-1/3 max-w-lg z-20 pointer-events-auto group cursor-pointer transition-all duration-300 opacity-0"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] tracking-[0.4em] font-semibold text-[#45a3a5] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Vol. 03 — Realm
          </span>
          <div className="w-8 h-[1px] bg-[#45a3a5]/60" />
        </div>

        <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Integrated
          <span className="block font-serif italic text-[#45a3a5] font-light mt-1 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Lakefront Realm
          </span>
        </h2>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#45a3a5] font-semibold tracking-widest uppercase group-hover:text-white transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          <Plus className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
          <span>Hover for Precinct Details</span>
        </div>

        {/* Expandable Content on Hover */}
        <div className="max-h-0 opacity-0 group-hover:max-h-64 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden mt-3">
          <div className="space-y-2 border-l-2 border-[#45a3a5] pl-4 py-1 text-sm font-sans-body text-gray-200/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            <p className="font-medium text-white">
              • High-Street Commercial & Luxury Retail Boulevards
            </p>
            <p>• Corporate Executive Suites with Dedicated Express Elevators</p>
            <p>• 4-Level Subterranean Smart Parking Facility</p>
          </div>
        </div>
      </div>

      {/* 5. STAGE 4: MASTERPLAN TITLE (MAGAZINE STYLE - TOP RIGHT, NO BACKGROUND) */}
      <div
        ref={masterplanTextRef}
        className="absolute right-8 sm:right-16 top-12 sm:top-16 max-w-md z-20 pointer-events-none transition-all duration-300 opacity-0 text-right"
      >
        <div className="flex items-center justify-end gap-3 mb-1.5">
          <div className="w-8 h-[1px] bg-[#45a3a5]/60" />
          <span className="text-[10px] tracking-[0.4em] font-semibold text-[#45a3a5] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Vol. 04 — Vision
          </span>
        </div>

        <h3 className="font-playfair text-3xl sm:text-5xl font-normal text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Explore the
          <span className="font-serif italic text-[#45a3a5] font-light ml-2">
            Precincts
          </span>
        </h3>
      </div>

      {/* 6. STAGE 4: LANDSCAPE LABELS OVERLAY (EXPANDABLE PINS ON HOVER) */}
      <div
        ref={labelsOverlayRef}
        id="landscape-labels-overlay"
        className="absolute inset-0 z-30 pointer-events-none opacity-0 transition-opacity duration-300"
      >
        {labelNames.map((name, i) => (
          <div
            key={i}
            style={{
              top: labelTopPosition[i],
              left: labelLeftPosition[i],
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#153b3c]/90 border border-[#276e70] backdrop-blur-md shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#45a3a5]">
              <span className="w-2 h-2 rounded-full bg-[#45a3a5] animate-pulse shrink-0" />
              <span className="text-xs font-sans-body uppercase tracking-widest text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] whitespace-nowrap">
                {name}
              </span>
            </div>

            {/* Expandable Detail Box on Hover */}
            <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden mt-1.5 w-48 -translate-x-4">
              <div className="bg-[#09191a]/95 border border-[#45a3a5]/50 backdrop-blur-md p-2.5 rounded-xl shadow-2xl">
                <p className="text-[11px] font-sans-body text-gray-200 leading-snug">
                  {labelDetails[i]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// React.memo optimization to prevent unnecessary re-renders during high-frequency scroll scrubbing
export default memo(CinematicCanvasComponent);
