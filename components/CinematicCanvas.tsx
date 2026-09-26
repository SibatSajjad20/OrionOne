"use client";

import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  Waves,
  Trees,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import OrionLogoScrollWheel from "./OrionLogoScrollWheel";
import LoadingScreen from "./LoadingScreen";

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
const COLUMN_FRAMES_COUNT = 240;

// ---------------------------------------------------------------------------
// CHAPTER FRAME BOUNDARIES & GUARANTEED ANCHORS
// Strictly guarantees that fast scrolling NEVER displays frames outside their chapter.
// ---------------------------------------------------------------------------
interface ChapterDef {
  id: string;
  name: string;
  startIdx: number;  // 0-indexed inclusive
  endIdx: number;    // 0-indexed inclusive
  anchorIdx: number; // Guaranteed priority-loaded anchor frame index
}

const CHAPTER_DEFS: ChapterDef[] = [
  { id: "scene2", name: "Architecture", startIdx: 0, endIdx: 65, anchorIdx: 0 },         // frames 1..66
  { id: "scene3", name: "Waterfront", startIdx: 66, endIdx: 155, anchorIdx: 66 },        // frames 67..156 (pure Waterfront)
  { id: "scene5", name: "Masterplan", startIdx: 204, endIdx: 275, anchorIdx: 204 },      // frames 205..276 (pure Masterplan)
  { id: "scene4", name: "Destination", startIdx: 163, endIdx: 196, anchorIdx: 163 },     // frames 164..197 (Infinity Pool)
  { id: "scene7", name: "Closing", startIdx: 329, endIdx: 392, anchorIdx: 329 },         // frames 330..393
];

// Bidirectional, chapter-clamped safe frame lookup
function getSafeFrame(frames: HTMLImageElement[], targetIdx: number): HTMLImageElement | null {
  if (frames[targetIdx]) return frames[targetIdx];

  const chapter = CHAPTER_DEFS.find((c) => targetIdx >= c.startIdx && targetIdx <= c.endIdx);
  if (!chapter) {
    return frames[163] || frames[329] || frames[204] || frames[0] || null;
  }

  // Nearest frame search bounded strictly within chapter
  let bestFrame: HTMLImageElement | null = null;
  let minDiff = Infinity;
  for (let i = chapter.startIdx; i <= chapter.endIdx; i++) {
    if (frames[i]) {
      const diff = Math.abs(i - targetIdx);
      if (diff < minDiff) {
        minDiff = diff;
        bestFrame = frames[i];
      }
    }
  }

  if (bestFrame) return bestFrame;
  return frames[chapter.anchorIdx] || frames[0] || null;
}

