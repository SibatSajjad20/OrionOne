"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowUpRight, Compass, Layout } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ResidenceUnit {
  id: string;
  category: "1-bedroom" | "2-bedroom" | "3-bedroom" | "private-pool";
  title: string;
  tagline: string;
  description: string;
  floorPlanSrc: string;
  renderSrc: string;
  specs: {
    bedrooms: string;
    focus: string;
    exposure: string;
  };
  href: string;
}

const RESIDENCE_UNITS: ResidenceUnit[] = [
  {
    id: "res-1-bed",
    category: "1-bedroom",
    title: "One Bedroom",
    tagline: "Efficient. Elegant. Connected.",
    description:
      "Designed for professionals, investors, and young families, these residences combine efficient layouts with elegant interiors, premium amenities, and breathtaking views.",
    floorPlanSrc: "/images/residence/1-bedroom.webp",
    renderSrc: "/images/residence/pic-2.jpg",
    specs: {
      bedrooms: "01 Bedroom",
      focus: "Intelligent Layout",
      exposure: "Lakefront Outlook",
    },
    href: "/contact",
  },
  {
    id: "res-2-bed",
    category: "2-bedroom",
    title: "Two Bedroom",
    tagline: "Space for what matters.",
    description:
      "Designed for growing families and discerning homeowners, two-bedroom residences provide generous living areas, refined finishes, and a lifestyle centred around comfort and convenience.",
    floorPlanSrc: "/images/residence/2-bedroom.webp",
    renderSrc: "/images/residence/pic-1.jpg",
    specs: {
      bedrooms: "02 Bedrooms",
      focus: "Generous Living",
      exposure: "Waterfront Balconies",
    },
    href: "/contact",
  },
  {
    id: "res-3-bed",
    category: "3-bedroom",
    title: "Three Bedroom",
    tagline: "The pinnacle of family living.",
    description:
      "Spacious interiors, elevated design, and spectacular lake views come together in residences designed to offer both prestige and practicality.",
    floorPlanSrc: "/images/residence/3-bedroom.webp",
    renderSrc: "/images/residence/pic-5.webp",
    specs: {
      bedrooms: "03 Bedrooms",
      focus: "Grand Entertaining",
      exposure: "Panoramic Lake Views",
    },
    href: "/contact",
  },
  {
    id: "res-private-pool",
    category: "private-pool",
    title: "Private Pool Residences",
    tagline: "Privacy, elevated.",
    description:
      "A premium residential experience that brings the pleasure of a private pool together with the wider Orion One waterfront lifestyle.",
    floorPlanSrc: "/images/residence/private-pool.webp",
    renderSrc: "/images/residence/pic-3.webp",
    specs: {
      bedrooms: "Multi-Bedroom Suite",
      focus: "Private Plunge Pool",
      exposure: "Exclusive Shoreline View",
    },
    href: "/contact",
  },
];

interface ResidenceCollectionProps {
  onOpenInquiry?: () => void;
}

