"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  ChevronDown,
  Waves,
  Sparkles,
  Trees,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// MODULAR FRAME & ASSET CONFIGURATION
// Ready for future section video frames:
// When new section-specific cut frames are provided, simply swap the folder path
// or configure chapter-specific frame sequences below.
// ---------------------------------------------------------------------------
const TOTAL_FRAMES = 393;
const PRIORITY_FRAMES_COUNT = 35;
const BG_CHUNK_SIZE = 50;

interface Hotspot {
  id: string;
  name: string;
  category: string;
  top: string;
  left: string;
  detail: string;
}

const DISTRICT_HOTSPOTS: Hotspot[] = [
  {
    id: "tower",
    name: "Orion One Tower",
    category: "Signature Landmark",
    top: "46%",
    left: "68%",
    detail: "28-story luxury waterfront residences, sky suites & grand entrance lobby.",
  },
  {
    id: "lake",
    name: "DHA Waterfront Lake",
    category: "Natural Feature",
    top: "66%",
    left: "46%",
    detail: "12-acre serene water basin offering uninterrupted panoramic horizons.",
  },
  {
    id: "promenade",
    name: "Lakeside Promenade",
    category: "Wellness & Trail",
    top: "80%",
    left: "34%",
    detail: "Continuous landscaped walking and jogging track at the water's edge.",
  },
  {
    id: "commercial",
    name: "Lakeview Commercial",
    category: "Mixed-Use Hub",
    top: "54%",
    left: "22%",
    detail: "Grade-A executive corporate suites and open-air waterfront retail terraces.",
  },
];

const BRAND_PILLARS = [
  {
    name: "Lakefront",
    icon: Waves,
    subtitle: "Water at the Core",
    desc: "Waterfront masterplanning putting open water and walking edges at the center of everyday life.",
  },
  {
    name: "Wellness",
    icon: Trees,
    subtitle: "Movement & Recovery",
    desc: "Spaces built around quiet, nature, landscaped trails, and dedicated restorative wellness facilities.",
  },
  {
    name: "Community",
    icon: Users,
    subtitle: "Vibrant Gathering",
    desc: "Dining, hospitality, and shared waterfront amenity designed to bring residents together.",
  },
  {
    name: "Luxury",
    icon: ShieldCheck,
    subtitle: "Architectural Restraint",
    desc: "Considered materials and detailing across residences and shared spaces, without excess or noise.",
  },
];

interface CinematicCanvasProps {
  onOpenInquiry?: () => void;
}

