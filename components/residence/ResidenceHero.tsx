"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import OrionRotatingBadge from "./OrionRotatingBadge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ResidenceUnit {
  id: string;
  category: "1-bedroom" | "2-bedroom" | "3-bedroom" | "private-pool";
  title: string;
  headline: string;
  bedCount: string;
  areaSpec: string;
  terraceSpec: string;
  level: string;
  description: string;
  floorPlanSrc: string;
  renderSrc: string;
}

const RESIDENCE_UNITS: ResidenceUnit[] = [
  {
    id: "unit-1-bed",
    category: "1-bedroom",
    title: "One Bedroom",
    headline: "1 BED / 85 M²",
    bedCount: "1",
    areaSpec: "85 M²",
    terraceSpec: "+ 18 M² Terrace",
    level: "Levels 02 – 08 · Lake Facing",
    description:
      "Efficient layouts with refined interiors, generous natural light, and uninterrupted lake horizons.",
    floorPlanSrc: "/images/residence/1-bedroom.webp",
    renderSrc: "/images/residence/pic-2.jpg",
  },
  {
    id: "unit-2-bed",
    category: "2-bedroom",
    title: "Two Bedroom",
    headline: "2 BED / 135 M²",
    bedCount: "2",
    areaSpec: "135 M²",
    terraceSpec: "+ 28 M² Terrace",
    level: "Levels 03 – 12 · Panoramic View",
    description:
      "Generous living areas, expansive waterfront balconies, and spaces shaped around family comfort.",
    floorPlanSrc: "/images/residence/2-bedroom.webp",
    renderSrc: "/images/residence/pic-1.jpg",
  },
  {
    id: "unit-3-bed",
    category: "3-bedroom",
    title: "Three Bedroom",
    headline: "3 BED / 195 M²",
    bedCount: "3",
    areaSpec: "195 M²",
    terraceSpec: "+ 42 M² Terrace",
    level: "Levels 06 – 14 · Waterfront Corner",
    description:
      "The pinnacle of family living with grand entertaining salons and panoramic lake outlooks.",
    floorPlanSrc: "/images/residence/3-bedroom.webp",
    renderSrc: "/images/residence/pic-5.webp",
  },
  {
    id: "unit-private-pool",
    category: "private-pool",
    title: "Private Pool Residence",
    headline: "POOL SUITE / 240 M²",
    bedCount: "Multi",
    areaSpec: "240 M²",
    terraceSpec: "+ 65 M² Pool Terrace",
    level: "Podium & Executive Penthouses",
    description:
      "A premium residential format combining a private plunge pool with the wider Orion One waterfront lifestyle.",
    floorPlanSrc: "/images/residence/private-pool.webp",
    renderSrc: "/images/residence/pic-3.webp",
  },
];

interface ResidenceHeroProps {
  onOpenInquiry?: () => void;
}

