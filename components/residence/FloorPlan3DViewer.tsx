"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Box, Eye, Layers, Maximize2 } from "lucide-react";
import type {
  FloorPlanData,
  FloorPlanRoom,
} from "@/app/residence/plans/types";
import type {
  FloorPlanViewMode,
  JoystickVector,
} from "./FloorPlan3DCanvas";

const DynamicFloorPlan3DCanvas = dynamic(
  () => import("./FloorPlan3DCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#EDE5DA] font-sans-body text-[11px] uppercase tracking-[0.2em] text-[#153D3D] font-semibold">
        Loading 3D Floor Plan…
      </div>
    ),
  }
);

function detectWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export interface FloorPlan3DViewerProps {
  plan: FloorPlanData;
  fallbackImageSrc: string;
  fallbackAlt: string;
  compact?: boolean;
  onExpand?: () => void;
}

export default function FloorPlan3DViewer({
  plan,
  fallbackImageSrc,
  fallbackAlt,
  compact = false,
  onExpand,
}: FloorPlan3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState<boolean>(true);
  const [show2DFallback, setShow2DFallback] = useState(false);
  const [viewMode, setViewMode] = useState<FloorPlanViewMode>("iso");
  const [hoveredRoom, setHoveredRoom] = useState<FloorPlanRoom | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<FloorPlanRoom | null>(
    plan.rooms.find((r) => r.id === "salon-cocina") || plan.rooms[0] || null
  );

  // Mobile/touch drag joystick state for Walkthrough view
  const joystickRef = useRef<JoystickVector>({ x: 0, y: 0 });
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [joystickKnob, setJoystickKnob] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const isDraggingJoystickRef = useRef(false);

  // Check WebGL availability on mount
  useEffect(() => {
    const supported = detectWebGLAvailable();
    setWebglAvailable(supported);
    if (!supported) {
      setShow2DFallback(true);
    }
  }, []);

  // Only mount 3D Canvas when scrolled into view via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ensure Lenis resumes if component unmounts while pointer is inside
  useEffect(() => {
    return () => {
      if (
        typeof window !== "undefined" &&
        !document.documentElement.classList.contains("modal-lock")
      ) {
        window.dispatchEvent(new CustomEvent("lenis:start"));
      }
    };
  }, []);

  const pauseLenis = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("lenis:stop"));
    }
  };

  const resumeLenis = () => {
    if (
      typeof window !== "undefined" &&
      !document.documentElement.classList.contains("modal-lock")
    ) {
      window.dispatchEvent(new CustomEvent("lenis:start"));
    }
  };

  // Drag Joystick handlers for Walkthrough mode
  const updateJoystickFromPoint = (clientX: number, clientY: number) => {
    const base = joystickBaseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.5;
    const maxRadius = rect.width * 0.38;

    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > maxRadius && dist > 0) {
      dx = (dx / dist) * maxRadius;
      dy = (dy / dist) * maxRadius;
    }

    setJoystickKnob({ x: dx, y: dy });
    joystickRef.current = {
      x: dx / maxRadius,
      y: -dy / maxRadius, // Up is +forward
    };
  };

  const resetJoystick = () => {
    isDraggingJoystickRef.current = false;
    setJoystickKnob({ x: 0, y: 0 });
    joystickRef.current = { x: 0, y: 0 };
  };

  const activeRoom = hoveredRoom || selectedRoom;
  const shouldShowFallback = !webglAvailable || show2DFallback;

  return (
    <div
      ref={containerRef}
      data-lenis-prevent="true"
      onPointerEnter={pauseLenis}
      onPointerLeave={resumeLenis}
      onClick={(e) => {
        // Prevent parent card <Link> navigation when interacting with the 3D viewer
        e.stopPropagation();
      }}
      className="absolute inset-0 w-full h-full select-none overflow-hidden rounded-xl bg-[#EDE5DA]"
    >
      {/* 2D Fallback Image (when 2D Plan is toggled, WebGL unavailable, or before scroll into view) */}
      {(shouldShowFallback || !isInView) && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 sm:p-4 z-10 bg-[#EDE5DA]">
          <Image
            src={fallbackImageSrc}
            alt={fallbackAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain p-2 filter contrast-[1.05]"
          />
        </div>
      )}

      {/* Lazy-Mounted 3D Floor Plan Canvas */}
      {isInView && webglAvailable && !show2DFallback && (
        <div className="absolute inset-0 w-full h-full z-10">
          <DynamicFloorPlan3DCanvas
            plan={plan}
            viewMode={viewMode}
            hoveredRoom={hoveredRoom}
            selectedRoom={selectedRoom}
            onHoverRoom={setHoveredRoom}
            onSelectRoom={setSelectedRoom}
            joystickRef={joystickRef}
          />
        </div>
      )}

      {/* Top Architectural Controls Bar (Views: Top-Down, Isometric, Walkthrough + 2D Toggle) */}
      {webglAvailable && (
        <div className="absolute top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-1 rounded-full bg-[#153D3D] p-1 border border-[#EDE5DA]/25 shadow-lg pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                setShow2DFallback(false);
                setViewMode("top");
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans-body text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer ${
                !show2DFallback && viewMode === "top"
                  ? "bg-[#62AA9E] text-[#153D3D]"
                  : "text-[#EDE5DA]/90 hover:text-[#EDE5DA]"
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Top-Down</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShow2DFallback(false);
                setViewMode("iso");
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans-body text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer ${
                !show2DFallback && viewMode === "iso"
                  ? "bg-[#62AA9E] text-[#153D3D]"
                  : "text-[#EDE5DA]/90 hover:text-[#EDE5DA]"
              }`}
            >
              <Box className="w-3 h-3" />
              <span>{compact ? "3D" : "Isometric 3D"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShow2DFallback(false);
                setViewMode("walkthrough");
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans-body text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer ${
                !show2DFallback && viewMode === "walkthrough"
                  ? "bg-[#62AA9E] text-[#153D3D]"
                  : "text-[#EDE5DA]/90 hover:text-[#EDE5DA]"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{compact ? "Walk" : "Walkthrough"}</span>
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 pointer-events-auto">
            <button
              type="button"
              onClick={() => setShow2DFallback((prev) => !prev)}
              className={`rounded-full px-3 py-1.5 font-sans-body text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] font-semibold border transition-colors cursor-pointer shadow-lg ${
                show2DFallback
                  ? "bg-[#62AA9E] text-[#153D3D] border-[#62AA9E]"
                  : "bg-[#153D3D] text-[#EDE5DA] border-[#EDE5DA]/25 hover:border-[#62AA9E]"
              }`}
            >
              {show2DFallback ? "3D View" : "2D Plan"}
            </button>

            {onExpand && (
              <button
                type="button"
                onClick={onExpand}
                aria-label="Enlarge floor plan"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#153D3D] text-[#EDE5DA] hover:text-[#62AA9E] border border-[#EDE5DA]/25 px-3 py-1.5 font-sans-body text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer shadow-lg"
              >
                <Maximize2 className="w-3 h-3 text-[#62AA9E]" />
                {!compact && <span>Enlarge</span>}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Walkthrough Drag Joystick (Mobile & Pointer) */}
      {webglAvailable && !show2DFallback && viewMode === "walkthrough" && (
        <div className="absolute bottom-12 left-3 z-30 flex items-center gap-3 pointer-events-auto">
          <div
            ref={joystickBaseRef}
            onPointerDown={(e) => {
              e.stopPropagation();
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              isDraggingJoystickRef.current = true;
              updateJoystickFromPoint(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (!isDraggingJoystickRef.current) return;
              e.stopPropagation();
              updateJoystickFromPoint(e.clientX, e.clientY);
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              resetJoystick();
            }}
            onPointerCancel={resetJoystick}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#153D3D]/90 border border-[#EDE5DA]/30 flex items-center justify-center touch-none cursor-grab active:cursor-grabbing shadow-lg"
            aria-label="Walkthrough movement joystick"
          >
            <div className="w-8 h-8 rounded-full border border-[#EDE5DA]/20 pointer-events-none" />
            <div
              style={{
                transform: `translate(${joystickKnob.x}px, ${joystickKnob.y}px)`,
              }}
              className="absolute w-6 h-6 rounded-full bg-[#62AA9E] border border-[#EDE5DA] pointer-events-none shadow-sm"
            />
          </div>

          {!compact && (
            <div className="hidden sm:block rounded-lg bg-[#153D3D]/95 border border-[#EDE5DA]/20 px-3 py-1.5 font-sans-body text-[9.5px] uppercase tracking-[0.16em] text-[#EDE5DA] pointer-events-none shadow-lg">
              <div>WASD / Arrows · Move</div>
              <div className="text-[#62AA9E]">Drag Canvas · Look (1.6m)</div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Room Readout Pill (Name & Area in Montserrat, Moss #153D3D) */}
      {webglAvailable && !show2DFallback && activeRoom && (
        <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#153D3D] border border-[#EDE5DA]/25 px-3.5 py-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#62AA9E]" />
            <span className="font-sans-body text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EDE5DA]">
              {activeRoom.name}
            </span>
            <span className="font-sans-body text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#62AA9E]">
              {activeRoom.areaLabel}
            </span>
          </div>

          {!compact && viewMode !== "walkthrough" && (
            <span className="hidden sm:inline-block rounded-full bg-[#153D3D]/90 border border-[#EDE5DA]/20 px-3 py-1.5 font-sans-body text-[9.5px] font-semibold uppercase tracking-[0.15em] text-[#EDE5DA] shadow-md">
              Click or hover room · Drag to orbit
            </span>
          )}
        </div>
      )}
    </div>
  );
}
