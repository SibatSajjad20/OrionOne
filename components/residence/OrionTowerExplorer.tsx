"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  TOWER_LEVELS,
  TowerLevelData,
  getTowerLevel,
} from "@/app/residence/data";
import FloorApartmentModal from "./FloorApartmentModal";

const IMG_NATURAL_W = 3840;
const IMG_NATURAL_H = 2160;
const FOCAL_X = 0.68;
const FOCAL_Y = 0.5;

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
    width: 1920,
    height: 1080,
    left: 0,
    top: 0,
  });

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateRect = () => {
      const stageW = stage.clientWidth;
      const stageH = stage.clientHeight;
      if (!stageW || !stageH) return;

      const scale = Math.max(
        stageW / IMG_NATURAL_W,
        stageH / IMG_NATURAL_H
      );
      const width = IMG_NATURAL_W * scale;
      const height = IMG_NATURAL_H * scale;
      const left = (stageW - width) * FOCAL_X;
      const top = (stageH - height) * FOCAL_Y;

      setImgRect({ width, height, left, top });
    };

    updateRect();
    const ro = new ResizeObserver(updateRect);
    ro.observe(stage);
    window.addEventListener("resize", updateRect);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateRect);
    };
  }, []);

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
        className="relative w-full h-screen min-h-[680px] bg-[#081a1a] overflow-hidden select-none"
      >
        {/* ========================================================================= */}
        {/* LAYER 1: SYNCHRONIZED 3840x2160 BUILDING IMAGE COORDINATE SPACE           */}
        {/* ========================================================================= */}
        <div
          style={{
            width: `${imgRect.width}px`,
            height: `${imgRect.height}px`,
            left: `${imgRect.left}px`,
            top: `${imgRect.top}px`,
          }}
          className="absolute pointer-events-none"
        >
          <Image
            src="/images/residence/5-final.jpg"
            alt="Orion One by SP Builders"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Atmospheric Dark Wash when hovering a level */}
          <div
            className={`absolute inset-0 bg-[#081a1a]/55 transition-opacity duration-500 ease-out ${
              hoveredLevel ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-r from-[#061414]/70 via-transparent to-[#061414]/60 transition-opacity duration-500 ${
              hoveredLevel ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Clipped Illuminated Floor Slice on the Building */}
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
            <Image
              src="/images/residence/5-final.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover filter brightness-[1.18] contrast-[1.06]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: FULL-VIEWPORT HORIZONTAL FLOOR LIGHT BEAM                        */}
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
        {/* LAYER 3: 14 BUILDING FLOOR HITBOXES (GF, 01, 02, 03..13)                  */}
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
        {/* LAYER 5: RIGHT-SIDE 14-FLOOR VERTICAL SCALE (13 .. 03, 02, 01, GF)        */}
        {/* ========================================================================= */}
        <div className="pointer-events-auto absolute top-24 bottom-10 right-3 sm:right-7 lg:right-10 z-30 flex items-center">
          <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-white/25 to-transparent mr-3 sm:mr-5 hidden sm:block" />

          <div className="h-full flex flex-col justify-between py-2">
            {TOWER_LEVELS.map((lvl) => {
              const isActive = hoveredLevel?.level === lvl.level;
              return (
                <button
                  key={lvl.level}
                  type="button"
                  onMouseEnter={() => setHoveredLevel(lvl)}
                  onClick={() => setSelectedLevel(lvl)}
                  aria-label={`Select ${lvl.name}`}
                  className="group relative flex items-center justify-end gap-2.5 py-0.5 px-1.5 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`h-[1px] bg-white transition-all duration-200 ${
                      isActive
                        ? "w-4 sm:w-5 opacity-100"
                        : "w-0 opacity-0 group-hover:w-2.5 group-hover:opacity-60"
                    }`}
                  />

                  <span
                    className={`font-sans-body text-[10px] sm:text-[11px] tracking-[0.18em] transition-all duration-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] ${
                      isActive
                        ? "text-white font-semibold scale-110"
                        : "text-white/60 group-hover:text-white"
                    }`}
                  >
                    {lvl.code}
                  </span>
                </button>
              );
            })}
          </div>
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