function CinematicCanvasComponent({ onOpenInquiry }: CinematicCanvasProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 7 Story Chapter Overlay Refs
  const ch1Ref = useRef<HTMLDivElement>(null); // 01. Hero / Horizon
  const ch2Ref = useRef<HTMLDivElement>(null); // 02. Architecture
  const ch3Ref = useRef<HTMLDivElement>(null); // 03. Waterfront
  const ch4Ref = useRef<HTMLDivElement>(null); // 04. Destination & Pillars
  const ch5Ref = useRef<HTMLDivElement>(null); // 05. District Masterplan
  const ch6Ref = useRef<HTMLDivElement>(null); // 06. Investment Proposition
  const ch7Ref = useRef<HTMLDivElement>(null); // 07. Closing Horizon & CTA

  const framesRef = useRef<HTMLImageElement[]>([]);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const hasAnimatedEntrance = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastFrameIndexRef = useRef<number>(-1);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [activePillar, setActivePillar] = useState<number>(0);

  // Single-frame object-fit cover rendering engine (Hardware-accelerated, zero-redundancy)
  const renderToCanvas = useCallback((img: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext("2d", { alpha: false });
    }
    const ctx = ctxRef.current;
    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium";
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
  }, []);

  // High-DPI Canvas Resizing
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    lastFrameIndexRef.current = -1; // Invalidate frame cache to force fresh redraw

    if (framesRef.current.length > 0 && framesRef.current[0]) {
      renderToCanvas(framesRef.current[0]);
    }
  }, [renderToCanvas]);

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
        img.onload = () => {
          if ("decode" in img) {
            img
              .decode()
              .catch(() => {})
              .finally(() => resolve(img));
          } else {
            resolve(img);
          }
        };
        img.onerror = () => resolve(img);
      });
    };

    const loadPriorityFrames = async () => {
      let priorityCount = 0;
      const priorityPromises: Promise<void>[] = [];

      for (let i = 1; i <= PRIORITY_FRAMES_COUNT; i++) {
        const idx = i - 1;
        const frameNum = String(i).padStart(4, "0");
        const src = `/video-frames/frame_${frameNum}.jpg`;

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

      // Smooth luxury transition: dissolve preloader & gracefully reveal Hero
      if (preloaderRef.current) {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setIsPreloaderDone(true);
          },
        });
      } else {
        setIsPreloaderDone(true);
      }

      if (ch1Ref.current) {
        gsap.fromTo(
          ch1Ref.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay: 0.15,
            ease: "power3.out",
            onComplete: () => {
              hasAnimatedEntrance.current = true;
            },
          }
        );
      }

      // Start Background Load for remaining frames in chunks of 50
      loadBackgroundFrames(loadedFrames);
    };

    const loadBackgroundFrames = async (framesArray: HTMLImageElement[]) => {
      let currentFrame = PRIORITY_FRAMES_COUNT + 1;

      while (currentFrame <= TOTAL_FRAMES && !isCancelled) {
        const chunkEnd = Math.min(currentFrame + BG_CHUNK_SIZE - 1, TOTAL_FRAMES);
        const chunkPromises: Promise<void>[] = [];

        for (let i = currentFrame; i <= chunkEnd; i++) {
          const idx = i - 1;
          const frameNum = String(i).padStart(4, "0");
          const src = `/video-frames/frame_${frameNum}.jpg`;

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
  }, [renderToCanvas]);

  // Handle Resize
  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  // 1. GSAP SCROLL LOGIC USING DIRECT REACT DOM REFS & 7 STORY CHAPTERS
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper to calculate smooth fade in/hold/fade out opacity
    const calcOpacity = (
      prog: number,
      inStart: number,
      inEnd: number,
      outStart: number,
      outEnd: number
    ) => {
      if (prog < inStart || prog > outEnd) return 0;
      if (prog >= inEnd && prog <= outStart) return 1;
      if (prog < inEnd) return (prog - inStart) / (inEnd - inStart);
      return 1 - (prog - outStart) / (outEnd - outStart);
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=750%", // Ample scroll room for unhurried 7 chapters
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const frames = framesRef.current;

          // 1. Draw Canvas Frame (cached frame index skips redundant draw calls for 60fps smoothness)
          if (frames.length > 0) {
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.floor(progress * TOTAL_FRAMES)
            );

            if (frameIndex !== lastFrameIndexRef.current) {
              lastFrameIndexRef.current = frameIndex;

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
          }

          // 2. Chapter 01: Hero / Opening Horizon (0% -> 15%)
          // Fully visible at opening shot (0% -> 10%), then fades out smoothly between 10% and 15%
          const op1 = progress <= 0.10 ? 1 : Math.max(0, 1 - (progress - 0.10) / (0.15 - 0.10));
          if (ch1Ref.current) {
            if (progress > 0) {
              gsap.killTweensOf(ch1Ref.current);
              hasAnimatedEntrance.current = true;
              gsap.set(ch1Ref.current, {
                opacity: op1,
                y: (1 - op1) * -18,
                pointerEvents: op1 > 0.5 ? "auto" : "none",
              });
            } else if (hasAnimatedEntrance.current) {
              gsap.set(ch1Ref.current, {
                opacity: 1,
                y: 0,
                pointerEvents: "auto",
              });
            }
          }

          // 3. Chapter 02: Architecture (16% -> 32%)
          const op2 = calcOpacity(progress, 0.16, 0.19, 0.28, 0.32);
          if (ch2Ref.current) {
            gsap.set(ch2Ref.current, {
              opacity: op2,
              y: (1 - op2) * 20,
              pointerEvents: op2 > 0.5 ? "auto" : "none",
            });
          }

          // 4. Chapter 03: Waterfront (33% -> 49%)
          const op3 = calcOpacity(progress, 0.33, 0.36, 0.45, 0.49);
          if (ch3Ref.current) {
            gsap.set(ch3Ref.current, {
              opacity: op3,
              y: (1 - op3) * 20,
              pointerEvents: op3 > 0.5 ? "auto" : "none",
            });
          }

          // 5. Chapter 04: Destination & Pillars (50% -> 59%)
          const op4 = calcOpacity(progress, 0.50, 0.52, 0.56, 0.59);
          if (ch4Ref.current) {
            gsap.set(ch4Ref.current, {
              opacity: op4,
              y: (1 - op4) * 20,
              pointerEvents: op4 > 0.5 ? "auto" : "none",
            });
          }

          // 6. Chapter 05: District Masterplan & Hotspots (59% -> 75%)
          const op5 = calcOpacity(progress, 0.59, 0.62, 0.71, 0.75);
          if (ch5Ref.current) {
            gsap.set(ch5Ref.current, {
              opacity: op5,
              pointerEvents: op5 > 0.5 ? "auto" : "none",
            });
          }

          // 7. Chapter 06: Lifestyle Meets Investment (75% -> 82%)
          const op6 = calcOpacity(progress, 0.75, 0.77, 0.80, 0.82);
          if (ch6Ref.current) {
            gsap.set(ch6Ref.current, {
              opacity: op6,
              y: (1 - op6) * 18,
              pointerEvents: op6 > 0.5 ? "auto" : "none",
            });
          }

          // 8. Chapter 07: Closing Horizon & CTA (83% -> 100%)
          const op7 = calcOpacity(progress, 0.83, 0.86, 0.99, 1.0);
          if (ch7Ref.current) {
            gsap.set(ch7Ref.current, {
              opacity: op7,
              y: (1 - op7) * 15,
              pointerEvents: op7 > 0.5 ? "auto" : "none",
            });
          }
        },
      });
    }, container);

    // Refresh ScrollTrigger & Lenis scrollLimit
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
      (window as unknown as { lenis?: { resize: () => void } }).lenis?.resize();
    }, 100);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
      (window as unknown as { lenis?: { resize: () => void } }).lenis?.resize();
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      ctx.revert();
    };
  }, [renderToCanvas]);

  return (
    <section
      ref={containerRef}
      id="cinematic-journey"
      className="relative w-full h-screen h-[100dvh] bg-[#153D3D] select-none overflow-hidden"
    >
      {/* Fallback First Frame for instantaneous load */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/video-frames/frame_0001.jpg"
        alt="Orion One Lakefront"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Preloader: Understated Quiet Luxury Screen */}
      {!isPreloaderDone && (
        <div
          ref={preloaderRef}
          className="absolute inset-0 z-50 bg-[#153D3D] flex flex-col items-center justify-center px-6 space-y-5 sm:space-y-6 pointer-events-none"
        >
          <div className="relative h-14 sm:h-20 w-52 sm:w-64 mb-1 sm:mb-2">
            <NextImage
              src="/new-logo.png"
              alt="Orion One Logo"
              fill
              sizes="256px"
              priority
              className="object-contain object-center filter brightness-110"
            />
          </div>

          <div className="flex flex-col items-center space-y-2 text-center">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#62AA9E] font-sans-body font-semibold">
              Prestige Lakefront Living • DHA Phase III
            </span>
          </div>

          <div className="w-52 sm:w-56 h-[1.5px] bg-[#EDE5DA]/15 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#153D3D] via-[#62AA9E] to-[#EDE5DA] transition-all duration-200 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-sans-body text-[#EDE5DA]/70 tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#62AA9E] animate-pulse" />
            <span>Awakening Horizon... {loadingProgress}%</span>
          </div>
        </div>
      )}

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        id="journey-canvas"
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      {/* Cinematic Scrim: Deep Moss gradient overlay allowing high legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d2828]/95 via-transparent to-[#153D3D]/40 pointer-events-none" />

      {/* --------------------------------------------------------------------- */}
      {/* 01. HERO / OPENING HORIZON (Exact copy from 01 - Home Page.pdf)       */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch1Ref}
        id="hero"
        className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 sm:px-6 z-20 pointer-events-auto opacity-0"
      >
        <div className="relative h-12 sm:h-22 lg:h-24 w-56 sm:w-96 lg:w-[420px] mb-4 sm:mb-6">
          <NextImage
            src="/new-logo.png"
            alt="Orion One"
            fill
            priority
            sizes="(max-width: 640px) 224px, (max-width: 1024px) 384px, 420px"
            className="object-contain object-center filter brightness-110"
          />
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-6 sm:w-12 h-[1px] bg-[#62AA9E]/60" />
          <span className="text-[8.5px] sm:text-xs tracking-[0.22em] sm:tracking-[0.45em] font-semibold text-[#62AA9E] uppercase whitespace-nowrap">
            ORION ONE · DHA PHASE III · ISLAMABAD
          </span>
          <div className="w-6 sm:w-12 h-[1px] bg-[#62AA9E]/60" />
        </div>

        <h1 className="font-serif text-3xl sm:text-6xl lg:text-8xl font-light tracking-tight text-[#EDE5DA] leading-[0.95] uppercase">
          Where the Lake
          <span className="block font-serif italic text-[#62AA9E] font-normal text-2xl sm:text-5xl lg:text-7xl mt-1.5 sm:mt-2 normal-case">
            Meets Living.
          </span>
        </h1>

        <div className="mt-8 sm:mt-14 flex items-center justify-center gap-3 text-[#EDE5DA]/80">
          <div className="w-6 sm:w-8 h-[1px] bg-[#62AA9E]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans-body font-medium text-[#EDE5DA]/90">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-[#62AA9E] animate-bounce" />
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 02. ARCHITECTURE (Frame 02 from 01 - Home Page.pdf)                   */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch2Ref}
        id="architecture"
        className="absolute inset-0 flex items-center justify-center sm:justify-end px-4 sm:px-12 lg:px-24 z-20 opacity-0"
      >
        <div className="max-w-xl text-left sm:text-right space-y-3 sm:space-y-4">
          <div className="flex items-center justify-start sm:justify-end gap-3 mb-1">
            <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
            <span className="text-[10px] tracking-[0.35em] sm:tracking-[0.4em] font-semibold text-[#62AA9E] uppercase">
              Architecture
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-tight uppercase">
            A New Horizon
            <span className="block font-serif italic text-[#62AA9E] font-normal mt-1 normal-case text-xl sm:text-4xl lg:text-5xl">
              of Luxury.
            </span>
          </h2>

          <p className="font-serif text-base sm:text-2xl font-light text-[#EDE5DA]/90 italic leading-relaxed">
            “Where architecture flows like water and every view inspires.”
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 03. WATERFRONT (Frame 03 from 01 - Home Page.pdf)                     */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch3Ref}
        id="waterfront"
        className="absolute inset-0 flex items-center justify-center sm:justify-start px-4 sm:px-12 lg:px-24 z-20 opacity-0"
      >
        <div className="max-w-xl text-left space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] tracking-[0.35em] sm:tracking-[0.4em] font-semibold text-[#62AA9E] uppercase">
              Waterfront
            </span>
            <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
          </div>

          <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-tight uppercase">
            Life,
            <span className="block font-serif italic text-[#62AA9E] font-normal mt-1 normal-case text-xl sm:text-4xl lg:text-5xl">
              By the Water.
            </span>
          </h2>

          <p className="text-xs sm:text-lg font-sans-body text-[#EDE5DA]/90 font-light leading-relaxed max-w-md">
            A lakefront address shaped around views, movement, nature and everyday living.
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 04. DESTINATION & PILLARS (Frame 04 from 01 - Home Page.pdf)          */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch4Ref}
        id="destination"
        className="absolute inset-0 flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 z-20 opacity-0 overflow-hidden"
      >
        <div className="text-center space-y-2 sm:space-y-3 mb-4 sm:mb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
            <span className="text-[10px] tracking-[0.4em] font-semibold text-[#62AA9E] uppercase">
              Destination
            </span>
            <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
          </div>

          <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-tight uppercase">
            A Destination.
            <span className="block font-serif italic text-[#62AA9E] font-normal text-xl sm:text-4xl lg:text-5xl mt-1 normal-case">
              More Than an Address.
            </span>
          </h2>
        </div>

        {/* 4 Brand Pillars (Responsive 2x2 Grid on Mobile, 4 Cols on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {BRAND_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === idx;
            return (
              <div
                key={pillar.name}
                onClick={() => setActivePillar(idx)}
                className={`p-3 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer text-left backdrop-blur-md ${
                  isSelected
                    ? "bg-[#0d2828]/95 border-[#62AA9E] shadow-[0_10px_30px_rgba(98,170,158,0.15)]"
                    : "bg-[#153D3D]/60 border-[#EDE5DA]/10 hover:border-[#62AA9E]/50 hover:bg-[#0d2828]/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className={`p-1.5 sm:p-2.5 rounded-lg border ${
                    isSelected ? "border-[#62AA9E] text-[#62AA9E] bg-[#62AA9E]/10" : "border-[#EDE5DA]/20 text-[#EDE5DA]/70"
                  }`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#62AA9E] font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-sm sm:text-lg font-normal text-[#EDE5DA] mb-0.5 sm:mb-1">
                  {pillar.name}
                </h3>
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-[#808080] block mb-1 sm:mb-2 font-medium truncate">
                  {pillar.subtitle}
                </span>
                <p className="text-[11px] sm:text-xs text-[#EDE5DA]/75 font-light leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 05. DISTRICT & MASTERPLAN (Frame 05 from 01 - Home Page.pdf)          */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch5Ref}
        id="masterplan"
        className="absolute inset-0 z-30 opacity-0 transition-opacity duration-300"
      >
        {/* Section Header */}
        <div className="absolute top-18 sm:top-28 left-4 sm:left-12 lg:left-16 max-w-sm sm:max-w-lg z-30 pointer-events-auto">
          <div className="flex items-center gap-3 mb-1.5 sm:mb-2">
            <span className="text-[9.5px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] font-semibold text-[#62AA9E] uppercase">
              District Masterplan
            </span>
            <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
          </div>

          <h2 className="font-serif text-xl sm:text-4xl lg:text-5xl font-light text-[#EDE5DA] leading-tight uppercase">
            The Lakefront
            <span className="block font-serif italic text-[#62AA9E] font-normal text-lg sm:text-3xl lg:text-4xl normal-case mt-0.5 sm:mt-1">
              at the Heart of DHA Phase III.
            </span>
          </h2>
        </div>

        {/* Interactive Masterplan Hotspots */}
        {DISTRICT_HOTSPOTS.map((spot) => {
          const isActive = activeHotspot === spot.id;
          return (
            <div
              key={spot.id}
              style={{ top: spot.top, left: spot.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer z-40"
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={() => setActiveHotspot(isActive ? null : spot.id)}
            >
              {/* Outer Pulse Pin */}
              <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl ${
                isActive
                  ? "bg-[#62AA9E] text-[#0d2828] border border-white scale-105"
                  : "bg-[#0d2828]/90 text-[#EDE5DA] border border-[#62AA9E]/60 hover:border-[#62AA9E] hover:scale-105"
              }`}>
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  isActive ? "bg-[#0d2828] animate-ping" : "bg-[#62AA9E] animate-pulse"
                }`} />
                <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium whitespace-nowrap">
                  {spot.name}
                </span>
              </div>

              {/* Desktop Detail Card Overlay */}
              <div
                className={`hidden sm:block transition-all duration-300 overflow-hidden mt-2 w-60 ${
                  spot.id === "tower"
                    ? "-translate-x-20 sm:-translate-x-24"
                    : "-translate-x-6 sm:-translate-x-8"
                } ${
                  isActive
                    ? "max-h-40 opacity-100 scale-100"
                    : "max-h-0 opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="bg-[#0d2828]/95 border border-[#62AA9E]/50 backdrop-blur-xl p-3.5 rounded-xl shadow-2xl space-y-1.5">
                  <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-[#62AA9E] block">
                    {spot.category}
                  </span>
                  <p className="text-xs font-sans-body text-[#EDE5DA]/90 leading-relaxed font-light">
                    {spot.detail}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Mobile Active Hotspot Docked Bottom Card */}
        {activeHotspot && (
          <div className="sm:hidden fixed bottom-6 left-4 right-4 z-50 pointer-events-auto transition-all duration-300">
            {(() => {
              const spot = DISTRICT_HOTSPOTS.find((s) => s.id === activeHotspot);
              if (!spot) return null;
              return (
                <div className="bg-[#0d2828]/95 border border-[#62AA9E]/60 backdrop-blur-xl p-4 rounded-xl shadow-2xl space-y-1.5 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-[#62AA9E]">
                      {spot.category} · {spot.name}
                    </span>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-[#EDE5DA]/60 hover:text-white p-1 text-xs"
                      aria-label="Close hotspot detail"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs font-sans-body text-[#EDE5DA]/90 leading-relaxed font-light">
                    {spot.detail}
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 06. INVESTMENT (Frame 06 from 01 - Home Page.pdf)                     */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch6Ref}
        id="investment"
        className="absolute inset-0 flex items-center justify-center sm:justify-start px-4 sm:px-12 lg:px-24 z-20 opacity-0"
      >
        <div className="max-w-xl text-left space-y-4 sm:space-y-5">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] tracking-[0.35em] sm:tracking-[0.4em] font-semibold text-[#62AA9E] uppercase">
              Investment
            </span>
            <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
          </div>

          <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-tight uppercase">
            Where Lifestyle
            <span className="block font-serif italic text-[#62AA9E] font-normal mt-1 normal-case text-xl sm:text-4xl lg:text-5xl">
              Meets Investment.
            </span>
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2 max-w-md">
            <div className="p-0 sm:p-3.5 sm:rounded-xl sm:bg-[#0d2828]/80 sm:border sm:border-[#EDE5DA]/10 sm:backdrop-blur-md">
              <span className="text-[11px] sm:text-xs text-[#62AA9E] font-semibold uppercase tracking-wider block mb-0.5 sm:mb-1">
                Prime Scarcity
              </span>
              <p className="text-[10px] sm:text-[11px] text-[#EDE5DA]/75 font-light leading-snug">
                Finite lakefront land in DHA Phase III Sector F.
              </p>
            </div>

            <div className="p-0 sm:p-3.5 sm:rounded-xl sm:bg-[#0d2828]/80 sm:border sm:border-[#EDE5DA]/10 sm:backdrop-blur-md">
              <span className="text-[11px] sm:text-xs text-[#62AA9E] font-semibold uppercase tracking-wider block mb-0.5 sm:mb-1">
                Ecosystem
              </span>
              <p className="text-[10px] sm:text-[11px] text-[#EDE5DA]/75 font-light leading-snug">
                Built-in residential footfall & commercial prestige.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 07. CLOSING HORIZON & CTA (Frame 07 from 01 - Home Page.pdf)         */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch7Ref}
        id="closing"
        className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 sm:px-6 z-20 opacity-0"
      >
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
          <span className="text-[10px] tracking-[0.35em] sm:tracking-[0.4em] font-semibold text-[#62AA9E] uppercase">
            The Horizon
          </span>
          <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
        </div>

        <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-tight uppercase">
          The Future
          <span className="block font-serif italic text-[#62AA9E] font-normal mt-1 normal-case text-2xl sm:text-5xl lg:text-6xl">
            Has an Address.
          </span>
        </h2>

        {/* Dual Actions from 01 - Home Page.pdf */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md px-2 sm:px-0">
          <button
            onClick={() => {
              if (onOpenInquiry) {
                onOpenInquiry();
              }
            }}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-full bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] font-sans-body font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book a Private Tour</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#architecture"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-full bg-[#0d2828]/80 hover:bg-[#0d2828] border border-[#EDE5DA]/20 hover:border-[#62AA9E] text-[#EDE5DA] font-sans-body font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg flex items-center justify-center text-center"
          >
            Explore Orion One
          </a>
        </div>

        <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#808080] uppercase mt-6 sm:mt-8 font-light">
          Show Suite Open Daily · 10AM – 7PM · DHA Phase III Islamabad
        </span>
      </div>
    </section>
  );
}

// React.memo optimization to prevent unnecessary re-renders during high-frequency scroll scrubbing
export default memo(CinematicCanvasComponent);