export default function ResidenceCollection({ onOpenInquiry }: ResidenceCollectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"floorplan" | "render">("floorplan");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Grid entrance
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".residence-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredUnits =
    selectedFilter === "all"
      ? RESIDENCE_UNITS
      : RESIDENCE_UNITS.filter((u) => u.category === selectedFilter);

  return (
    <section
      id="residence-collection"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 bg-[#153D3D] text-[#EDE5DA] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#62AA9E] font-semibold block mb-4">
            Curated Living
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-[1.08] mb-6">
            Find the space that fits your life
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
            From efficient one-bedroom residences to expansive three-bedroom
            homes and private pool residences, Orion One offers a range of
            residential experiences shaped around individual ways of living.
          </p>
        </div>

        {/* Interactive Controls Bar — Filter Tabs & View Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#EDE5DA]/15 mb-12">
          {/* Typology Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {[
              { id: "all", label: "All Residences" },
              { id: "1-bedroom", label: "1 Bedroom" },
              { id: "2-bedroom", label: "2 Bedroom" },
              { id: "3-bedroom", label: "3 Bedroom" },
              { id: "private-pool", label: "Private Pool" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`text-[11px] font-sans-body uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  selectedFilter === tab.id
                    ? "bg-[#62AA9E] text-[#0d2828] font-bold shadow-md"
                    : "text-[#EDE5DA]/75 hover:text-[#EDE5DA] hover:bg-[#0d2828]/50 border border-transparent hover:border-[#EDE5DA]/15"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Floor Plan vs Render Toggle — Clean Architectural Switch */}
          <div className="inline-flex items-center self-start md:self-auto p-1 bg-[#0d2828] border border-[#EDE5DA]/15 rounded-full shadow-inner">
            <button
              onClick={() => setViewMode("floorplan")}
              className={`inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                viewMode === "floorplan"
                  ? "bg-[#EDE5DA] text-[#0d2828] font-semibold"
                  : "text-[#EDE5DA]/70 hover:text-[#EDE5DA]"
              }`}
            >
              <Layout className="w-3 h-3" />
              <span>Floor Plans</span>
            </button>
            <button
              onClick={() => setViewMode("render")}
              className={`inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                viewMode === "render"
                  ? "bg-[#EDE5DA] text-[#0d2828] font-semibold"
                  : "text-[#EDE5DA]/70 hover:text-[#EDE5DA]"
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>Interiors</span>
            </button>
          </div>
        </div>

        {/* Architectural Showcase Grid — Top Aligned, Symmetrical, Zero Badges Over Images */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch"
        >
          {filteredUnits.map((unit) => {
            const currentImage =
              viewMode === "floorplan" ? unit.floorPlanSrc : unit.renderSrc;
            const isFloorPlan = viewMode === "floorplan";

            return (
              <div
                key={unit.id}
                className="residence-item flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0d2828]/60 border border-[#EDE5DA]/10 hover:border-[#62AA9E]/40 transition-all duration-500 group shadow-xl"
              >
                <div>
                  {/* Architectural Media Frame — Pure Photography or Crisp Floor Plan */}
                  <div
                    className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 sm:mb-8 transition-transform duration-500 group-hover:scale-[1.01] ${
                      isFloorPlan
                        ? "bg-[#EDE5DA] p-6 flex items-center justify-center"
                        : "bg-[#081a1a]"
                    }`}
                  >
                    <Image
                      src={currentImage}
                      alt={`${unit.title} layout and architecture at Orion One`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className={`${
                        isFloorPlan
                          ? "object-contain p-4"
                          : "object-cover object-center filter brightness-[1.02]"
                      }`}
                    />
                  </div>

                  {/* Specification Horizon Details (Clean Outside Image) */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.2em] text-[#62AA9E] pb-3 mb-3 border-b border-[#EDE5DA]/10 font-medium">
                    <span>{unit.specs.bedrooms}</span>
                    <span className="text-[#EDE5DA]/30">·</span>
                    <span>{unit.specs.focus}</span>
                    <span className="text-[#EDE5DA]/30">·</span>
                    <span>{unit.specs.exposure}</span>
                  </div>

                  {/* Title & Narrative */}
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-light text-[#EDE5DA] tracking-tight mb-2">
                    {unit.title}
                  </h3>

                  <p className="font-sans-body text-xs sm:text-sm uppercase tracking-[0.2em] text-[#62AA9E]/90 font-medium mb-3">
                    {unit.tagline}
                  </p>

                  <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed mb-6">
                    {unit.description}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-4 border-t border-[#EDE5DA]/10 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.25em] text-[#EDE5DA]/60">
                    Floor Plan & Specifications
                  </span>

                  <button
                    onClick={onOpenInquiry}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#EDE5DA] hover:text-[#62AA9E] transition-colors group-hover:translate-x-1 duration-300 cursor-pointer"
                  >
                    <span>Register Interest</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Symmetrical Architectural Visual Strip (Inspired by reference 1.png) */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#EDE5DA]/10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0d2828]/40 border border-[#EDE5DA]/10">
            <div>
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-[#081a1a]">
                <Image
                  src="/images/residence/pic-1.jpg"
                  alt="Outdoor dining terrace overlooking the lake"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>
              <h4 className="font-serif-heading text-xl sm:text-2xl font-light text-[#EDE5DA] mb-2">
                Outdoor Living
              </h4>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Balconies conceived as expansive outdoor living rooms, drawing
                in fresh lake air and horizon views.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0d2828]/40 border border-[#EDE5DA]/10">
            <div>
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-[#081a1a]">
                <Image
                  src="/images/residence/pic-2.jpg"
                  alt="Ground level garden terrace with stone walkway"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>
              <h4 className="font-serif-heading text-xl sm:text-2xl font-light text-[#EDE5DA] mb-2">
                Private Gardens
              </h4>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Select ground floor residences incorporate private garden
                courtyards seamlessly integrated with the landscape.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0d2828]/40 border border-[#EDE5DA]/10">
            <div>
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-[#081a1a]">
                <Image
                  src="/images/residence/pic-3.webp"
                  alt="Tranquil garden lounge corner with stone finishes"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>
              <h4 className="font-serif-heading text-xl sm:text-2xl font-light text-[#EDE5DA] mb-2">
                Quiet Retreats
              </h4>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Tactile materials and organic textures create unhurried spaces
                for stillness and conversation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
