"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
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
const COLUMN_FRAMES_COUNT = 80;
const COLUMN_BG_CHUNK_SIZE = 20;

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

// ---------------------------------------------------------------------------
// MODULAR 3-COLUMN INVESTMENT CONFIGURATION
// Ready for future column-specific video frames / folders:
// Simply update startFrame / endFrame or point to separate column asset arrays.
// ---------------------------------------------------------------------------
interface InvestmentColumnConfig {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  detail: string;
  folder: string;
}

const INVESTMENT_COLUMNS: InvestmentColumnConfig[] = [
  {
    id: "col-1",
    number: "01",
    title: "Commercial Arcade",
    subtitle: "High-End Galleria",
    detail: "Double-height luxury fashion retail arcade and bespoke designer boutiques.",
    folder: "column-1-frames",
  },
  {
    id: "col-2",
    number: "02",
    title: "Curated Residences",
    subtitle: "Panoramic Lake Living",
    detail: "Expansive open-plan living with floor-to-ceiling glass and private sunset balconies.",
    folder: "column-2-frames",
  },
  {
    id: "col-3",
    number: "03",
    title: "Signature Amenities",
    subtitle: "Promenade & Fine Dining",
    detail: "Lakeside open-air fine dining terraces, wellness club, and scenic waterfront promenade.",
    folder: "column-3-frames",
  },
];

interface CinematicCanvasProps {
  onOpenInquiry?: () => void;
}

