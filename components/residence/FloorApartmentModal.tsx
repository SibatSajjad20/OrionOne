"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  X,
} from "lucide-react";
import {
  TowerLevelData,
  TOWER_LEVELS,
  getSuiteBySlug,
} from "@/app/residence/data";
import FloorPlan3DViewer from "./FloorPlan3DViewer";
import oneBedroomPlanJson from "@/app/residence/plans/1-bedroom.json";
import type { FloorPlanData } from "@/app/residence/plans/types";

const ONE_BEDROOM_PLAN = oneBedroomPlanJson as unknown as FloorPlanData;

interface FloorApartmentModalProps {
  levelData: TowerLevelData;
  onClose: () => void;
  onSelectLevel: (levelNum: number) => void;
  onOpenInquiry: () => void;
}

export default function FloorApartmentModal({
  levelData,
  onClose,
  onSelectLevel,
  onOpenInquiry,
}: FloorApartmentModalProps) {
  const [selectedSuiteSlug, setSelectedSuiteSlug] = useState<
    "1-bedroom" | "2-bedroom" | "3-bedroom" | "private-pool"
  >(levelData.availableSuites[0] || "2-bedroom");
  const [activeTab, setActiveTab] = useState<"info" | "inclusions" | "spaces">(
    "info"
  );
  const [isPlanLightboxOpen, setIsPlanLightboxOpen] = useState(false);

  const modalScrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (levelData.availableSuites.length > 0) {
      setSelectedSuiteSlug(levelData.availableSuites[0]);
    }
    setActiveTab("info");
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTo({
        top: 0,
        behavior: "instant" as ScrollBehavior,
      });
    }
  }, [levelData]);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [levelData.level, selectedSuiteSlug]);

  useEffect(() => {
    const lenis = (
      window as unknown as { lenis?: { stop: () => void; start: () => void } }
    ).lenis;
    document.documentElement.classList.add("modal-lock");
    document.body.classList.add("modal-lock");
    if (lenis) lenis.stop();
    window.dispatchEvent(new CustomEvent("lenis:stop"));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isPlanLightboxOpen) {
          setIsPlanLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.classList.remove("modal-lock");
      document.body.classList.remove("modal-lock");
      if (lenis) lenis.start();
      window.dispatchEvent(new CustomEvent("lenis:start"));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlanLightboxOpen, onClose]);

  const isResidential = levelData.category === "residential";
  const suite =
    getSuiteBySlug(selectedSuiteSlug) || getSuiteBySlug("2-bedroom")!;

  const prevLevel = levelData.level > 0 ? levelData.level - 1 : 13;
  const nextLevel = levelData.level < 13 ? levelData.level + 1 : 0;

  const planSrc = isResidential
    ? suite.floorPlanSrc
    : levelData.customPlanSrc || "/images/commercial/floor-plan-ground.png";

  const galleryImages = isResidential
    ? suite.gallery
    : levelData.customGallery || [];

  return (
    <div
      ref={modalScrollRef}
      data-lenis-prevent="true"
      className="fixed inset-0 z-[70] bg-[#153D3D] text-[#EDE5DA] overflow-y-auto overscroll-contain selection:bg-[#62AA9E] selection:text-[#153D3D]"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(28,78,78,0.4)_0%,rgba(21,61,61,0.2)_50%,transparent_80%)]" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-10 lg:px-16 pt-8 sm:pt-12 pb-24"
      >
        {/* ========================================================================= */}
        {/* TOP ARCHITECTURAL HEADER                                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 pb-10 sm:pb-14 border-b border-[#EDE5DA]/15">
          {/* Left: Back to Building & Floor Stepper */}
          <div className="flex items-center justify-between lg:justify-start gap-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-[11px] font-sans-body font-bold uppercase tracking-[0.22em] text-[#62AA9E] hover:text-[#EDE5DA] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to Building</span>
            </button>

            <span className="text-[#EDE5DA]/20 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectLevel(prevLevel)}
                className="p-1.5 text-[#EDE5DA]/70 hover:text-[#62AA9E] transition-colors cursor-pointer"
                aria-label="Previous Floor"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-sans-body text-[10px] uppercase tracking-[0.25em] text-[#EDE5DA]/70">
                Floor {levelData.code} / 13
              </span>
              <button
                type="button"
                onClick={() => onSelectLevel(nextLevel)}
                className="p-1.5 text-[#EDE5DA]/70 hover:text-[#62AA9E] transition-colors cursor-pointer"
                aria-label="Next Floor"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center: Monumental Floor Title */}
          <div className="text-center justify-self-center">
            <h1 className="type-display font-serif-heading font-luxia-display text-4xl sm:text-6xl md:text-7xl text-[#EDE5DA] tracking-tight leading-none select-none">
              {levelData.name}
            </h1>
            <p className="font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#62AA9E] font-semibold mt-3">
              {levelData.subtitle}
            </p>
          </div>

          {/* Right: Close & Context Links */}
          <div className="flex items-center justify-center lg:justify-end gap-5 font-sans-body text-[11px] uppercase tracking-[0.22em]">
            {isResidential ? (
              <Link
                href={`/residence/${suite.slug}`}
                className="font-bold text-[#62AA9E] hover:text-[#EDE5DA] transition-colors inline-flex items-center gap-1.5"
              >
                <span>{suite.shortTitle} Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ) : levelData.category === "commercial" ? (
              <Link
                href="/commercial"
                className="font-bold text-[#62AA9E] hover:text-[#EDE5DA] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Commercial Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                href="/amenities"
                className="font-bold text-[#62AA9E] hover:text-[#EDE5DA] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Amenities Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close floor view"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#EDE5DA]/20 hover:border-[#62AA9E] text-[#EDE5DA] hover:text-[#62AA9E] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* APARTMENT TYPOLOGY SELECTOR (FOR RESIDENTIAL FLOORS 03 – 13)              */}
        {/* ========================================================================= */}
        {isResidential && levelData.availableSuites.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6 border-b border-[#EDE5DA]/15">
            {levelData.availableSuites.map((slug) => {
              const s = getSuiteBySlug(slug);
              if (!s) return null;
              const active = selectedSuiteSlug === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setSelectedSuiteSlug(slug)}
                  className={`pb-1.5 relative font-sans-body text-xs uppercase tracking-[0.24em] transition-colors cursor-pointer ${
                    active
                      ? "text-[#62AA9E] font-bold"
                      : "text-[#EDE5DA]/60 hover:text-[#EDE5DA]"
                  }`}
                >
                  <span>
                    {s.shortTitle} ({s.specs.totalArea})
                  </span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#62AA9E]" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* CORE SPLIT: FLOOR PLAN (LEFT) + SPECIFICATIONS (RIGHT)                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 sm:pt-16 pb-20 border-b border-[#EDE5DA]/15 items-start">
          {/* Left Column (7 Cols): Pure Architectural Floor Plan Frame */}
          <div className="lg:col-span-7 flex flex-col">
            {isResidential && suite.slug === "1-bedroom" ? (
              <div className="relative w-full aspect-[16/11] rounded-2xl border border-[#EDE5DA]/20 bg-[#EDE5DA] shadow-2xl overflow-hidden">
                <FloorPlan3DViewer
                  plan={ONE_BEDROOM_PLAN}
                  fallbackImageSrc={planSrc}
                  fallbackAlt={`${levelData.name} architectural layout`}
                  onExpand={() => setIsPlanLightboxOpen(true)}
                />
              </div>
            ) : (
              <div
                onClick={() => setIsPlanLightboxOpen(true)}
                className={`group relative w-full aspect-[16/11] rounded-2xl border border-[#EDE5DA]/20 flex items-center justify-center cursor-zoom-in shadow-2xl overflow-hidden ${
                  levelData.category === "amenities"
                    ? "bg-[#0d2828]"
                    : "bg-[#EDE5DA] p-4 sm:p-6"
                }`}
              >
                <Image
                  src={planSrc}
                  alt={`${levelData.name} architectural layout`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className={
                    levelData.category === "amenities"
                      ? "object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      : "object-contain p-2 filter contrast-[1.05] transition-transform duration-500 group-hover:scale-[1.02]"
                  }
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-4 px-1 text-[10px] sm:text-xs font-sans-body text-[#C9BFB1] uppercase tracking-[0.2em]">
              <span>
                {isResidential
                  ? `${suite.title} · Architectural Floor Plan`
                  : `${levelData.name} · Architectural Layout`}
              </span>
              <button
                type="button"
                onClick={() => setIsPlanLightboxOpen(true)}
                className="text-[#62AA9E] hover:text-[#EDE5DA] transition-colors font-semibold uppercase tracking-[0.2em] cursor-pointer"
              >
                Enlarge Plan
              </button>
            </div>
          </div>

          {/* Right Column (5 Cols): Specifications & Editorial Details */}
          <div className="lg:col-span-5 flex flex-col">
            {isResidential ? (
              <>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 pb-8 border-b border-[#EDE5DA]/15">
                  <div>
                    <span className="block font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold mb-1">
                      Bedrooms
                    </span>
                    <span className="font-serif-heading font-luxia-display text-4xl sm:text-5xl text-[#EDE5DA] leading-none">
                      {suite.specs.bedrooms}
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold mb-1">
                      Interior Area
                    </span>
                    <span className="font-serif-heading font-luxia-display text-4xl sm:text-5xl text-[#EDE5DA] leading-none">
                      {suite.specs.interiorArea}
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold mb-1">
                      Terrace
                    </span>
                    <span className="font-serif-heading font-luxia-display text-4xl sm:text-5xl text-[#EDE5DA] leading-none">
                      {suite.specs.terrace}
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold mb-1">
                      Total Area
                    </span>
                    <span className="font-serif-heading font-luxia-display text-4xl sm:text-5xl text-[#EDE5DA] leading-none">
                      {suite.specs.totalArea}
                    </span>
                  </div>
                </div>

                {/* Minimal Tabs: INFO | INCLUSIONS | SPACES */}
                <div className="flex items-center gap-8 pt-8 pb-4 border-b border-[#EDE5DA]/15 text-[11px] sm:text-xs font-sans-body uppercase tracking-[0.22em]">
                  {(["info", "inclusions", "spaces"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 relative font-semibold transition-colors cursor-pointer uppercase ${
                        activeTab === tab
                          ? "text-[#62AA9E]"
                          : "text-[#EDE5DA]/60 hover:text-[#EDE5DA]"
                      }`}
                    >
                      <span>{tab}</span>
                      {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#62AA9E]" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="py-6 min-h-[210px]">
                  {activeTab === "info" && (
                    <div className="space-y-4">
                      <h2 className="type-section font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
                        {suite.title}
                      </h2>
                      <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA]/85 font-light leading-relaxed">
                        {suite.intro}
                      </p>
                      <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                        {levelData.description}
                      </p>
                    </div>
                  )}

                  {activeTab === "inclusions" && (
                    <div className="space-y-4 max-h-[240px] overflow-y-auto pr-2">
                      {suite.inclusions.map((cat, idx) => (
                        <div key={idx} className="space-y-1">
                          <span className="font-sans-body text-[10px] uppercase tracking-[0.25em] font-bold text-[#62AA9E]">
                            {cat.category}
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#EDE5DA]/80 font-light">
                            {cat.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-[#62AA9E] shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "spaces" && (
                    <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
                      {suite.spaces.map((sp, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-12 text-xs py-1.5 border-b border-[#EDE5DA]/10 last:border-b-0"
                        >
                          <span className="col-span-5 font-medium text-[#EDE5DA]">
                            {sp.space}
                          </span>
                          <span className="col-span-7 text-[#C9BFB1] font-light">
                            {sp.experience}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {levelData.customSpecs && (
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8 pb-8 border-b border-[#EDE5DA]/15">
                    {levelData.customSpecs.map((spec, i) => (
                      <div key={i}>
                        <span className="block font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold mb-1">
                          {spec.label}
                        </span>
                        <span className="font-serif-heading font-luxia-display text-3xl sm:text-4xl text-[#EDE5DA] leading-none">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="py-8 space-y-4">
                  <h2 className="type-section font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
                    {levelData.detailMeta}
                  </h2>
                  <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA]/85 font-light leading-relaxed">
                    {levelData.description}
                  </p>
                </div>
              </>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="rounded-full bg-[#62AA9E] text-[#153D3D] hover:bg-[#7EC1B6] px-8 py-3.5 text-xs font-sans-body font-bold uppercase tracking-[0.22em] transition-all duration-300 shadow-md cursor-pointer"
              >
                Book a Private Tour
              </button>

              <a
                href="/orion-one-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#EDE5DA]/30 bg-transparent text-[#EDE5DA] hover:border-[#62AA9E] hover:text-[#62AA9E] px-6 py-3.5 text-xs font-sans-body font-bold uppercase tracking-[0.22em] transition-all duration-300 inline-flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[#62AA9E]" />
                <span>PDF Brochure</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PURE ARCHITECTURAL GALLERY STACK                                          */}
        {/* ========================================================================= */}
        <div className="max-w-[1280px] mx-auto pt-16 sm:pt-24 space-y-12 sm:space-y-16">
          {galleryImages.map((imgSrc, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-[#0d2828] border border-[#EDE5DA]/10"
            >
              <Image
                src={imgSrc}
                alt={`${levelData.name} architectural view ${idx + 1}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover transition-transform duration-700 hover:scale-[1.015]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FLOOR PLAN LIGHTBOX                                                       */}
      {/* ========================================================================= */}
      {isPlanLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] bg-[#081a1a]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsPlanLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#0d2828] border border-[#EDE5DA]/20 rounded-2xl p-4 sm:p-10 flex flex-col shadow-2xl text-[#EDE5DA]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DA]/15">
              <div>
                <span className="font-sans-body text-[10px] uppercase tracking-[0.25em] text-[#62AA9E] font-bold">
                  {levelData.name}
                </span>
                <h3 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA]">
                  {isResidential ? suite.title : levelData.subtitle}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsPlanLightboxOpen(false)}
                className="inline-flex items-center justify-center p-2.5 rounded-full border border-[#EDE5DA]/20 hover:bg-[#EDE5DA]/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Close layout"
              >
                <X className="w-5 h-5 text-[#EDE5DA]" />
              </button>
            </div>

            <div className="relative w-full h-[65vh] sm:h-[70vh] my-4 rounded-xl bg-[#EDE5DA] p-3 sm:p-4 flex items-center justify-center overflow-hidden">
              {isResidential && suite.slug === "1-bedroom" ? (
                <FloorPlan3DViewer
                  plan={ONE_BEDROOM_PLAN}
                  fallbackImageSrc={planSrc}
                  fallbackAlt={`${levelData.name} full layout`}
                />
              ) : (
                <Image
                  src={planSrc}
                  alt={`${levelData.name} full layout`}
                  fill
                  sizes="90vw"
                  className="object-contain filter contrast-[1.05]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