function getSafeColFrame(colFrames: HTMLImageElement[], targetIdx: number): HTMLImageElement | null {
  if (colFrames[targetIdx]) return colFrames[targetIdx];

  for (let offset = 1; offset < COLUMN_FRAMES_COUNT; offset++) {
    const left = targetIdx - offset;
    if (left >= 0 && colFrames[left]) return colFrames[left];
    const right = targetIdx + offset;
    if (right < COLUMN_FRAMES_COUNT && colFrames[right]) return colFrames[right];
  }

  return colFrames[0] || null;
}

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
  const closingLogoTargetRef = useRef<HTMLDivElement>(null); // 3D Orion Logo Docking Anchor (Scene 6 / CTA)
  const scene1LogoAnchorRef = useRef<HTMLDivElement>(null); // Scene 1 beside heading
  const scene2LogoAnchorRef = useRef<HTMLDivElement>(null); // Scene 2 Waterfront left heading
  const scene3LogoAnchorRef = useRef<HTMLDivElement>(null); // Scene 3 District Masterplan top
  const col1LogoAnchorRef = useRef<HTMLDivElement>(null); // Scene 4 Column 1 top
  const col2LogoAnchorRef = useRef<HTMLDivElement>(null); // Scene 4 Column 2 top
  const col3LogoAnchorRef = useRef<HTMLDivElement>(null); // Scene 4 Column 3 top
  const scene5LogoAnchorRef = useRef<HTMLDivElement>(null); // Scene 5 Destination top
  const scrollProgressRef = useRef<number>(0);

  const targetRefs = useMemo(
    () => ({
      scene1: scene1LogoAnchorRef,
      scene2: scene2LogoAnchorRef,
      scene3: scene3LogoAnchorRef,
      col1: col1LogoAnchorRef,
      col2: col2LogoAnchorRef,
      col3: col3LogoAnchorRef,
      scene5: scene5LogoAnchorRef,
      scene6: closingLogoTargetRef,
    }),
    []
  );

  // 3 Investment Column Canvas, Content, Bar & Scrim Refs
  const col1ContainerRef = useRef<HTMLDivElement>(null);
  const col2ContainerRef = useRef<HTMLDivElement>(null);
  const col3ContainerRef = useRef<HTMLDivElement>(null);
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

  // Frame Cache Refs
  const framesRef = useRef<HTMLImageElement[]>([]);
  const col1FramesRef = useRef<HTMLImageElement[]>([]);
  const col2FramesRef = useRef<HTMLImageElement[]>([]);
  const col3FramesRef = useRef<HTMLImageElement[]>([]);

  // Render Target State Refs for Decoupled RAF Engine (with Dual-Frame Hardware Crossfade)
  const targetMainFrameRef = useRef<number>(0);
  const targetBlendFrameRef = useRef<number>(-1);
  const targetBlendAlphaRef = useRef<number>(0);
  const lastBlendFrameRef = useRef<number>(-1);
  const lastBlendAlphaRef = useRef<number>(0);
  const targetCol1FrameRef = useRef<number>(0);
  const targetCol2FrameRef = useRef<number>(0);
  const targetCol3FrameRef = useRef<number>(0);
  const isSection6ActiveRef = useRef<boolean>(false);
  const isSection6FullyOpaqueRef = useRef<boolean>(false);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [activeMobileCol, setActiveMobileCol] = useState<number>(0);
  const lastMobileColRef = useRef<number>(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const hasAnimatedEntrance = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastFrameIndexRef = useRef<number>(-1);
  const [activePillar, setActivePillar] = useState<number>(0);

  // Lock scroll, hide scrollbar, and prevent all scroll interactions until loading completes
  useEffect(() => {
    const getLenis = () =>
      (
        window as unknown as {
          lenis?: {
            stop: () => void;
            start: () => void;
            scrollTo: (target: number, opts?: { immediate?: boolean }) => void;
            resize: () => void;
          };
        }
      ).lenis;

    if (!isPreloaderDone) {
      document.documentElement.classList.add("loading-lock");
      document.body.classList.add("loading-lock");

      const lenis = getLenis();
      if (lenis) {
        lenis.stop();
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);

      // Prevent wheel, touch, and scroll keys while loading
      const preventScroll = (e: Event) => {
        e.preventDefault();
      };
      const preventKeyScroll = (e: KeyboardEvent) => {
        if (
          [
            "Space",
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            "Home",
            "End",
          ].includes(e.code)
        ) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });

      return () => {
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", preventKeyScroll);
      };
    } else {
      document.documentElement.classList.remove("loading-lock");
      document.body.classList.remove("loading-lock");

      const lenis = getLenis();
      if (lenis) {
        lenis.start();
        lenis.resize();
      }
      ScrollTrigger.refresh();
    }
  }, [isPreloaderDone]);

  // Ensure scroll lock is released if component unmounts
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("loading-lock");
      document.body.classList.remove("loading-lock");
      const lenis = (window as unknown as { lenis?: { start: () => void; resize: () => void } }).lenis;
      if (lenis) {
        lenis.start();
        lenis.resize();
      }
      ScrollTrigger.refresh();
    };
  }, []);

  // Dual-frame object-fit cover rendering engine (Hardware-accelerated, single-pass optical blend)
  const renderToCanvas = useCallback(
    (
      imgA: HTMLImageElement | null,
      imgB: HTMLImageElement | null = null,
      blendAlpha: number = 0
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (!ctxRef.current) {
        ctxRef.current = canvas.getContext("2d", { alpha: false });
      }
      const ctx = ctxRef.current;
      if (!ctx || !imgA || !imgA.complete || imgA.naturalWidth === 0) return;

      const drawCover = (img: HTMLImageElement, alpha: number) => {
        if (!img.complete || img.naturalWidth === 0) return;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        if (alpha < 0.999) {
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        }
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
        if (alpha < 0.999) {
          ctx.globalAlpha = 1.0;
        }
      };

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";

      // Draw primary base frame
      drawCover(imgA, 1.0);

      // Optical crossfade: smoothly blend secondary incoming frame directly into the exact same buffer
      if (blendAlpha > 0.002 && imgB && imgB.complete && imgB.naturalWidth > 0) {
        drawCover(imgB, blendAlpha);
      }
    },
    []
  );

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
      lastBlendFrameRef.current = -1;
      lastBlendAlphaRef.current = 0;

      if (framesRef.current.length > 0 && framesRef.current[0]) {
        renderToCanvas(framesRef.current[0]);
      }
    }

    const isMobile = window.innerWidth < 768;
    const colWidth = isMobile ? window.innerWidth : window.innerWidth / 3;
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

  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // ULTRA-FAST PARALLEL CONCURRENCY PRELOADER ENGINE (WebP Optimized)
  // 1. Loads all 340 active sequence frames via a 16-worker parallel pool.
  // 2. Pre-decodes each frame asynchronously (img.decode()) to eliminate
  //    first-scroll GPU decompression stutter.
  // 3. Holds preloader until 100% of active frames are in memory, guaranteeing
  //    that the VERY FIRST SCROLL is 100% butter-smooth 60 FPS from top to CTA.
  // 4. Immediately streams column frames in the background via the worker pool.
  // ---------------------------------------------------------------------------
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

    // Critical sequence indices for immediate interactive entry (Scene 2 Architecture: 0..65)
    const criticalIndices: number[] = [];
    for (let i = 0; i <= 65; i++) criticalIndices.push(i);

    // Remaining sequence indices streamed in the background
    // Scene 3 (Waterfront): 66..155
    // Scene 5 (Masterplan): 204..275
    // Scene 4 (Destination): 163..196
    // Scene 7 (Closing): 329..392
    const remainingIndices: number[] = [];
    for (let i = 66; i <= 155; i++) remainingIndices.push(i);
    for (let i = 204; i <= 275; i++) remainingIndices.push(i);
    for (let i = 163; i <= 196; i++) remainingIndices.push(i);
    for (let i = 329; i <= 392; i++) remainingIndices.push(i);

    const runWorkerPool = async (
      tasks: (() => Promise<void>)[],
      concurrency = 16
    ) => {
      let taskIdx = 0;
      const workers = new Array(concurrency).fill(null).map(async () => {
        while (taskIdx < tasks.length) {
          if (isCancelled) break;
          const currentTask = tasks[taskIdx++];
          try {
            await currentTask();
          } catch {
            // continue
          }
        }
      });
      await Promise.all(workers);
    };

    const startPreload = async () => {
      let loadedCount = 0;
      const totalCritical = criticalIndices.length;

      // Initial column poster keyframes
      const col1Initial = loadImage("/column-1-frames/frame_0001.webp").then((img) => {
        if (isCancelled) return;
        col1Frames[0] = img;
        col1FramesRef.current = col1Frames;
        col1LastFrameRef.current = 0;
        renderFrameToColumnCanvas(col1CanvasRef.current, col1CtxRef, img);
      });
      const col2Initial = loadImage("/column-2-frames/frame_0001.webp").then((img) => {
        if (isCancelled) return;
        col2Frames[0] = img;
        col2FramesRef.current = col2Frames;
        col2LastFrameRef.current = 0;
        renderFrameToColumnCanvas(col2CanvasRef.current, col2CtxRef, img);
      });
      const col3Initial = loadImage("/column-3-frames/frame_0001.webp").then((img) => {
        if (isCancelled) return;
        col3Frames[0] = img;
        col3FramesRef.current = col3Frames;
        col3LastFrameRef.current = 0;
        renderFrameToColumnCanvas(col3CanvasRef.current, col3CtxRef, img);
      });

      // Critical starting sequence tasks (Scene 2 Architecture: 0..65)
      const criticalTasks = criticalIndices.map((idx) => async () => {
        const frameNum = String(idx + 1).padStart(4, "0");
        const img = await loadImage(`/video-frames/frame_${frameNum}.webp`);
        if (isCancelled) return;
        loadedFrames[idx] = img;
        loadedCount++;
        const percent = Math.min(100, Math.floor((loadedCount / totalCritical) * 100));
        setLoadingProgress(percent);
      });

      // Fast fallback safety timeout (2.5s maximum) guarantees scroll is never locked
      const timeoutPromise = new Promise<void>((resolve) => {
        setTimeout(resolve, 2500);
      });

      // Run parallel workers for critical starting frames
      await Promise.race([
        Promise.all([col1Initial, col2Initial, col3Initial, runWorkerPool(criticalTasks, 16)]),
        timeoutPromise,
      ]);

      if (isCancelled) return;

      framesRef.current = loadedFrames;
      setIsLoaded(true);
      setLoadingProgress(100);

      if (loadedFrames[0]) {
        renderToCanvas(loadedFrames[0]);
      }

      // Smooth preloader dissolve with guaranteed completion even in background tabs
      let preloaderFinished = false;
      const finishPreloader = () => {
        if (preloaderFinished || isCancelled) return;
        preloaderFinished = true;
        setIsPreloaderDone(true);
      };

      if (preloaderRef.current) {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: finishPreloader,
        });
        setTimeout(finishPreloader, 600);
      } else {
        finishPreloader();
      }

      if (ch2Ref.current) {
        gsap.fromTo(
          ch2Ref.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            delay: 0.1,
            ease: "power3.out",
            onComplete: () => {
              hasAnimatedEntrance.current = true;
            },
          }
        );
      }

      // Stream remaining sequence frames and column frames in the background
      loadRemainingFramesBackground(loadedFrames, remainingIndices);
      loadColumnFramesBackground(col1Frames, col2Frames, col3Frames);
    };

    // Remaining Sequence Frames: Background streaming via worker pool
    const loadRemainingFramesBackground = async (
      targetFrames: HTMLImageElement[],
      indices: number[]
    ) => {
      const remainingTasks = indices.map((idx) => async () => {
        if (isCancelled) return;
        const frameNum = String(idx + 1).padStart(4, "0");
        const img = await loadImage(`/video-frames/frame_${frameNum}.webp`);
        if (isCancelled) return;
        targetFrames[idx] = img;
      });
      await runWorkerPool(remainingTasks, 16);
    };

    // Column Frames: Fast parallel loading via 16 workers
    const loadColumnFramesBackground = async (
      c1: HTMLImageElement[],
      c2: HTMLImageElement[],
      c3: HTMLImageElement[]
    ) => {
      const colTasks: (() => Promise<void>)[] = [];

      for (let i = 1; i < COLUMN_FRAMES_COUNT; i++) {
        const idx = i;
        colTasks.push(async () => {
          if (isCancelled) return;
          const frameNum = String(idx + 1).padStart(4, "0");
          await Promise.all([
            loadImage(`/column-1-frames/frame_${frameNum}.webp`).then((img) => { if (!isCancelled) c1[idx] = img; }),
            loadImage(`/column-2-frames/frame_${frameNum}.webp`).then((img) => { if (!isCancelled) c2[idx] = img; }),
            loadImage(`/column-3-frames/frame_${frameNum}.webp`).then((img) => { if (!isCancelled) c3[idx] = img; }),
          ]);
        });
      }

      await runWorkerPool(colTasks, 16);

      if (!isCancelled) {
        col1FramesRef.current = c1;
        col2FramesRef.current = c2;
        col3FramesRef.current = c3;
      }
    };

    startPreload();

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

  // ---------------------------------------------------------------------------
  // DECOUPLED RAF RENDER TICKER
  // Coalesces canvas draws to at most 1 draw per display refresh (60Hz / 120Hz).
  // Eliminates paint thrashing and redundant draw calls during rapid scroll bursts.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const renderTick = () => {
      const frames = framesRef.current;
      if (!frames || frames.length === 0) return;

      const targetMain = targetMainFrameRef.current;
      const targetBlend = targetBlendFrameRef.current;
      const targetBlendAlpha = targetBlendAlphaRef.current;

      const mainChanged = targetMain !== lastFrameIndexRef.current;
      const blendChanged = targetBlend !== lastBlendFrameRef.current;
      const alphaChanged = Math.abs(targetBlendAlpha - lastBlendAlphaRef.current) > 0.003;

      // Skip main canvas draw if Section 6 is fully covering the viewport
      if (!isSection6FullyOpaqueRef.current && (mainChanged || blendChanged || alphaChanged)) {
        lastFrameIndexRef.current = targetMain;
        lastBlendFrameRef.current = targetBlend;
        lastBlendAlphaRef.current = targetBlendAlpha;

        const imgA = getSafeFrame(frames, targetMain);
        const imgB = targetBlend >= 0 ? getSafeFrame(frames, targetBlend) : null;
        if (imgA) {
          renderToCanvas(imgA, imgB, targetBlendAlpha);
        }
      }

      // Only draw column canvases when Section 6 is in the visible viewport
      if (isSection6ActiveRef.current) {
        const col1Idx = targetCol1FrameRef.current;
        if (col1Idx !== col1LastFrameRef.current) {
          col1LastFrameRef.current = col1Idx;
          const img1 = getSafeColFrame(col1FramesRef.current, col1Idx);
          if (img1) renderFrameToColumnCanvas(col1CanvasRef.current, col1CtxRef, img1);
        }

        const col2Idx = targetCol2FrameRef.current;
        if (col2Idx !== col2LastFrameRef.current) {
          col2LastFrameRef.current = col2Idx;
          const img2 = getSafeColFrame(col2FramesRef.current, col2Idx);
          if (img2) renderFrameToColumnCanvas(col2CanvasRef.current, col2CtxRef, img2);
        }

        const col3Idx = targetCol3FrameRef.current;
        if (col3Idx !== col3LastFrameRef.current) {
          col3LastFrameRef.current = col3Idx;
          const img3 = getSafeColFrame(col3FramesRef.current, col3Idx);
          if (img3) renderFrameToColumnCanvas(col3CanvasRef.current, col3CtxRef, img3);
        }
      }
    };

    gsap.ticker.add(renderTick);

    return () => {
      gsap.ticker.remove(renderTick);
    };
  }, [renderToCanvas, renderFrameToColumnCanvas]);

  // ---------------------------------------------------------------------------
  // GSAP SCROLL LOGIC SYNCHRONIZED WITH LENIS
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    let lastOp2 = -1;
    let lastOp3 = -1;
    let lastOp4 = -1;
    let lastOp5 = -1;
    let lastOp6 = -1;
    let lastOp7 = -1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "cinematic-pin",
        trigger: container,
        start: "top top",
        end: "+=1700%",
        pin: true,
        pinSpacing: true,
        scrub: true, // Synchronous lock with Lenis smooth scroll ticker (eliminates 600ms lag delay)
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          scrollProgressRef.current = progress;

          // 1. Calculate piecewise main frame index & optical crossfade targets
          if (progress <= 0.109) {
            // Scene 2: Architecture (frames 0..65)
            const norm = Math.max(0, Math.min(1, progress / 0.109));
            targetMainFrameRef.current = Math.floor(norm * 65);
            targetBlendFrameRef.current = -1;
            targetBlendAlphaRef.current = 0;
          } else if (progress < 0.236) {
            // Scene 3: Waterfront pre-transition (frames 66..145)
            const norm = Math.max(0, Math.min(1, (progress - 0.109) / (0.268 - 0.109)));
            targetMainFrameRef.current = 66 + Math.floor(norm * (155 - 66));
            targetBlendFrameRef.current = -1;
            targetBlendAlphaRef.current = 0;
          } else if (progress <= 0.268) {
            // Seamless Optical Crossfade between Waterfront (frames 145..155) and Masterplan (frames 204..217)
            // Both scenes remain in fluid camera motion during the cross-dissolve: NO static frozen frame!
            const normWF = Math.max(0, Math.min(1, (progress - 0.109) / (0.268 - 0.109)));
            const frameWF = 66 + Math.floor(normWF * (155 - 66));

            const normMP = Math.max(0, Math.min(1, (progress - 0.236) / (0.405 - 0.236)));
            const frameMP = 204 + Math.floor(normMP * (275 - 204));

            const t = (progress - 0.236) / (0.268 - 0.236);
            const smoothT = t * t * (3 - 2 * t); // Smooth Hermite S-curve ease

            targetMainFrameRef.current = Math.min(155, Math.max(66, frameWF));
            targetBlendFrameRef.current = Math.min(275, Math.max(204, frameMP));
            targetBlendAlphaRef.current = smoothT;
          } else if (progress <= 0.405) {
            // Scene 5: Masterplan (frames 204..275)
            // Continues smooth camera glide right through 0.405 as Section 6 (Investment) dissolves in
            const norm = Math.max(0, Math.min(1, (progress - 0.236) / (0.405 - 0.236)));
            targetMainFrameRef.current = 204 + Math.floor(norm * (275 - 204));
            targetBlendFrameRef.current = -1;
            targetBlendAlphaRef.current = 0;
          } else if (progress <= 0.705) {
            // Section 6 (Investment) active: holds frame 163 ready for Scene 4 (Destination)
            targetMainFrameRef.current = 163;
            targetBlendFrameRef.current = -1;
            targetBlendAlphaRef.current = 0;
          } else if (progress <= 0.845) {
            // Scene 4: Destination & Pillars (frames 163..196 - Infinity Pool)
            // In gentle motion as Investment section dissolves out
            const norm = Math.max(0, Math.min(1, (progress - 0.705) / (0.845 - 0.705)));
            targetMainFrameRef.current = 163 + Math.floor(norm * (196 - 163));
            targetBlendFrameRef.current = -1;
            targetBlendAlphaRef.current = 0;
          } else {
            // Scene 7: Closing (frames 329..392)
            const norm = Math.max(0, Math.min(1, (progress - 0.845) / (1.0 - 0.845)));
            targetMainFrameRef.current = 329 + Math.floor(norm * (392 - 329));
            targetBlendFrameRef.current = -1;
            targetBlendAlphaRef.current = 0;
          }

          targetMainFrameRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetMainFrameRef.current));

          // Section 6 active states for render loop gating
          isSection6ActiveRef.current = progress >= 0.37 && progress <= 0.74;
          isSection6FullyOpaqueRef.current = progress >= 0.405 && progress <= 0.705;

          // 2. DOM Opacities with Delta Throttling to prevent layout thrashing
          const op2 = progress <= 0.078 ? 1 : Math.max(0, 1 - (progress - 0.078) / (0.109 - 0.078));
          if (ch2Ref.current && Math.abs(op2 - lastOp2) > 0.005) {
            lastOp2 = op2;
            if (progress > 0) {
              gsap.killTweensOf(ch2Ref.current);
              hasAnimatedEntrance.current = true;
              gsap.set(ch2Ref.current, {
                opacity: op2,
                y: (1 - op2) * -18,
                pointerEvents: op2 > 0.5 ? "auto" : "none",
              });
            } else if (hasAnimatedEntrance.current) {
              gsap.set(ch2Ref.current, { opacity: 1, y: 0, pointerEvents: "auto" });
            }
          }

          const op3 = calcOpacity(progress, 0.109, 0.126, 0.236, 0.255);
          if (ch3Ref.current && Math.abs(op3 - lastOp3) > 0.005) {
            lastOp3 = op3;
            gsap.set(ch3Ref.current, {
              opacity: op3,
              y: (1 - op3) * 20,
              pointerEvents: op3 > 0.5 ? "auto" : "none",
            });
          }

          const op5 = calcOpacity(progress, 0.258, 0.275, 0.360, 0.380);
          if (ch5Ref.current && Math.abs(op5 - lastOp5) > 0.005) {
            lastOp5 = op5;
            gsap.set(ch5Ref.current, {
              opacity: op5,
              pointerEvents: op5 > 0.5 ? "auto" : "none",
            });
          }

          const op6 = calcOpacity(progress, 0.380, 0.405, 0.705, 0.730);
          if (ch6Ref.current && Math.abs(op6 - lastOp6) > 0.005) {
            lastOp6 = op6;
            gsap.set(ch6Ref.current, {
              opacity: op6,
              y: (1 - op6) * 20,
              pointerEvents: op6 > 0.5 ? "auto" : "none",
            });
          }

          // 3. Investment Column Scrubbing Math
          const investProg = Math.max(0, Math.min(1, (progress - 0.408) / (0.700 - 0.408)));
          const p1 = Math.max(0, Math.min(1, investProg / 0.33));
          const p2 = Math.max(0, Math.min(1, (investProg - 0.33) / 0.33));
          const p3 = Math.max(0, Math.min(1, (investProg - 0.66) / 0.34));

          targetCol1FrameRef.current = Math.min(COLUMN_FRAMES_COUNT - 1, Math.floor(p1 * (COLUMN_FRAMES_COUNT - 1)));
          targetCol2FrameRef.current = Math.min(COLUMN_FRAMES_COUNT - 1, Math.floor(p2 * (COLUMN_FRAMES_COUNT - 1)));
          targetCol3FrameRef.current = Math.min(COLUMN_FRAMES_COUNT - 1, Math.floor(p3 * (COLUMN_FRAMES_COUNT - 1)));

          // Update progress bars
          if (col1BarRef.current) col1BarRef.current.style.width = `${p1 * 100}%`;
          if (col2BarRef.current) col2BarRef.current.style.width = `${p2 * 100}%`;
          if (col3BarRef.current) col3BarRef.current.style.width = `${p3 * 100}%`;

          // Focus scrims and mobile responsive column visibility
          const isCol1Active = investProg >= 0 && investProg <= 0.33;
          const isCol2Active = investProg > 0.33 && investProg <= 0.66;
          const isCol3Active = investProg > 0.66 && investProg <= 1.0;
          const isAllCompleted = investProg >= 0.98;

          const currentMobileCol = isCol1Active ? 0 : isCol2Active ? 1 : 2;
          if (lastMobileColRef.current !== currentMobileCol) {
            lastMobileColRef.current = currentMobileCol;
            setActiveMobileCol(currentMobileCol);
          }

          const isMobile = window.innerWidth < 768;
          if (isMobile) {
            // Mobile full-width column crossfade
            const mobOp1 = investProg <= 0.33 ? 1 : Math.max(0, 1 - (investProg - 0.33) / 0.04);
            const mobOp2 = investProg > 0.33 && investProg <= 0.66 ? 1 : investProg <= 0.33 ? Math.max(0, (investProg - 0.29) / 0.04) : Math.max(0, 1 - (investProg - 0.66) / 0.04);
            const mobOp3 = investProg > 0.66 ? 1 : Math.max(0, (investProg - 0.62) / 0.04);

            if (col1ContainerRef.current) col1ContainerRef.current.style.opacity = `${mobOp1}`;
            if (col2ContainerRef.current) col2ContainerRef.current.style.opacity = `${mobOp2}`;
            if (col3ContainerRef.current) col3ContainerRef.current.style.opacity = `${mobOp3}`;
          } else {
            // Desktop: all 3 columns visible side-by-side with subtle focus scrims
            if (col1ContainerRef.current) col1ContainerRef.current.style.opacity = "1";
            if (col2ContainerRef.current) col2ContainerRef.current.style.opacity = "1";
            if (col3ContainerRef.current) col3ContainerRef.current.style.opacity = "1";

            if (col1ScrimRef.current) col1ScrimRef.current.style.opacity = isAllCompleted ? "0.05" : isCol1Active ? "0" : p1 >= 1 ? "0.2" : "0.55";
            if (col2ScrimRef.current) col2ScrimRef.current.style.opacity = isAllCompleted ? "0.05" : isCol2Active ? "0" : p2 >= 1 ? "0.2" : "0.55";
            if (col3ScrimRef.current) col3ScrimRef.current.style.opacity = isAllCompleted ? "0.05" : isCol3Active ? "0" : p3 >= 1 ? "0.2" : "0.55";
          }

          // Card content gentle lift
          if (col1CardRef.current) gsap.set(col1CardRef.current, { y: (1 - p1) * 16 });
          if (col2CardRef.current) gsap.set(col2CardRef.current, { y: (1 - p2) * 16 });
          if (col3CardRef.current) gsap.set(col3CardRef.current, { y: (1 - p3) * 16 });

          // 4. Destination & Brand Pillars (Handover starts right at 0.708 as columns dissolve, no dead delay)
          const op4 = calcOpacity(progress, 0.708, 0.730, 0.825, 0.848);
          if (ch4Ref.current && Math.abs(op4 - lastOp4) > 0.005) {
            lastOp4 = op4;
            gsap.set(ch4Ref.current, {
              opacity: op4,
              y: (1 - op4) * 20,
              pointerEvents: op4 > 0.5 ? "auto" : "none",
            });
          }

          // 5. Closing Horizon & CTA
          const op7 = calcOpacity(progress, 0.848, 0.875, 0.99, 1.0);
          if (ch7Ref.current && Math.abs(op7 - lastOp7) > 0.005) {
            lastOp7 = op7;
            gsap.set(ch7Ref.current, {
              opacity: op7,
              y: (1 - op7) * 15,
              pointerEvents: op7 > 0.5 ? "auto" : "none",
            });
          }
        },
      });
    }, container);

    // Chapter anchor smooth navigation mapping
    const CHAPTER_PROGRESS: Record<string, number> = {
      "#architecture": 0.0,
      "#waterfront": 0.16,
      "#masterplan": 0.30,
      "#investment": 0.44,
      "#destination": 0.77,
      "#closing": 0.94,
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !(href in CHAPTER_PROGRESS)) return;

      const st = ScrollTrigger.getById("cinematic-pin");
      if (!st) return;

      e.preventDefault();
      const prog = CHAPTER_PROGRESS[href];
      const targetY = st.start + prog * (st.end - st.start);

      const lenis = (window as unknown as { lenis?: { scrollTo: (target: number) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(targetY);
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);

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
      document.removeEventListener("click", handleAnchorClick);
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
        src="/video-frames/frame_0001.webp"
        alt="Orion One Lakefront"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Preloader: Understated Quiet Luxury Screen */}
      {!isPreloaderDone && (
        <LoadingScreen ref={preloaderRef} progress={loadingProgress} />
      )}

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        id="journey-canvas"
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        style={{ transform: "translateZ(0)" }}
      />

      {/* --------------------------------------------------------------------- */}
      {/* 01. A NEW HORIZON OF LUXURY (Starting Chapter)                        */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch2Ref}
        id="architecture"
        className="absolute inset-0 flex items-center justify-center sm:justify-end px-4 sm:px-12 lg:px-24 z-20 pointer-events-auto opacity-0"
      >
        {/* Directional Soft Vignette Scrim (Option 1): Gently darkens right side to make text pop against bright sky */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-l from-[#0d2828]/90 via-[#0d2828]/45 to-transparent pointer-events-none -z-10" />

        <div className="relative max-w-xl text-left sm:text-right space-y-3 sm:space-y-4">
          <div
            ref={scene1LogoAnchorRef}
            className="w-12 h-12 sm:w-14 sm:h-14 ml-auto mb-1 pointer-events-none flex items-center justify-center opacity-0"
            aria-hidden="true"
          />
          <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-tight uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            A New Horizon
            <span className="block font-serif italic text-[#62AA9E] font-normal mt-1 normal-case text-xl sm:text-4xl lg:text-5xl">
              of Luxury.
            </span>
          </h1>

          <p className="font-serif text-base sm:text-2xl font-light text-[#EDE5DA]/90 italic leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
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
        {/* Directional Soft Vignette Scrim: Gently darkens left side to make text pop against bright background */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0d2828]/90 via-[#0d2828]/45 to-transparent pointer-events-none -z-10" />

        <div className="relative max-w-xl text-left space-y-3 sm:space-y-4">
          <div
            ref={scene2LogoAnchorRef}
            className="w-12 h-12 sm:w-14 sm:h-14 mb-1 pointer-events-none flex items-center justify-center"
            aria-hidden="true"
          />
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] tracking-[0.35em] sm:tracking-[0.4em] font-semibold text-[#62AA9E] uppercase">
              Waterfront
            </span>
            <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
          </div>

          <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-tight uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Life,
            <span className="block font-serif italic text-[#62AA9E] font-normal mt-1 normal-case text-xl sm:text-4xl lg:text-5xl">
              By the Water.
            </span>
          </h2>

          <p className="text-xs sm:text-lg font-sans-body text-[#EDE5DA]/90 font-light leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            A lakefront address shaped around views, movement, nature and everyday living.
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 03. DISTRICT & MASTERPLAN (Frame 05 from 01 - Home Page.pdf)          */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch5Ref}
        id="masterplan"
        className="absolute inset-0 z-30 opacity-0 pointer-events-none"
      >
        {/* Section Header */}
        <div className="absolute top-18 sm:top-28 left-4 sm:left-12 lg:left-16 max-w-sm sm:max-w-lg z-30 pointer-events-auto">
          <div
            ref={scene3LogoAnchorRef}
            className="w-10 h-10 sm:w-12 sm:h-12 mb-1.5 pointer-events-none flex items-center justify-center"
            aria-hidden="true"
          />
          <div className="flex items-center gap-3 mb-1.5 sm:mb-2">
            <span className="text-[9.5px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] font-semibold text-[#62AA9E] uppercase">
              District Masterplan
            </span>
            <div className="w-8 h-[1px] bg-[#62AA9E]/60" />
          </div>

          <h2 className="font-serif text-xl sm:text-4xl lg:text-5xl font-light text-[#EDE5DA] leading-tight uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            The Lakefront
            <span className="block font-serif italic text-[#62AA9E] font-normal text-lg sm:text-3xl lg:text-4xl normal-case mt-0.5 sm:mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              at the Heart of DHA Phase III.
            </span>
          </h2>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 04. INVESTMENT (Frame 06 from 01 - Home Page.pdf)                     */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch6Ref}
        id="investment"
        className="absolute inset-0 w-full h-full z-20 opacity-0 pointer-events-none overflow-hidden bg-[#0d2828]"
      >
        {/* Floating Top Header across the 3 columns */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none px-4 sm:px-12 lg:px-16 pt-6 sm:pt-12 pb-12 bg-gradient-to-b from-[#0d2828]/95 via-[#0d2828]/60 to-transparent">
          <div className="w-full">
            <h2 className="font-serif text-xl sm:text-4xl lg:text-5xl font-light text-[#EDE5DA] leading-tight uppercase">
              Where Lifestyle{" "}
              <span className="font-serif italic text-[#62AA9E] font-normal normal-case">
                Meets Investment.
              </span>
            </h2>
          </div>
        </div>

        {/* Mobile Pillar Switcher Pills (Active Column Spotlight) */}
        <div className="md:hidden absolute top-20 left-0 right-0 z-30 px-4 flex items-center justify-center gap-1.5 pointer-events-none">
          {INVESTMENT_COLUMNS.map((col, idx) => (
            <div
              key={col.id}
              className={`px-2.5 py-1 rounded-full text-[9px] tracking-wider uppercase border transition-all duration-300 ${
                activeMobileCol === idx
                  ? "bg-[#62AA9E]/25 border-[#62AA9E] text-[#EDE5DA] font-semibold shadow-sm"
                  : "bg-[#0d2828]/70 border-[#EDE5DA]/15 text-[#EDE5DA]/50"
              }`}
            >
              {col.number} {col.title.split(" ")[0]}
            </div>
          ))}
        </div>

        {/* Columns Container: Responsive full-width active cards on mobile, 3 side-by-side columns on desktop */}
        <div className="w-full h-full relative md:grid md:grid-cols-3">
          {/* Column 01: Commercial Arcade */}
          <div
            ref={col1ContainerRef}
            className="absolute inset-0 md:relative md:inset-auto h-full overflow-hidden border-b md:border-b-0 md:border-r border-[#EDE5DA]/15 flex flex-col justify-end transition-opacity duration-300"
          >
            {/* Poster fallback for instant display */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/column-1-frames/frame_0001.webp"
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
              className="relative z-20 p-4 sm:p-8 lg:p-12 pb-6 sm:pb-12 lg:pb-16 space-y-2 sm:space-y-4"
            >
              {/* Column 1 Anchor: Top of heading */}
              <div
                ref={col1LogoAnchorRef}
                className="w-9 h-9 sm:w-11 sm:h-11 mb-1 pointer-events-none flex items-center justify-center"
                aria-hidden="true"
              />

              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-xs text-[#62AA9E] font-semibold uppercase tracking-wider block">
                  {INVESTMENT_COLUMNS[0].subtitle}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl text-[#EDE5DA] font-light leading-snug">
                  {INVESTMENT_COLUMNS[0].title}
                </h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-[#EDE5DA]/85 font-light leading-relaxed">
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
          <div
            ref={col2ContainerRef}
            className="absolute inset-0 md:relative md:inset-auto h-full overflow-hidden border-b md:border-b-0 md:border-r border-[#EDE5DA]/15 flex flex-col justify-end transition-opacity duration-300"
          >
            {/* Poster fallback for instant display */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/column-2-frames/frame_0001.webp"
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
              className="relative z-20 p-4 sm:p-8 lg:p-12 pb-6 sm:pb-12 lg:pb-16 space-y-2 sm:space-y-4"
            >
              {/* Column 2 Anchor: Top of heading */}
              <div
                ref={col2LogoAnchorRef}
                className="w-9 h-9 sm:w-11 sm:h-11 mb-1 pointer-events-none flex items-center justify-center"
                aria-hidden="true"
              />

              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-xs text-[#62AA9E] font-semibold uppercase tracking-wider block">
                  {INVESTMENT_COLUMNS[1].subtitle}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl text-[#EDE5DA] font-light leading-snug">
                  {INVESTMENT_COLUMNS[1].title}
                </h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-[#EDE5DA]/85 font-light leading-relaxed">
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
          <div
            ref={col3ContainerRef}
            className="absolute inset-0 md:relative md:inset-auto h-full overflow-hidden flex flex-col justify-end transition-opacity duration-300"
          >
            {/* Poster fallback for instant display */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/column-3-frames/frame_0001.webp"
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
              className="relative z-20 p-4 sm:p-8 lg:p-12 pb-6 sm:pb-12 lg:pb-16 space-y-2 sm:space-y-4"
            >
              {/* Column 3 Anchor: Top of heading */}
              <div
                ref={col3LogoAnchorRef}
                className="w-9 h-9 sm:w-11 sm:h-11 mb-1 pointer-events-none flex items-center justify-center"
                aria-hidden="true"
              />

              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-xs text-[#62AA9E] font-semibold uppercase tracking-wider block">
                  {INVESTMENT_COLUMNS[2].subtitle}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl text-[#EDE5DA] font-light leading-snug">
                  {INVESTMENT_COLUMNS[2].title}
                </h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-[#EDE5DA]/85 font-light leading-relaxed">
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
      {/* 05. DESTINATION & PILLARS (Frame 04 from 01 - Home Page.pdf)          */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch4Ref}
        id="destination"
        className="absolute inset-0 flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 z-20 opacity-0 overflow-hidden"
      >
        <div className="text-center space-y-2 sm:space-y-3 mb-4 sm:mb-8">
          {/* Scene 5 Anchor: Top of Destination label */}
          <div
            ref={scene5LogoAnchorRef}
            className="w-11 h-11 sm:w-14 sm:h-14 mx-auto mb-1 pointer-events-none flex items-center justify-center"
            aria-hidden="true"
          />

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

        {/* 4 Brand Pillars — editorial border-top style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-10 gap-y-6 sm:gap-y-8 mt-2 sm:mt-0">
          {BRAND_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.name}
              className="group border-t border-[#EDE5DA]/20 pt-5 sm:pt-7 flex flex-col justify-start transition-colors duration-300"
            >
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#EDE5DA]/30 font-light mb-3 sm:mb-4 block">
                0{idx + 1}
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-light text-[#EDE5DA] tracking-tight mb-1.5 sm:mb-2 group-hover:text-[#62AA9E] transition-colors duration-300">
                {pillar.name}
              </h3>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#62AA9E] font-semibold mb-2 sm:mb-3 block">
                {pillar.subtitle}
              </span>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 06. CLOSING HORIZON & CTA (Frame 07 from 01 - Home Page.pdf)         */}
      {/* --------------------------------------------------------------------- */}
      <div
        ref={ch7Ref}
        id="closing"
        className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 sm:px-6 z-20 opacity-0"
      >
        {/* 3D Orion Logo Docking Anchor */}
        <div
          ref={closingLogoTargetRef}
          className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 pointer-events-none flex items-center justify-center relative"
          aria-hidden="true"
        />

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

      {/* 3D Orion Sub Mark Cinematic Companion & Scroll Anchor */}
      <OrionLogoScrollWheel
        progressRef={scrollProgressRef}
        targetRef={closingLogoTargetRef}
        targetRefs={targetRefs}
        isLoaded={isLoaded}
      />
    </section>
  );
}

// React.memo optimization to prevent unnecessary re-renders during high-frequency scroll scrubbing
export default memo(CinematicCanvasComponent);