function CinematicCanvasComponent({ onOpenInquiry }: CinematicCanvasProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Story Chapter Overlay Refs
  const ch2Ref = useRef<HTMLDivElement>(null); // 01. Architecture / A New Horizon
  const ch3Ref = useRef<HTMLDivElement>(null); // 02. Waterfront
  const ch4Ref = useRef<HTMLDivElement>(null); // 03. Destination & Pillars
  const ch5Ref = useRef<HTMLDivElement>(null); // 04. District Masterplan
  const ch6Ref = useRef<HTMLDivElement>(null); // 05. Investment Proposition
  const ch7Ref = useRef<HTMLDivElement>(null); // 06. Closing Horizon & CTA

  // 3 Investment Column Canvas, Content, Bar & Scrim Refs
  const col1CanvasRef = useRef<HTMLCanvasElement>(null);
  const col2CanvasRef = useRef<HTMLCanvasElement>(null);
  const col3CanvasRef = useRef<HTMLCanvasElement>(null);
  const col1CardRef = useRef<HTMLDivElement>(null);
  const col2CardRef = useRef<HTMLDivElement>(null);
  const col3CardRef = useRef<HTMLDivElement>(null);
  const col1BarRef = useRef<HTMLDivElement>(null);
  const col2BarRef = useRef<HTMLDivElement>(null);
  const col3BarRef = useRef<HTMLDivElement>(null);
  const col1ScrimRef = useRef<HTMLDivElement>(null);
  const col2ScrimRef = useRef<HTMLDivElement>(null);
  const col3ScrimRef = useRef<HTMLDivElement>(null);
  const col1CtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const col2CtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const col3CtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const col1LastFrameRef = useRef<number>(-1);
  const col2LastFrameRef = useRef<number>(-1);
  const col3LastFrameRef = useRef<number>(-1);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const col1FramesRef = useRef<HTMLImageElement[]>([]);
  const col2FramesRef = useRef<HTMLImageElement[]>([]);
  const col3FramesRef = useRef<HTMLImageElement[]>([]);

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

  // Column-specific canvas renderer with aspect-ratio cover
  const renderFrameToColumnCanvas = useCallback(
    (
      canvas: HTMLCanvasElement | null,
      ctxHolder: { current: CanvasRenderingContext2D | null },
      img: HTMLImageElement | null
    ) => {
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
      if (canvas.width === 0 || canvas.height === 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = (rect.width || 360) * dpr;
        canvas.height = (rect.height || 420) * dpr;
      }
      if (!ctxHolder.current) {
        ctxHolder.current = canvas.getContext("2d", { alpha: false });
      }
      const ctx = ctxHolder.current;
      if (!ctx) return;

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
    },
    []
  );

  // High-DPI Canvas Resizing
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas) {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      lastFrameIndexRef.current = -1; // Invalidate frame cache to force fresh redraw

      if (framesRef.current.length > 0 && framesRef.current[0]) {
        renderToCanvas(framesRef.current[0]);
      }
    }

    // Resize 3 investment column canvases (full width 1/3 and full height)
    const colWidth = window.innerWidth / 3;
    const colHeight = window.innerHeight;
    const colCanvases = [
      { canvas: col1CanvasRef.current, ctx: col1CtxRef, lastRef: col1LastFrameRef, framesRef: col1FramesRef },
      { canvas: col2CanvasRef.current, ctx: col2CtxRef, lastRef: col2LastFrameRef, framesRef: col2FramesRef },
      { canvas: col3CanvasRef.current, ctx: col3CtxRef, lastRef: col3LastFrameRef, framesRef: col3FramesRef },
    ];
    colCanvases.forEach(({ canvas: c, ctx, lastRef, framesRef: colFRef }) => {
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const w = rect.width > 0 ? rect.width : colWidth;
      const h = rect.height > 0 ? rect.height : colHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      lastRef.current = -1;
      if (colFRef.current[0]) {
        renderFrameToColumnCanvas(c, ctx, colFRef.current[0]);
      }
    });
  }, [renderToCanvas, renderFrameToColumnCanvas]);

  // 2. PROGRESSIVE FRAME LOADING LOGIC
  // Phase 1 (Priority): Load first 30 frames immediately for instant interactive Hero state
  // Phase 2 (Background): Asynchronously fetch remaining frames in chunks of 50
  useEffect(() => {
    let isCancelled = false;
    const loadedFrames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    const col1Frames: HTMLImageElement[] = new Array(COLUMN_FRAMES_COUNT);
    const col2Frames: HTMLImageElement[] = new Array(COLUMN_FRAMES_COUNT);
    const col3Frames: HTMLImageElement[] = new Array(COLUMN_FRAMES_COUNT);

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

      // Priority load frame 1 for each of the 3 columns
      const colInitialPromises = [
        loadImage("/column-1-frames/frame_0001.jpg").then((img) => {
          if (isCancelled) return;
          col1Frames[0] = img;
          col1FramesRef.current = col1Frames;
          col1LastFrameRef.current = 0;
          renderFrameToColumnCanvas(col1CanvasRef.current, col1CtxRef, img);
        }),
        loadImage("/column-2-frames/frame_0001.jpg").then((img) => {
          if (isCancelled) return;
          col2Frames[0] = img;
          col2FramesRef.current = col2Frames;
          col2LastFrameRef.current = 0;
          renderFrameToColumnCanvas(col2CanvasRef.current, col2CtxRef, img);
        }),
        loadImage("/column-3-frames/frame_0001.jpg").then((img) => {
          if (isCancelled) return;
          col3Frames[0] = img;
          col3FramesRef.current = col3Frames;
          col3LastFrameRef.current = 0;
          renderFrameToColumnCanvas(col3CanvasRef.current, col3CtxRef, img);
        }),
      ];

      await Promise.all([...priorityPromises, ...colInitialPromises]);

      if (isCancelled) return;

      framesRef.current = loadedFrames;
      setIsLoaded(true); // Unlock screen instantly after priority frames
      if (loadedFrames[0]) {
        renderToCanvas(loadedFrames[0]);
      }

      // Smooth luxury transition: dissolve preloader & gracefully reveal starting section
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

      if (ch2Ref.current) {
        gsap.fromTo(
          ch2Ref.current,
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

      // Start Background Load for remaining frames in chunks
      loadBackgroundFrames(loadedFrames);
      loadBackgroundColumnFrames(col1Frames, col2Frames, col3Frames);
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

    const loadBackgroundColumnFrames = async (
      c1: HTMLImageElement[],
      c2: HTMLImageElement[],
      c3: HTMLImageElement[]
    ) => {
      let currentFrame = 2;

      while (currentFrame <= COLUMN_FRAMES_COUNT && !isCancelled) {
        const chunkEnd = Math.min(currentFrame + COLUMN_BG_CHUNK_SIZE - 1, COLUMN_FRAMES_COUNT);
        const chunkPromises: Promise<void>[] = [];

        for (let i = currentFrame; i <= chunkEnd; i++) {
          const idx = i - 1;
          const frameNum = String(i).padStart(4, "0");

          chunkPromises.push(
            loadImage(`/column-1-frames/frame_${frameNum}.jpg`).then((img) => {
              if (isCancelled) return;
              c1[idx] = img;
            })
          );
          chunkPromises.push(
            loadImage(`/column-2-frames/frame_${frameNum}.jpg`).then((img) => {
              if (isCancelled) return;
              c2[idx] = img;
            })
          );
          chunkPromises.push(
            loadImage(`/column-3-frames/frame_${frameNum}.jpg`).then((img) => {
              if (isCancelled) return;
              c3[idx] = img;
            })
          );
        }

        await Promise.all(chunkPromises);
        if (isCancelled) break;

        col1FramesRef.current = c1;
        col2FramesRef.current = c2;
        col3FramesRef.current = c3;

        currentFrame = chunkEnd + 1;
      }
    };

    loadPriorityFrames();

    return () => {
      isCancelled = true;
    };
  }, [renderToCanvas, renderFrameToColumnCanvas]);

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
        end: "+=1100%", // Extended pin scroll track for comfortable, unhurried column video scrubbing
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
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

          // 1. Starting Scene (Scene 2): A New Horizon of Luxury (0% -> 17%)
          // Fully visible on landing (0% -> 12%), then smoothly fades out into Waterfront
          const op2 = progress <= 0.12 ? 1 : Math.max(0, 1 - (progress - 0.12) / (0.17 - 0.12));
          if (ch2Ref.current) {
            if (progress > 0) {
              gsap.killTweensOf(ch2Ref.current);
              hasAnimatedEntrance.current = true;
              gsap.set(ch2Ref.current, {
                opacity: op2,
                y: (1 - op2) * -18,
                pointerEvents: op2 > 0.5 ? "auto" : "none",
              });
            } else if (hasAnimatedEntrance.current) {
              gsap.set(ch2Ref.current, {
                opacity: 1,
                y: 0,
                pointerEvents: "auto",
              });
            }
          }

          // 2. Waterfront (Scene 3: 17% -> 34%)
          const op3 = calcOpacity(progress, 0.17, 0.20, 0.30, 0.34);
          if (ch3Ref.current) {
            gsap.set(ch3Ref.current, {
              opacity: op3,
              y: (1 - op3) * 20,
              pointerEvents: op3 > 0.5 ? "auto" : "none",
            });
          }

          // 3. Destination & Pillars (Scene 4: 34% -> 47%)
          const op4 = calcOpacity(progress, 0.34, 0.36, 0.44, 0.47);
          if (ch4Ref.current) {
            gsap.set(ch4Ref.current, {
              opacity: op4,
              y: (1 - op4) * 20,
              pointerEvents: op4 > 0.5 ? "auto" : "none",
            });
          }

          // 4. District Masterplan & Hotspots (Scene 5: 47% -> 64%)
          const op5 = calcOpacity(progress, 0.47, 0.50, 0.60, 0.63);
          if (ch5Ref.current) {
            gsap.set(ch5Ref.current, {
              opacity: op5,
              pointerEvents: op5 > 0.5 ? "auto" : "none",
            });
          }

          // 5. Lifestyle Meets Investment (Scene 6: 63% -> 92%)
          // Generously extended duration so all 3 column video clips scrub smoothly and unhurriedly
          const op6 = calcOpacity(progress, 0.63, 0.66, 0.89, 0.92);
          if (ch6Ref.current) {
            gsap.set(ch6Ref.current, {
              opacity: op6,
              y: (1 - op6) * 16,
              pointerEvents: op6 > 0.5 ? "auto" : "none",
            });
          }

          // Sequential 3-column scroll movement and frame scrubbing
          // Phase 1 (0.00 -> 0.33): Column 1 moves and scrubs its frames
          // Phase 2 (0.33 -> 0.66): Column 2 moves and scrubs its frames
          // Phase 3 (0.66 -> 1.00): Column 3 moves and scrubs its frames
          const investProg = Math.max(0, Math.min(1, (progress - 0.66) / (0.88 - 0.66)));
          const p1 = Math.max(0, Math.min(1, investProg / 0.33));
          const p2 = Math.max(0, Math.min(1, (investProg - 0.33) / 0.33));
          const p3 = Math.max(0, Math.min(1, (investProg - 0.66) / 0.34));

          const getColFrame = (colFrames: HTMLImageElement[], idx: number) => {
            if (colFrames[idx]) return colFrames[idx];
            for (let k = idx - 1; k >= 0; k--) {
              if (colFrames[k]) return colFrames[k];
            }
            for (let k = idx + 1; k < colFrames.length; k++) {
              if (colFrames[k]) return colFrames[k];
            }
            return colFrames[0] || null;
          };

          const col1FrameIdx = Math.min(
            COLUMN_FRAMES_COUNT - 1,
            Math.floor(p1 * (COLUMN_FRAMES_COUNT - 1))
          );
          const col2FrameIdx = Math.min(
            COLUMN_FRAMES_COUNT - 1,
            Math.floor(p2 * (COLUMN_FRAMES_COUNT - 1))
          );
          const col3FrameIdx = Math.min(
            COLUMN_FRAMES_COUNT - 1,
            Math.floor(p3 * (COLUMN_FRAMES_COUNT - 1))
          );

          if (col1FrameIdx !== col1LastFrameRef.current) {
            col1LastFrameRef.current = col1FrameIdx;
            const img = getColFrame(col1FramesRef.current, col1FrameIdx);
            if (img) renderFrameToColumnCanvas(col1CanvasRef.current, col1CtxRef, img);
          }
          if (col2FrameIdx !== col2LastFrameRef.current) {
            col2LastFrameRef.current = col2FrameIdx;
            const img = getColFrame(col2FramesRef.current, col2FrameIdx);
            if (img) renderFrameToColumnCanvas(col2CanvasRef.current, col2CtxRef, img);
          }
          if (col3FrameIdx !== col3LastFrameRef.current) {
            col3LastFrameRef.current = col3FrameIdx;
            const img = getColFrame(col3FramesRef.current, col3FrameIdx);
            if (img) renderFrameToColumnCanvas(col3CanvasRef.current, col3CtxRef, img);
          }

          // Individual column progress bars
          if (col1BarRef.current) col1BarRef.current.style.width = `${p1 * 100}%`;
          if (col2BarRef.current) col2BarRef.current.style.width = `${p2 * 100}%`;
          if (col3BarRef.current) col3BarRef.current.style.width = `${p3 * 100}%`;

          // Column focus scrims & content vertical scroll motion
          const isCol1Active = investProg > 0 && investProg <= 0.33;
          const isCol2Active = investProg > 0.33 && investProg <= 0.66;
          const isCol3Active = investProg > 0.66 && investProg <= 1.0;

          // Focus scrims: active column is illuminated (opacity 0), inactive are subtly shaded
          if (col1ScrimRef.current) {
            col1ScrimRef.current.style.opacity = isCol1Active ? "0" : p1 >= 1 ? "0.2" : "0.55";
          }
          if (col2ScrimRef.current) {
            col2ScrimRef.current.style.opacity = isCol2Active ? "0" : p2 >= 1 ? "0.2" : "0.55";
          }
          if (col3ScrimRef.current) {
            col3ScrimRef.current.style.opacity = isCol3Active ? "0" : p3 >= 1 ? "0.2" : "0.55";
          }

          // Text content lifts smoothly as each column moves
          if (col1CardRef.current) {
            gsap.set(col1CardRef.current, {
              y: (1 - p1) * 20,
            });
          }
          if (col2CardRef.current) {
            gsap.set(col2CardRef.current, {
              y: (1 - p2) * 20,
            });
          }
          if (col3CardRef.current) {
            gsap.set(col3CardRef.current, {
              y: (1 - p3) * 20,
            });
          }

          // 6. Closing Horizon & CTA (Scene 7: 90% -> 100%)
          const op7 = calcOpacity(progress, 0.90, 0.93, 0.99, 1.0);
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
  }, [renderToCanvas, renderFrameToColumnCanvas]);

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
      {/* 01. A NEW HORIZON OF LUXURY (Starting Chapter)                        */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch2Ref}
        id="architecture"
        className="absolute inset-0 flex items-center justify-center sm:justify-end px-4 sm:px-12 lg:px-24 z-20 pointer-events-auto opacity-0"
      >
        <div className="max-w-xl text-left sm:text-right space-y-3 sm:space-y-4">
          <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-tight uppercase">
            A New Horizon
            <span className="block font-serif italic text-[#62AA9E] font-normal mt-1 normal-case text-xl sm:text-4xl lg:text-5xl">
              of Luxury.
            </span>
          </h1>

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
        className="absolute inset-0 w-full h-full z-20 opacity-0 pointer-events-none overflow-hidden"
      >
        {/* Floating Top Header across the 3 columns */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none px-6 sm:px-12 lg:px-16 pt-8 sm:pt-12 pb-16 bg-gradient-to-b from-[#0d2828]/95 via-[#0d2828]/60 to-transparent">
          <div className="w-full">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-[#EDE5DA] leading-tight uppercase">
              Where Lifestyle{" "}
              <span className="font-serif italic text-[#62AA9E] font-normal normal-case">
                Meets Investment.
              </span>
            </h2>
          </div>
        </div>

        {/* 3 Columns: Full Width, Full Height, Edge-to-Edge */}
        <div className="w-full h-full grid grid-cols-3">
          {/* Column 01: Commercial Arcade */}
          <div className="relative h-full overflow-hidden border-r border-[#EDE5DA]/15 flex flex-col justify-end">
            {/* Poster fallback for instant display */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/column-1-frames/frame_0001.jpg"
              alt="Commercial Arcade"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            />
            <canvas
              ref={col1CanvasRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
            />
            {/* Base gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2828]/95 via-[#0d2828]/35 to-transparent pointer-events-none z-[15]" />
            {/* Dynamic focus scrim */}
            <div
              ref={col1ScrimRef}
              className="absolute inset-0 bg-[#0d2828] transition-opacity duration-300 pointer-events-none z-[15]"
              style={{ opacity: 0.55 }}
            />

            {/* Column Bottom Content */}
            <div
              ref={col1CardRef}
              className="relative z-20 p-4 sm:p-8 lg:p-12 pb-8 sm:pb-12 lg:pb-16 space-y-2 sm:space-y-4"
            >
              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-xs text-[#62AA9E] font-semibold uppercase tracking-wider block">
                  {INVESTMENT_COLUMNS[0].subtitle}
                </span>
                <h3 className="font-serif text-base sm:text-2xl lg:text-3xl text-[#EDE5DA] font-light leading-snug">
                  {INVESTMENT_COLUMNS[0].title}
                </h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-[#EDE5DA]/85 font-light leading-relaxed hidden sm:block">
                  {INVESTMENT_COLUMNS[0].detail}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="pt-2 sm:pt-4">
                <div className="w-full h-1 sm:h-1.5 rounded-full bg-[#EDE5DA]/20 overflow-hidden backdrop-blur-sm">
                  <div
                    ref={col1BarRef}
                    className="h-full bg-gradient-to-r from-[#62AA9E] to-[#EDE5DA] rounded-full transition-all duration-75"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 02: Curated Residences */}
          <div className="relative h-full overflow-hidden border-r border-[#EDE5DA]/15 flex flex-col justify-end">
            {/* Poster fallback for instant display */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/column-2-frames/frame_0001.jpg"
              alt="Curated Residences"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            />
            <canvas
              ref={col2CanvasRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2828]/95 via-[#0d2828]/35 to-transparent pointer-events-none z-[15]" />
            <div
              ref={col2ScrimRef}
              className="absolute inset-0 bg-[#0d2828] transition-opacity duration-300 pointer-events-none z-[15]"
              style={{ opacity: 0.55 }}
            />

            <div
              ref={col2CardRef}
              className="relative z-20 p-4 sm:p-8 lg:p-12 pb-8 sm:pb-12 lg:pb-16 space-y-2 sm:space-y-4"
            >
              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-xs text-[#62AA9E] font-semibold uppercase tracking-wider block">
                  {INVESTMENT_COLUMNS[1].subtitle}
                </span>
                <h3 className="font-serif text-base sm:text-2xl lg:text-3xl text-[#EDE5DA] font-light leading-snug">
                  {INVESTMENT_COLUMNS[1].title}
                </h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-[#EDE5DA]/85 font-light leading-relaxed hidden sm:block">
                  {INVESTMENT_COLUMNS[1].detail}
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <div className="w-full h-1 sm:h-1.5 rounded-full bg-[#EDE5DA]/20 overflow-hidden backdrop-blur-sm">
                  <div
                    ref={col2BarRef}
                    className="h-full bg-gradient-to-r from-[#62AA9E] to-[#EDE5DA] rounded-full transition-all duration-75"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 03: Signature Amenities */}
          <div className="relative h-full overflow-hidden flex flex-col justify-end">
            {/* Poster fallback for instant display */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/column-3-frames/frame_0001.jpg"
              alt="Signature Amenities"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            />
            <canvas
              ref={col3CanvasRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2828]/95 via-[#0d2828]/35 to-transparent pointer-events-none z-[15]" />
            <div
              ref={col3ScrimRef}
              className="absolute inset-0 bg-[#0d2828] transition-opacity duration-300 pointer-events-none z-[15]"
              style={{ opacity: 0.55 }}
            />

            <div
              ref={col3CardRef}
              className="relative z-20 p-4 sm:p-8 lg:p-12 pb-8 sm:pb-12 lg:pb-16 space-y-2 sm:space-y-4"
            >
              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-xs text-[#62AA9E] font-semibold uppercase tracking-wider block">
                  {INVESTMENT_COLUMNS[2].subtitle}
                </span>
                <h3 className="font-serif text-base sm:text-2xl lg:text-3xl text-[#EDE5DA] font-light leading-snug">
                  {INVESTMENT_COLUMNS[2].title}
                </h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-[#EDE5DA]/85 font-light leading-relaxed hidden sm:block">
                  {INVESTMENT_COLUMNS[2].detail}
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <div className="w-full h-1 sm:h-1.5 rounded-full bg-[#EDE5DA]/20 overflow-hidden backdrop-blur-sm">
                  <div
                    ref={col3BarRef}
                    className="h-full bg-gradient-to-r from-[#62AA9E] to-[#EDE5DA] rounded-full transition-all duration-75"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
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