export default function ResidenceHero({ onOpenInquiry }: ResidenceHeroProps) {
  const [selectedTypology, setSelectedTypology] = useState<string>("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "relevant" | "size-asc" | "size-desc" | "bedrooms"
  >("relevant");
  const [isTypologyOpen, setIsTypologyOpen] = useState(false);
  const [isBedroomOpen, setIsBedroomOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const typologyRef = useRef<HTMLDivElement>(null);
  const bedroomRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        typologyRef.current &&
        !typologyRef.current.contains(target) &&
        bedroomRef.current &&
        !bedroomRef.current.contains(target) &&
        sortRef.current &&
        !sortRef.current.contains(target)
      ) {
        setIsTypologyOpen(false);
        setIsBedroomOpen(false);
        setIsSortOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTypologyOpen(false);
        setIsBedroomOpen(false);
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, clearProps: "all" },
          "-=0.7"
        )
        .fromTo(
          filterBarRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, clearProps: "all" },
          "-=0.8"
        );

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".residence-card");
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Filter and sort logic
  const filteredUnits = RESIDENCE_UNITS.filter((unit) => {
    const matchesTypology =
      selectedTypology === "all" || unit.category === selectedTypology;
    const matchesBedrooms =
      selectedBedrooms === "all" || unit.bedCount === selectedBedrooms;
    return matchesTypology && matchesBedrooms;
  }).sort((a, b) => {
    if (sortBy === "size-asc") {
      return parseInt(a.areaSpec) - parseInt(b.areaSpec);
    }
    if (sortBy === "size-desc") {
      return parseInt(b.areaSpec) - parseInt(a.areaSpec);
    }
    if (sortBy === "bedrooms") {
      const aVal = a.bedCount === "Multi" ? 4 : parseInt(a.bedCount);
      const bVal = b.bedCount === "Multi" ? 4 : parseInt(b.bedCount);
      return aVal - bVal;
    }
    return 0;
  });

  const handleResetFilters = () => {
    setSelectedTypology("all");
    setSelectedBedrooms("all");
    setSortBy("relevant");
    setIsTypologyOpen(false);
    setIsBedroomOpen(false);
    setIsSortOpen(false);
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-24 sm:pt-32 pb-24 px-4 sm:px-12 lg:px-20 bg-[#153D3D] text-[#EDE5DA] overflow-hidden"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(28,78,78,0.4)_0%,rgba(21,61,61,0.2)_50%,transparent_80%)]" />

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Top Left Rotating Logo Badge — Replicating Reference */}
        {/* Top Left Rotating Logo Badge */}
        <div ref={badgeRef} className="flex items-center justify-between pt-2 mb-10 sm:mb-16">
          <OrionRotatingBadge size={104} />
        </div>

        {/* Big Stately RESIDENCES Headline with Gap from Top & Number '04' on Right */}
        <div
          ref={headlineRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-[#EDE5DA]/15"
        >
          <div>
            <h1 className="font-serif-heading text-4xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-light text-[#EDE5DA] leading-[0.9] uppercase select-none">
              Residences
            </h1>
          </div>

          <div className="md:text-right pb-1">
            <span className="font-serif-heading text-4xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-light text-[#62AA9E]/80 leading-[0.9] select-none">
              04
            </span>
          </div>
        </div>

        {/* Architectural Filter Bar matching background aesthetic */}
        <div
          ref={filterBarRef}
          className="relative z-30 my-8 sm:my-10 rounded-xl bg-[#0d2828]/85 border border-[#EDE5DA]/15 backdrop-blur-md shadow-2xl"
        >
          {/* Controls: Typology, Bedrooms, Sort By, Reset */}
          <div className="relative px-6 sm:px-8 py-4 grid grid-cols-1 sm:grid-cols-3 items-center gap-4 sm:gap-6">
            {/* Column 1: Typology Dropdown */}
            <div className="relative" ref={typologyRef}>
              <button
                type="button"
                onClick={() => {
                  setIsTypologyOpen(!isTypologyOpen);
                  setIsBedroomOpen(false);
                  setIsSortOpen(false);
                }}
                className="inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.25em] cursor-pointer group text-left"
              >
                <span className="text-[#EDE5DA]/60 font-normal">Typology</span>
                <span className="text-[#EDE5DA] font-semibold">
                  {selectedTypology === "all"
                    ? "All"
                    : selectedTypology === "1-bedroom"
                    ? "1 Bed"
                    : selectedTypology === "2-bedroom"
                    ? "2 Bed"
                    : selectedTypology === "3-bedroom"
                    ? "3 Bed"
                    : "Private Pool"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#62AA9E] transition-transform duration-200 ${
                    isTypologyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isTypologyOpen && (
                <div className="absolute top-full left-0 mt-3 z-40 w-52 rounded-xl bg-[#0d2828] border border-[#EDE5DA]/20 shadow-2xl py-2 flex flex-col backdrop-blur-xl">
                  {[
                    { id: "all", label: "All Typologies" },
                    { id: "1-bedroom", label: "1 Bedroom" },
                    { id: "2-bedroom", label: "2 Bedroom" },
                    { id: "3-bedroom", label: "3 Bedroom" },
                    { id: "private-pool", label: "Private Pool" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setSelectedTypology(option.id);
                        setIsTypologyOpen(false);
                      }}
                      className={`text-left text-[11px] font-sans-body uppercase tracking-[0.18em] px-4 py-2.5 hover:bg-[#153D3D] transition-colors cursor-pointer ${
                        selectedTypology === option.id
                          ? "text-[#62AA9E] font-bold bg-[#153D3D]/70"
                          : "text-[#EDE5DA]/80"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: Bedrooms Dropdown */}
            <div className="relative" ref={bedroomRef}>
              <button
                type="button"
                onClick={() => {
                  setIsBedroomOpen(!isBedroomOpen);
                  setIsTypologyOpen(false);
                  setIsSortOpen(false);
                }}
                className="inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.25em] cursor-pointer group text-left"
              >
                <span className="text-[#EDE5DA]/60 font-normal">Bedrooms</span>
                <span className="text-[#EDE5DA] font-semibold">
                  {selectedBedrooms === "all" ? "All" : selectedBedrooms}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#62AA9E] transition-transform duration-200 ${
                    isBedroomOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isBedroomOpen && (
                <div className="absolute top-full left-0 mt-3 z-40 w-48 rounded-xl bg-[#0d2828] border border-[#EDE5DA]/20 shadow-2xl py-2 flex flex-col backdrop-blur-xl">
                  {[
                    { id: "all", label: "All Bedrooms" },
                    { id: "1", label: "1 Bedroom" },
                    { id: "2", label: "2 Bedrooms" },
                    { id: "3", label: "3 Bedrooms" },
                    { id: "Multi", label: "Pool Suites" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedBedrooms(opt.id);
                        setIsBedroomOpen(false);
                      }}
                      className={`text-left text-[11px] font-sans-body uppercase tracking-[0.18em] px-4 py-2.5 hover:bg-[#153D3D] transition-colors cursor-pointer ${
                        selectedBedrooms === opt.id
                          ? "text-[#62AA9E] font-bold bg-[#153D3D]/70"
                          : "text-[#EDE5DA]/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Column 3: Sort By Dropdown & Far Right Reset Button */}
            <div className="flex items-center justify-between gap-4">
              {/* Sort By Dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    setIsTypologyOpen(false);
                    setIsBedroomOpen(false);
                  }}
                  className="inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.25em] cursor-pointer group text-left"
                >
                  <span className="text-[#EDE5DA]/60 font-normal">Sort By</span>
                  <span className="text-[#EDE5DA] font-semibold">
                    {sortBy === "relevant"
                      ? "Relevant"
                      : sortBy === "size-asc"
                      ? "Area: Low"
                      : sortBy === "size-desc"
                      ? "Area: High"
                      : "Bedrooms"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#62AA9E] transition-transform duration-200 ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isSortOpen && (
                  <div className="absolute top-full left-0 mt-3 z-40 w-52 rounded-xl bg-[#0d2828] border border-[#EDE5DA]/20 shadow-2xl py-2 flex flex-col backdrop-blur-xl">
                    {[
                      { id: "relevant", label: "Relevant" },
                      { id: "size-asc", label: "Area: Low to High" },
                      { id: "size-desc", label: "Area: High to Low" },
                      { id: "bedrooms", label: "Bedrooms" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.id as any);
                          setIsSortOpen(false);
                        }}
                        className={`text-left text-[11px] font-sans-body uppercase tracking-[0.18em] px-4 py-2.5 hover:bg-[#153D3D] transition-colors cursor-pointer ${
                          sortBy === opt.id
                            ? "text-[#62AA9E] font-bold bg-[#153D3D]/70"
                            : "text-[#EDE5DA]/80"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.25em] font-semibold text-[#62AA9E] hover:text-[#EDE5DA] transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Architectural Showcase Grid — Directly Below Filters Bar */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-2"
        >
          {filteredUnits.map((unit) => {
            return (
              <Link
                key={unit.id}
                href={`/residence/${unit.category}`}
                className="residence-card flex flex-col p-6 sm:p-7 rounded-2xl bg-[#0d2828]/60 border border-[#EDE5DA]/10 hover:border-[#62AA9E]/50 hover:bg-[#0d2828]/90 transition-all duration-500 group shadow-xl cursor-pointer"
              >
                {/* Top Architectural Typology Title & Arrow Indicator */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <span className="font-sans-body text-xs sm:text-sm uppercase tracking-[0.25em] text-[#EDE5DA] font-medium">
                    {unit.title}
                  </span>
                  <span className="text-[#62AA9E] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Media Frame — Architectural Floor Plan Layout */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#EDE5DA] p-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.01]">
                  <Image
                    src={unit.floorPlanSrc}
                    alt={`${unit.title} architectural layout at Orion One`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-contain p-2 filter contrast-[1.05]"
                  />
                </div>

                {/* Headline & Specs in the Center with Padding from Top */}
                <div className="text-center pt-6 sm:pt-7 pb-2 mt-auto">
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-light text-[#EDE5DA] tracking-tight mb-2 group-hover:text-[#62AA9E] transition-colors">
                    {unit.headline}
                  </h3>
                  <p className="font-sans-body text-xs uppercase tracking-[0.25em] text-[#62AA9E] font-medium">
                    {unit.terraceSpec}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
