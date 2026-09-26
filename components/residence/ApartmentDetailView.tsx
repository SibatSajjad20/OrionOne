"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  FileText,
  Compass,
  Check,
  Maximize2,
  X,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import OrionRotatingBadge from "@/components/residence/OrionRotatingBadge";
import {
  ResidenceSuiteData,
  getSimilarSuites,
} from "@/app/residence/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ApartmentDetailViewProps {
  suite: ResidenceSuiteData;
}

export default function ApartmentDetailView({ suite }: ApartmentDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"info" | "benefits" | "inclusions" | "spaces">("info");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const similarRef = useRef<HTMLDivElement>(null);
  const perspectiveRef = useRef<HTMLDivElement>(null);

  const similarSuites = getSimilarSuites(suite.slug);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          }
        );
      }

      // 2. Gallery Stack Entrance
      if (galleryRef.current) {
        const images = galleryRef.current.querySelectorAll(".gallery-frame");
        gsap.fromTo(
          images,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 3. Similar Options Entrance
      if (similarRef.current) {
        const cards = similarRef.current.querySelectorAll(".similar-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: similarRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [suite.slug]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#153D3D]"
    >
      {/* Subtle Ambient Radial Lighting matching main residence page */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(28,78,78,0.4)_0%,rgba(21,61,61,0.2)_50%,transparent_80%)]" />

      {/* Universal Fixed Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Bedroom Showcase Journey */}
      <main className="relative pt-24 sm:pt-28 z-10">
        {/* ========================================================================= */}
        {/* SECTION 01: ARCHITECTURAL UNIT HEADER & SPEC SHEET                       */}
        {/* ========================================================================= */}
        <section
          ref={heroRef}
          className="max-w-[1520px] mx-auto px-4 sm:px-10 lg:px-16 pt-8 sm:pt-12 pb-16 sm:pb-24 border-b border-[#EDE5DA]/15"
        >
          {/* Top Bar: Rotating Seal Badge (Left) + Unit Number (Center) + Quick Actions (Right) */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-12 sm:pb-16 border-b border-[#EDE5DA]/15">
            {/* Top-Left: Brand Rotating Badge */}
            <div className="flex items-center gap-4">
              <OrionRotatingBadge size={92} />
              <div className="flex flex-col">
                <span className="font-sans-body text-[10px] uppercase tracking-[0.35em] text-[#62AA9E] font-bold">
                  Orion One
                </span>
                <span className="font-sans-body text-[10px] uppercase tracking-[0.2em] text-[#EDE5DA]/70">
                  DHA Phase III · Islamabad
                </span>
              </div>
            </div>

            {/* Center: Unit Number & Level Meta */}
            <div className="text-center">
              <h1 className="font-serif-heading text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] font-light text-[#EDE5DA] tracking-tight leading-none uppercase select-none">
                {suite.unitCode}
              </h1>
              <p className="font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#62AA9E] font-semibold mt-3">
                {suite.levelMeta} · COMPLETION: {suite.completion}
              </p>
            </div>

            {/* Top-Right: Editorial Navigation Links */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-1 font-sans-body text-[11px] uppercase tracking-[0.22em]">
              <Link
                href="/residence"
                className="font-bold text-[#62AA9E] hover:text-[#EDE5DA] transition-colors py-1 flex items-center gap-1.5"
              >
                <span>Select an Apartment</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsInquiryOpen(true)}
                className="text-[#EDE5DA]/70 hover:text-[#EDE5DA] transition-colors py-0.5 cursor-pointer"
              >
                Book a Private Tour
              </button>
              <Link
                href="/contact"
                className="text-[#EDE5DA]/70 hover:text-[#EDE5DA] transition-colors py-0.5"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Core Spec Split: Architectural Floor Plan (Left) + Specifications & Tabs (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 sm:pt-16 items-start">
            {/* Left Column (7 Cols): Architectural Floor Plan Frame */}
            <div className="lg:col-span-7 flex flex-col">
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="group relative w-full aspect-[4/3] rounded-2xl bg-[#0d2828]/70 border border-[#EDE5DA]/15 p-4 sm:p-6 flex items-center justify-center cursor-zoom-in shadow-2xl hover:border-[#62AA9E]/40 transition-all duration-300"
              >
                <div className="relative w-full h-full rounded-xl bg-[#EDE5DA] p-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src={suite.floorPlanSrc}
                    alt={`${suite.title} architectural floor plan layout`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-contain p-2 filter contrast-[1.05] transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Subtle Enlarge Hint */}
                <div className="absolute bottom-6 right-6 bg-[#081a1a]/85 border border-[#EDE5DA]/20 text-[#EDE5DA] text-[10px] font-sans-body uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
                  <Maximize2 className="w-3 h-3 text-[#62AA9E]" />
                  <span>Enlarge Layout</span>
                </div>
              </div>

              {/* Floor Plan Sub-Label & Status */}
              <div className="flex items-center justify-between pt-4 px-2 text-[10px] sm:text-xs font-sans-body text-[#EDE5DA]/60 uppercase tracking-[0.2em]">
                <span>Architectural Layout · Scale 1:100</span>
                <span className="text-[#62AA9E] font-medium">{suite.specs.orientation}</span>
              </div>
            </div>

            {/* Right Column (5 Cols): Numbers, Tabs, Inclusions & Actions */}
            <div className="lg:col-span-5 flex flex-col">
              {/* Numeric Architectural Specs Stack */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-y-6 gap-x-8 pb-8 border-b border-[#EDE5DA]/15">
                <div>
                  <span className="block font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold mb-1">
                    Bedrooms
                  </span>
                  <span className="font-serif-heading text-4xl sm:text-5xl text-[#EDE5DA] font-light leading-none">
                    {suite.specs.bedrooms}
                  </span>
                </div>

                <div>
                  <span className="block font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold mb-1">
                    Interior Area
                  </span>
                  <span className="font-serif-heading text-4xl sm:text-5xl text-[#EDE5DA] font-light leading-none">
                    {suite.specs.interiorArea}
                  </span>
                </div>

                <div>
                  <span className="block font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold mb-1">
                    Terrace
                  </span>
                  <span className="font-serif-heading text-4xl sm:text-5xl text-[#EDE5DA] font-light leading-none">
                    {suite.specs.terrace}
                  </span>
                </div>

                <div>
                  <span className="block font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold mb-1">
                    Total Area
                  </span>
                  <span className="font-serif-heading text-4xl sm:text-5xl text-[#EDE5DA] font-light leading-none">
                    {suite.specs.totalArea}
                  </span>
                </div>
              </div>

              {/* Interactive Tabs Header: INFO | BENEFITS | INCLUSIONS | SPACES */}
              <div className="flex items-center gap-6 sm:gap-8 pt-8 pb-4 border-b border-[#EDE5DA]/15 text-[11px] sm:text-xs font-sans-body uppercase tracking-[0.22em] overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab("info")}
                  className={`pb-2 relative font-semibold transition-colors cursor-pointer ${
                    activeTab === "info"
                      ? "text-[#62AA9E]"
                      : "text-[#EDE5DA]/60 hover:text-[#EDE5DA]"
                  }`}
                >
                  <span>Info</span>
                  {activeTab === "info" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#62AA9E] shadow-[0_0_8px_rgba(98,170,158,0.7)]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("benefits")}
                  className={`pb-2 relative font-semibold transition-colors cursor-pointer ${
                    activeTab === "benefits"
                      ? "text-[#62AA9E]"
                      : "text-[#EDE5DA]/60 hover:text-[#EDE5DA]"
                  }`}
                >
                  <span>Benefits</span>
                  {activeTab === "benefits" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#62AA9E] shadow-[0_0_8px_rgba(98,170,158,0.7)]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("inclusions")}
                  className={`pb-2 relative font-semibold transition-colors cursor-pointer ${
                    activeTab === "inclusions"
                      ? "text-[#62AA9E]"
                      : "text-[#EDE5DA]/60 hover:text-[#EDE5DA]"
                  }`}
                >
                  <span>Inclusions</span>
                  {activeTab === "inclusions" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#62AA9E] shadow-[0_0_8px_rgba(98,170,158,0.7)]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("spaces")}
                  className={`pb-2 relative font-semibold transition-colors cursor-pointer ${
                    activeTab === "spaces"
                      ? "text-[#62AA9E]"
                      : "text-[#EDE5DA]/60 hover:text-[#EDE5DA]"
                  }`}
                >
                  <span>Spaces</span>
                  {activeTab === "spaces" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#62AA9E] shadow-[0_0_8px_rgba(98,170,158,0.7)]" />
                  )}
                </button>
              </div>

              {/* Dynamic Tab Body */}
              <div className="py-6 min-h-[220px]">
                {/* Tab 1: INFO */}
                {activeTab === "info" && (
                  <div className="space-y-4">
                    <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA]/85 font-light leading-relaxed">
                      {suite.intro}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {suite.keyFeatures.slice(0, 4).map((f) => (
                        <div key={f.number} className="text-xs p-3 rounded-lg bg-[#0d2828]/50 border border-[#EDE5DA]/10">
                          <span className="font-bold text-[#62AA9E] block mb-0.5">
                            {f.number} · {f.title}
                          </span>
                          <span className="text-[#EDE5DA]/70 font-light">
                            {f.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: BENEFITS */}
                {activeTab === "benefits" && (
                  <div className="space-y-4">
                    {suite.benefits.map((b, idx) => (
                      <div
                        key={idx}
                        className="pb-3 border-b border-[#EDE5DA]/10 last:border-b-0"
                      >
                        <h4 className="font-sans-body text-xs uppercase tracking-[0.18em] font-bold text-[#62AA9E] mb-1">
                          {b.title}
                        </h4>
                        <p className="font-sans-body text-xs text-[#EDE5DA]/75 font-light leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 3: INCLUSIONS */}
                {activeTab === "inclusions" && (
                  <div className="space-y-4 max-h-[260px] overflow-y-auto pr-2">
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

                {/* Tab 4: SPACES */}
                {activeTab === "spaces" && (
                  <div className="space-y-2 max-h-[260px] overflow-y-auto pr-2">
                    <div className="grid grid-cols-12 text-[10px] uppercase tracking-[0.2em] font-bold text-[#62AA9E] pb-1 border-b border-[#EDE5DA]/15">
                      <span className="col-span-5">Space</span>
                      <span className="col-span-7">Experience</span>
                    </div>
                    {suite.spaces.map((sp, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 text-xs py-1.5 border-b border-[#EDE5DA]/10 last:border-b-0"
                      >
                        <span className="col-span-5 font-medium text-[#EDE5DA]">
                          {sp.space}
                        </span>
                        <span className="col-span-7 text-[#EDE5DA]/70 font-light">
                          {sp.experience}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons: SUBMIT A REQUEST & PDF */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsInquiryOpen(true)}
                  className="rounded-full bg-[#62AA9E] text-[#153D3D] hover:bg-[#7EC1B6] px-8 py-3.5 text-xs font-sans-body font-bold uppercase tracking-[0.22em] transition-all duration-300 shadow-md cursor-pointer"
                >
                  Submit a Request
                </button>

                <a
                  href="/orion-one-brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#EDE5DA]/30 bg-transparent text-[#EDE5DA] hover:border-[#62AA9E] hover:text-[#62AA9E] px-6 py-3.5 text-xs font-sans-body font-bold uppercase tracking-[0.22em] transition-all duration-300 shadow-sm inline-flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#62AA9E]" />
                  <span>PDF Brochure</span>
                </a>

                {/* Compass & Building Orientation Graphic */}
                <div className="ml-auto hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#EDE5DA]/60">
                  <Compass className="w-4 h-4 text-[#62AA9E]" />
                  <span>N · Sector F</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 02: EDITORIAL ARCHITECTURAL GALLERY STACK (PURE PHOTOGRAPHY)      */}
        {/* ========================================================================= */}
        <section
          ref={galleryRef}
          className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 space-y-12 sm:space-y-16"
        >
          {suite.gallery.map((imgSrc, idx) => (
            <div
              key={idx}
              className="gallery-frame relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-[#0d2828] border border-[#EDE5DA]/10"
            >
              <Image
                src={imgSrc}
                alt={`${suite.title} interior photography frame ${idx + 1}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover transition-transform duration-700 hover:scale-[1.015]"
              />
            </div>
          ))}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 03: LAKEFRONT RETREAT PANORAMIC ATMOSPHERE                        */}
        {/* ========================================================================= */}
        <section
          ref={quoteRef}
          className="relative w-full py-28 sm:py-40 bg-[#0d2828] text-[#EDE5DA] overflow-hidden border-y border-[#EDE5DA]/10"
        >
          {/* Full-bleed background image with restrained dark wash */}
          <div className="absolute inset-0 z-0">
            <Image
              src={suite.quoteBanner.imageSrc}
              alt="Orion One Lakefront Retreat"
              fill
              sizes="100vw"
              className="object-cover opacity-35 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2828] via-transparent to-[#0d2828]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center">
            <span className="font-sans-body text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#62AA9E] font-semibold block mb-6">
              {suite.quoteBanner.tag}
            </span>

            <blockquote className="font-serif-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-tight tracking-tight uppercase max-w-4xl mx-auto mb-10">
              "{suite.quoteBanner.quote}"
            </blockquote>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setIsInquiryOpen(true)}
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-[#EDE5DA]/30 hover:border-[#62AA9E] hover:bg-[#62AA9E]/10 transition-all duration-500 flex flex-col items-center justify-center p-3 text-center cursor-pointer group"
              >
                <span className="font-sans-body text-[10px] uppercase tracking-[0.25em] text-[#EDE5DA] group-hover:text-[#62AA9E] font-medium leading-tight">
                  Book A Call Now
                </span>
                <ArrowRight className="w-4 h-4 text-[#62AA9E] mt-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 04: SIMILAR OPTIONS / OTHER APARTMENTS                           */}
        {/* ========================================================================= */}
        <section
          ref={similarRef}
          className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-32"
        >
          {/* Centered Vertical Hairline Divider */}
          <div className="w-[1px] h-16 bg-[#EDE5DA]/20 mx-auto mb-10" />

          {/* Section Heading & Subtitle */}
          <div className="text-center mb-14 sm:mb-20">
            <h2 className="font-serif-heading text-3xl sm:text-5xl md:text-7xl font-light text-[#EDE5DA] tracking-tight uppercase">
              Similar Options
            </h2>
            <p className="font-sans-body text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#62AA9E] font-semibold mt-3">
              Other apartments that might suit your needs
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {similarSuites.map((other) => (
              <Link
                key={other.slug}
                href={`/residence/${other.slug}`}
                className="similar-card group flex flex-col p-6 sm:p-8 rounded-2xl bg-[#0d2828]/60 border border-[#EDE5DA]/10 hover:border-[#62AA9E]/50 hover:bg-[#0d2828]/90 transition-all duration-500 shadow-xl"
              >
                {/* Upper Level Meta */}
                <div className="text-center mb-4 pb-3 border-b border-[#EDE5DA]/10">
                  <span className="font-sans-body text-[10px] uppercase tracking-[0.25em] text-[#EDE5DA]/60 font-semibold">
                    {other.levelMeta} · COMPLETION: {other.completion}
                  </span>
                </div>

                {/* Floor Plan Image Frame */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#EDE5DA] p-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.01]">
                  <Image
                    src={other.floorPlanSrc}
                    alt={`${other.title} layout`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-contain p-2 filter contrast-[1.05]"
                  />
                </div>

                {/* Lower Unit Designation & Specs */}
                <div className="text-center pt-6 pb-2">
                  <span className="font-sans-body text-[10px] uppercase tracking-[0.25em] text-[#EDE5DA]/60 block mb-1">
                    {other.unitCode} · {other.shortTitle}
                  </span>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-light text-[#EDE5DA] tracking-tight uppercase mb-1 group-hover:text-[#62AA9E] transition-colors">
                    {other.headline}
                  </h3>
                  <p className="font-sans-body text-xs uppercase tracking-[0.22em] text-[#62AA9E] font-medium">
                    + {other.specs.terrace} Terrace
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Centered 'VIEW ALL' Pill Button */}
          <div className="flex justify-center pt-12 sm:pt-16">
            <Link
              href="/residence"
              className="rounded-full border border-[#EDE5DA]/30 bg-transparent text-[#EDE5DA] hover:border-[#62AA9E] hover:bg-[#62AA9E] hover:text-[#153D3D] px-10 py-3.5 text-xs font-sans-body font-bold uppercase tracking-[0.22em] transition-all duration-300 shadow-sm inline-flex items-center gap-2"
            >
              <span>View All Residences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 05: FULL-WIDTH PERSPECTIVE FRAME                                  */}
        {/* ========================================================================= */}
        <section
          ref={perspectiveRef}
          className="relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[500px] flex items-center justify-center overflow-hidden border-t border-[#EDE5DA]/15"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={suite.lakeViewPerspective.imageSrc}
              alt={suite.lakeViewPerspective.title}
              fill
              sizes="100vw"
              className="object-cover filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA]/80 font-light max-w-xl mx-auto mb-6">
              A short conversation is enough to understand which apartment fits
              your lifestyle — whether it is a private sanctuary, a family
              lakefront home, or a finite investment.
            </p>

            <h2 className="font-serif-heading text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-tight uppercase leading-none mb-3">
              {suite.lakeViewPerspective.title}
            </h2>

            <p className="font-sans-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#62AA9E] font-semibold mb-10">
              {suite.lakeViewPerspective.subtitle}
            </p>

            <button
              type="button"
              onClick={() => setIsInquiryOpen(true)}
              className="w-32 h-32 rounded-full border border-white/40 hover:border-[#62AA9E] hover:bg-[#62AA9E]/10 transition-all duration-500 mx-auto flex flex-col items-center justify-center p-3 text-center cursor-pointer group"
            >
              <span className="font-sans-body text-[10px] uppercase tracking-[0.25em] text-white group-hover:text-[#62AA9E] font-medium leading-tight">
                Enquire Now
              </span>
              <ArrowRight className="w-4 h-4 text-[#62AA9E] mt-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 06: GROUNDED DARK CALL TRANSITION                                */}
        {/* ========================================================================= */}
        <section className="bg-[#0d2828] text-[#EDE5DA] pt-20 sm:pt-28 pb-12 px-6 text-center border-t border-[#EDE5DA]/15">
          <div className="max-w-4xl mx-auto">
            {/* Star Emblem */}
            <div className="flex justify-center mb-6 text-[#62AA9E]">
              <svg
                width="36"
                height="36"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-90"
              >
                <path
                  d="M20 0L22.5 17.5L40 20L22.5 22.5L20 40L17.5 22.5L0 20L17.5 17.5L20 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Monumental Phone Number in Luxia Serif */}
            <a
              href="tel:+923009079164"
              className="font-serif-heading text-4xl sm:text-6xl md:text-7xl font-light text-[#EDE5DA] hover:text-[#62AA9E] tracking-tight transition-colors inline-block select-none"
            >
              +92 300 9079 164
            </a>

            <p className="font-sans-body text-[11px] uppercase tracking-[0.3em] text-[#62AA9E] font-semibold mt-3">
              DHA Phase III · Islamabad
            </p>
          </div>
        </section>
      </main>

      {/* Universal Grounded Footer */}
      <Footer />

      {/* Slide-Over Private Tour & Concierge Drawer */}
      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Floor Plan Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#081a1a]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            data-lenis-prevent="true"
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#0d2828] border border-[#EDE5DA]/20 rounded-2xl p-4 sm:p-10 flex flex-col shadow-2xl text-[#EDE5DA] overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DA]/15">
              <div>
                <span className="font-sans-body text-[10px] uppercase tracking-[0.25em] text-[#62AA9E] font-bold">
                  {suite.unitCode} · Architectural Floor Plan
                </span>
                <h3 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA] font-light">
                  {suite.headline}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="inline-flex items-center justify-center p-2.5 rounded-full border border-[#EDE5DA]/20 hover:bg-[#EDE5DA]/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Close layout"
              >
                <X className="w-5 h-5 text-[#EDE5DA]" />
              </button>
            </div>

            <div className="relative w-full h-[65vh] sm:h-[70vh] my-4 rounded-xl bg-[#EDE5DA] p-3 sm:p-4 flex items-center justify-center overflow-hidden">
              <Image
                src={suite.floorPlanSrc}
                alt={`${suite.title} full layout`}
                fill
                sizes="90vw"
                className="object-contain filter contrast-[1.05]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-[#EDE5DA]/10 text-xs font-sans-body text-[#EDE5DA]/70 uppercase tracking-[0.2em]">
              <span className="text-[#62AA9E]">{suite.specs.orientation}</span>
              <a
                href="/orion-one-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#62AA9E] hover:text-[#EDE5DA] transition-colors"
              >
                Download PDF Specification →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
