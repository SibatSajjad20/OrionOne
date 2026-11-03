"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { scrollToElement } from "@/lib/scrollTo";
import {
  TOWER_LEVELS,
  TowerLevelData,
  getTowerLevel,
} from "@/app/residence/data";
import FloorApartmentModal from "./FloorApartmentModal";

const NATURAL_W = 2560;
const NATURAL_H = 1280;
const FOCAL_X = 0.70;
const FOCAL_Y = 1.0;

interface OrionTowerExplorerProps {
  onOpenInquiry: () => void;
}

export default function OrionTowerExplorer({
  onOpenInquiry,
}: OrionTowerExplorerProps) {
  const [hoveredLevel, setHoveredLevel] = useState<TowerLevelData | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<TowerLevelData | null>(
    null
  );
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const [imgRect, setImgRect] = useState<{
    width: number;
    height: number;
    left: number;
    top: number;
  }>({
    width: 2560,
    height: 1280,
    left: 0,
    top: 80,
  });

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  const updateRect = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    if (!stageW || !stageH) return;

    const headerEl = document.querySelector("header");
    const headerH = headerEl?.clientHeight || 80;

    const containerW = stageW;
    const containerH = Math.max(stageH - headerH, 1);

    // Exact CSS object-fit: cover with object-position: 70% 100%
    const scale = Math.max(containerW / NATURAL_W, containerH / NATURAL_H);
    const width = NATURAL_W * scale;
    const height = NATURAL_H * scale;

    const left = (containerW - width) * FOCAL_X;
    const top = headerH + (containerH - height) * FOCAL_Y;

    setImgRect({ width, height, left, top });
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    updateRect();

    const ro = new ResizeObserver(() => {
      updateRect();
    });
    ro.observe(stage);

    window.addEventListener("resize", updateRect);
    window.addEventListener("orientationchange", updateRect);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("orientationchange", updateRect);
    };
  }, [updateRect]);

  const handleFloorClick = (lvl: TowerLevelData) => {
    if (isTouchDevice && hoveredLevel?.level !== lvl.level) {
      setHoveredLevel(lvl);
      return;
    }
    setSelectedLevel(lvl);
  };

  const handleSelectLevelByNum = (levelNum: number) => {
    const found = getTowerLevel(levelNum);
    if (found) {
      setSelectedLevel(found);
    }
  };

  const scrollToCollection = () => {
    const el = document.getElementById("residence-collection");
    if (el) {
      scrollToElement(el);
    }
  };

  const beamTopPx = hoveredLevel
    ? imgRect.top + (hoveredLevel.yTop / 100) * imgRect.height
    : 0;
  const beamHeightPx = hoveredLevel
    ? ((hoveredLevel.yBottom - hoveredLevel.yTop) / 100) * imgRect.height
    : 0;

  return (
    <>
      <section
        ref={stageRef}
        aria-label="Orion One Interactive Building Explorer"
        onMouseLeave={() => {
          if (!isTouchDevice) setHoveredLevel(null);
        }}
        className="relative w-full h-[100dvh] min-h-[680px] bg-[#153D3D] overflow-hidden select-none"
      >
        {/* ========================================================================= */}
        {/* IMAGE LAYER (starts below header: top: var(--header-h); left: 0; right: 0;*/}
        {/* height: calc(100dvh - var(--header-h)); object-fit: cover; 70% 100%)       */}
        {/* Full tower visible at 1440x900, 1280x720, and 1920x1080                   */}
        {/* ========================================================================= */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "var(--header-h, 5rem)",
            height: "calc(100dvh - var(--header-h, 5rem))",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/residence/residence-hero-dusk.webp"
            alt="Orion One Residences at Dusk"
            onLoad={updateRect}
            className="w-full h-full object-cover select-none"
            style={{ objectPosition: "70% 100%" }}
          />
        </div>

        {/* ========================================================================= */}
        {/* OVERLAY: LEFT GRADIENT                                                    */}
        {/* linear-gradient(90deg, rgba(21,61,61,0.88) 0%, rgba(21,61,61,0.5) 30%, rgba(21,61,61,0) 55%) */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(21, 61, 61, 0.88) 0%, rgba(21, 61, 61, 0.5) 30%, rgba(21, 61, 61, 0) 55%)",
          }}
        />

        {/* Atmospheric Dark Wash when hovering a level */}
        <div
          className={`absolute inset-0 bg-[#081a1a]/40 transition-opacity duration-500 ease-out pointer-events-none z-10 ${
            hoveredLevel ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ========================================================================= */}
        {/* CLIPPED ILLUMINATED FLOOR SLICE ON THE BUILDING                            */}
        {/* ========================================================================= */}
        <div
          style={{
            width: `${imgRect.width}px`,
            height: `${imgRect.height}px`,
            left: `${imgRect.left}px`,
            top: `${imgRect.top}px`,
          }}
          className="absolute pointer-events-none z-10"
        >
          <div
            style={{
              clipPath: hoveredLevel
                ? `inset(${hoveredLevel.yTop}% ${
                    100 - hoveredLevel.xRight
                  }% ${100 - hoveredLevel.yBottom}% ${
                    hoveredLevel.xLeft
                  }% round 4px)`
                : "inset(50% 50% 50% 50%)",
            }}
            className={`absolute inset-0 transition-[clip-path,opacity] duration-200 ease-out ${
              hoveredLevel ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/residence/residence-hero-dusk.webp"
              alt=""
              className="w-full h-full object-cover filter brightness-[1.18] contrast-[1.06]"
              style={{ objectPosition: "70% 100%" }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FULL-VIEWPORT HORIZONTAL FLOOR LIGHT BEAM                                 */}
        {/* ========================================================================= */}
        <div
          style={{
            top: `${beamTopPx}px`,
            height: `${Math.max(beamHeightPx, 28)}px`,
          }}
          className={`pointer-events-none absolute left-0 right-0 z-10 transition-all duration-200 ease-out ${
            hoveredLevel ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full bg-gradient-to-r from-white/[0.04] via-[#d8ebe7]/[0.26] to-white/[0.08] backdrop-blur-[2px] shadow-[0_0_45px_rgba(237,229,218,0.24)] border-y border-white/25" />
        </div>

        {/* ========================================================================= */}
        {/* OVERLAY (c): BOTTOM GRADIENT TO MOSS FOR THE PILL                         */}
        {/* ========================================================================= */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to top, #153D3D 0%, rgba(21, 61, 61, 0.88) 35%, rgba(21, 61, 61, 0) 100%)",
          }}
        />

        {/* ========================================================================= */}
        {/* LAYER 3: 15 BUILDING FLOOR HITBOXES (GF, 01, 02 .. 14)                    */}
        {/* ========================================================================= */}
        <div
          style={{
            width: `${imgRect.width}px`,
            height: `${imgRect.height}px`,
            left: `${imgRect.left}px`,
            top: `${imgRect.top}px`,
          }}
          className="absolute z-20 pointer-events-none"
        >
          {TOWER_LEVELS.map((lvl) => {
            const isHovered = hoveredLevel?.level === lvl.level;
            const heightPct = lvl.yBottom - lvl.yTop;
            const widthPct = lvl.xRight - lvl.xLeft;

            return (
              <div
                key={lvl.level}
                style={{
                  top: `${lvl.yTop}%`,
                  height: `${heightPct}%`,
                  left: `${lvl.xLeft}%`,
                  width: `${widthPct}%`,
                }}
                onMouseEnter={() => setHoveredLevel(lvl)}
                onClick={() => handleFloorClick(lvl)}
                role="button"
                tabIndex={0}
                aria-label={`${lvl.name} — ${lvl.subtitle}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedLevel(lvl);
                  }
                }}
                className="pointer-events-auto absolute cursor-pointer focus:outline-none"
              >
                {/* Slab Highlight Hairline */}
                <div
                  className={`w-full h-full rounded-[3px] transition-all duration-200 ${
                    isHovered
                      ? "border-y border-white/90 bg-white/[0.06] shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                      : "border-y border-transparent"
                  }`}
                />

                {/* Left-of-Slab Code & Connector Line */}
                <div
                  className={`hidden sm:flex items-center absolute top-1/2 -translate-y-1/2 -left-10 right-0 pointer-events-none transition-all duration-200 ${
                    isHovered
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-2"
                  }`}
                >
                  <span className="font-sans-body text-[11px] font-medium tracking-[0.2em] text-white mr-2.5">
                    {lvl.code}
                  </span>
                  <div className="w-1/2 h-[1px] bg-gradient-to-r from-white/90 to-white/20" />
                </div>

                {/* Center Floating Pill */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-200 ${
                    isHovered
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLevel(lvl);
                    }}
                    className="whitespace-nowrap rounded-full bg-[#EDE5DA] hover:bg-white text-[#081a1a] px-5 py-2 text-[9.5px] sm:text-[10px] font-sans-body font-bold uppercase tracking-[0.22em] shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition-transform duration-200 hover:scale-105 cursor-pointer"
                  >
                    Open {lvl.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* LAYER 4: LEFT EDITORIAL 'EXPLORE RESIDENCES' READOUT                      */}
        {/* ========================================================================= */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-30 flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-xl transition-opacity duration-500 ${
            hoveredLevel ? "opacity-100" : "opacity-90"
          }`}
        >
          <h1 className="type-display font-serif-heading font-luxia-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] text-white tracking-tight leading-[0.94] drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            Explore
            <br />
            Residences
          </h1>

          <div className="w-16 sm:w-20 h-[1px] bg-white/50 my-5 sm:my-6" />

          <p className="font-sans-body text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white/85 font-light leading-relaxed max-w-xs drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Select a level to discover the residences.
          </p>

          <div className="mt-7 sm:mt-9 min-h-[96px]">
            {hoveredLevel && (
              <div
                key={hoveredLevel.level}
                className="animate-in fade-in duration-200"
              >
                <div className="type-section font-serif-heading font-luxia-display text-2xl sm:text-4xl text-white tracking-wide mb-2">
                  {hoveredLevel.name}
                </div>
                <p className="font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-white/90 font-medium leading-relaxed">
                  {hoveredLevel.subtitle}
                </p>
                <p className="font-sans-body text-[9.5px] sm:text-[10px] uppercase tracking-[0.24em] text-white/65 mt-1.5 font-light">
                  {hoveredLevel.detailMeta}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 5: RIGHT-SIDE 15-FLOOR VERTICAL SCALE (14 .. 03, 02, 01, GF)        */}
        {/* ========================================================================= */}
        <div className="pointer-events-auto absolute top-24 sm:top-28 bottom-16 sm:bottom-20 right-2 sm:right-6 lg:right-8 z-30 flex items-center">
          <div className="h-full flex flex-col justify-between py-1.5 sm:py-2.5 px-1.5 sm:px-2 rounded-2xl bg-[#061414]/75 backdrop-blur-md border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            {/* Top architectural floor count tag */}
            <div className="px-1 pb-1 mb-0.5 border-b border-white/10 flex items-center justify-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#62AA9E]" />
              <span className="font-sans-body text-[8px] sm:text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#62AA9E]">
                15 Lvl
              </span>
            </div>

            {/* 15 Floor Buttons */}
            <div className="flex-1 flex flex-col justify-between gap-0.5">
              {TOWER_LEVELS.map((lvl) => {
                const isActive = hoveredLevel?.level === lvl.level;
                return (
                  <button
                    key={lvl.level}
                    type="button"
                    onMouseEnter={() => setHoveredLevel(lvl)}
                    onClick={() => setSelectedLevel(lvl)}
                    aria-label={`Select ${lvl.name}`}
                    className="group relative flex items-center justify-end gap-2 py-0.5 px-1 cursor-pointer focus:outline-none"
                  >
                    {/* Desktop Tooltip preview to the left */}
                    <span
                      className={`hidden lg:block absolute right-full mr-2.5 px-2 py-0.5 rounded bg-[#0d2828]/95 border border-[#62AA9E]/30 text-[9px] uppercase tracking-[0.16em] whitespace-nowrap pointer-events-none transition-all duration-200 shadow-lg ${
                        isActive
                          ? "opacity-100 translate-x-0 text-[#EDE5DA]"
                          : "opacity-0 translate-x-1 text-white/50"
                      }`}
                    >
                      {lvl.name} · {lvl.category === "amenities" ? "Club" : lvl.category === "commercial" ? "Retail" : "Residence"}
                    </span>

                    {/* Hairline indicator */}
                    <span
                      className={`h-[1.5px] rounded-full transition-all duration-200 ${
                        isActive
                          ? "w-3 sm:w-4 bg-[#62AA9E] opacity-100 shadow-[0_0_8px_#62AA9E]"
                          : "w-0 opacity-0 group-hover:w-2 group-hover:opacity-60 bg-white/40"
                      }`}
                    />

                    {/* Floor Code */}
                    <span
                      className={`font-sans-body text-[9.5px] sm:text-[11px] font-medium tracking-[0.18em] transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                        isActive
                          ? "text-[#62AA9E] font-bold scale-110"
                          : "text-white/65 group-hover:text-white"
                      }`}
                    >
                      {lvl.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 6: FLOATING INTERACTIVE SECTION NAVIGATOR                           */}
        {/* ========================================================================= */}
        <div className="pointer-events-auto absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <button
            type="button"
            onClick={scrollToCollection}
            className="group inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 rounded-full bg-[#0d2828]/90 hover:bg-[#153D3D] text-[#EDE5DA] border border-white/20 hover:border-[#62AA9E] shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#62AA9E] animate-pulse" />
            <span className="font-sans-body text-[9.5px] sm:text-[10.5px] uppercase font-bold tracking-[0.24em] text-white">
              Explore Residence Typologies & Plans
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#62AA9E] group-hover:translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {selectedLevel && (
        <FloorApartmentModal
          levelData={selectedLevel}
          onClose={() => setSelectedLevel(null)}
          onSelectLevel={handleSelectLevelByNum}
          onOpenInquiry={onOpenInquiry}
        />
      )}
    </>
  );
}
