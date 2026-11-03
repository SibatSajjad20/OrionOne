"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { scrollToY } from "@/lib/scrollTo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SignatureSlide {
  id: string;
  ordinal: string;
  tag: string;
  title: string;
  lines: [string, string, string];
  location: string;
  description: string;
  details: string[];
  image: string;
  alt: string;
}

const SIGNATURE_SLIDES: SignatureSlide[] = [
  {
    id: "pool",
    ordinal: "01",
    tag: "HORIZON SANCTUARY",
    title: "Lake-Facing Infinity Pool",
    lines: ["LAKE-FACING", "INFINITY", "POOL"],
    location: "ORION ONE · ISLAMABAD",
    description:
      "An elevated infinity pool overlooking the lake, creating a resort-style setting above the waterfront with undisturbed horizon vistas.",
    details: ["25m Heated Pool", "Lake View Solarium", "Sunset Deck"],
    image: "/images/amenities/infinity-pool.jpg",
    alt: "Elevated Infinity Pool Overlooking the Lake at Orion One",
  },
  {
    id: "fitness",
    ordinal: "02",
    tag: "MOVEMENT & ENDURANCE",
    title: "Double-Height Fitness Center",
    lines: ["DOUBLE-HEIGHT", "FITNESS", "CENTER"],
    location: "HEALTH & PERFORMANCE",
    description:
      "A premium fitness environment connected to elevated and outdoor jogging tracks, designed to support regular training and active living.",
    details: ["Technogym Biostrength", "Elevated Track Link", "Cardio Terraces"],
    image: "/images/amenities/fitness-gym.jpg",
    alt: "Double-Height Fitness Center and Movement Suites",
  },
  {
    id: "spa",
    ordinal: "03",
    tag: "RESTORATIVE QUIET",
    title: "Wellness Spa & Recovery",
    lines: ["WELLNESS SPA", "& THERMAL", "RECOVERY"],
    location: "MINDFUL SERENITY",
    description:
      "Dedicated spaces for personal care, relaxation, steam, sauna, and restorative wellbeing overlooking lush landscaped courtyards.",
    details: ["Cedar Steam Suites", "Finnish Sauna", "Cold Plunge Pools"],
    image: "/images/amenities/spa.jpg",
    alt: "Wellness Spa and Steam Recovery Facilities",
  },
  {
    id: "dining",
    ordinal: "04",
    tag: "CULINARY PROMENADE",
    title: "Waterfront Dining Terraces",
    lines: ["WATERFRONT", "DINING", "TERRACES"],
    location: "SOCIAL PROMENADE",
    description:
      "Cafés and restaurants form part of the Orion One experience, bringing food, social activity, and waterfront views into the development.",
    details: ["Al Fresco Promenade", "Artisan Cafés", "Sunset Lounges"],
    image: "/images/amenities/dining.jpg",
    alt: "Waterfront Dining Terraces and Social Promenade",
  },
  {
    id: "concierge",
    ordinal: "05",
    tag: "INTUITIVE HOSPITALITY",
    title: "Concierge & Arrival Lounge",
    lines: ["CONCIERGE &", "ARRIVAL", "LOUNGE"],
    location: "DISCREET WELCOME",
    description:
      "A dedicated arrival experience designed to support residents and visitors with discreet, intuitive hospitality and seamless service.",
    details: ["24/7 Doorman", "Port-Cochère", "Private Valet Suites"],
    image: "/images/amenities/concierge.jpg",
    alt: "Concierge and Welcome Lounge Arrival Experience",
  },
];

interface AmenitiesHeroShowcaseProps {
  onOpenInquiry?: () => void;
}

export default function AmenitiesHeroShowcase({
  onOpenInquiry,
}: AmenitiesHeroShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Layer 0: Hero
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Layer 1: Arch Dome ("Signature Environments")
  const archLayerRef = useRef<HTMLDivElement>(null);
  const archDomeWrapperRef = useRef<HTMLDivElement>(null);
  const archContentRef = useRef<HTMLDivElement>(null);

  // Layer 2: Horizontal Editorial Showcase Track
  const showcaseLayerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const heroLayer = heroLayerRef.current;
    const heroContent = heroContentRef.current;
    const archLayer = archLayerRef.current;
    const archDomeWrapper = archDomeWrapperRef.current;
    const archContent = archContentRef.current;
    const showcaseLayer = showcaseLayerRef.current;
    const track = trackRef.current;

    if (
      !container ||
      !stage ||
      !heroLayer ||
      !heroContent ||
      !archLayer ||
      !archDomeWrapper ||
      !showcaseLayer ||
      !track
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = (context.conditions || {}) as {
            isDesktop?: boolean;
            isMobile?: boolean;
          };

          const slideCount = SIGNATURE_SLIDES.length;

          // Initial reset
          gsap.set(heroLayer, { opacity: 1, pointerEvents: "auto", display: "flex" });
          gsap.set(heroContent, { scale: 1, opacity: 1, y: 0 });
          gsap.set(archLayer, { yPercent: 100, opacity: 1, pointerEvents: "auto", display: "flex" });
          gsap.set(archDomeWrapper, { scale: 1, yPercent: 0, transformOrigin: "center center" });
          gsap.set(showcaseLayer, { opacity: 0, pointerEvents: "none" });
          gsap.set(track, { xPercent: 0 });

          if (isDesktop) {
            // =========================================================================
            // DESKTOP: HERO -> ARCH DOME RISE & HOLD -> VANILLA SCREEN FILL -> SMOOTH SINGLE SHEET SLIDES
            // Total timeline duration: 11.2 units
            // =========================================================================
            const masterTl = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=520%",
                pin: stage,
                pinSpacing: true,
                scrub: 1.0,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            scrollTriggerInstanceRef.current = masterTl.scrollTrigger || null;

            // 0.0 -> 1.0: Hero fades & recedes (explicit fromTo guarantees full visibility at scroll 0)
            masterTl.fromTo(
              heroContent,
              { scale: 1, opacity: 1, y: 0 },
              {
                scale: 0.94,
                opacity: 0,
                y: -30,
                duration: 1.0,
                ease: "power2.out",
              },
              0.0
            );

            // 0.4 -> 2.0: Rounded Arch Dome rises up from bottom
            masterTl.fromTo(
              archLayer,
              { yPercent: 100 },
              {
                yPercent: 0,
                duration: 1.6,
                ease: "power2.out",
              },
              0.4
            );

            // 1.0 -> 2.0: Editorial centerpiece inside Arch Dome fades and slides up
            if (archContent) {
              masterTl.fromTo(
                archContent,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
                1.0
              );
            }

            // 2.0 -> 3.2: HOLD WINDOW (Arch Dome is fully visible, centered, and readable)

            // 3.2 -> 3.7: Editorial centerpiece fades out
            if (archContent) {
              masterTl.to(
                archContent,
                { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" },
                3.2
              );
            }

            // 3.2 -> 4.4: VANILLA EXPANSION
            // The Arch Dome smoothly scales up and expands, filling the entire screen with the vanilla background
            masterTl.fromTo(
              archDomeWrapper,
              { scale: 1, yPercent: 0 },
              {
                scale: 3.2,
                yPercent: -35,
                duration: 1.2,
                ease: "power2.inOut",
              },
              3.2
            );

            // 4.2 -> 4.5: Once vanilla has fully covered the viewport, showcaseLayer softly emerges
            masterTl.fromTo(
              showcaseLayer,
              { opacity: 0 },
              {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.3,
                ease: "power1.out",
              },
              4.2
            );

            // 4.5 -> 10.5: CONTINUOUS BUTTER-SMOOTH SINGLE SHEET HORIZONTAL GLIDE
            // Translates the track across the 5 environments in one seamless, linear flow
            masterTl.fromTo(
              track,
              { xPercent: 0 },
              {
                xPercent: -80,
                duration: 6.0,
                ease: "none",
              },
              4.5
            );

            // 10.5 -> 11.2: Brief resting buffer on Concierge before unpinning into Amenities Index
            masterTl.to({}, { duration: 0.7 }, 10.5);
          } else {
            // =========================================================================
            // MOBILE / TABLET: TOUCH-ADAPTED PINNED JOURNEY WITH SMOOTH SINGLE SHEET
            // =========================================================================
            const mobileTl = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=450%",
                pin: stage,
                pinSpacing: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            scrollTriggerInstanceRef.current = mobileTl.scrollTrigger || null;

            mobileTl.fromTo(
              heroContent,
              { scale: 1, opacity: 1, y: 0 },
              { scale: 0.94, opacity: 0, y: -20, duration: 0.8, ease: "power2.out" },
              0.0
            );

            mobileTl.fromTo(
              archLayer,
              { yPercent: 100 },
              { yPercent: 0, duration: 1.4, ease: "power2.out" },
              0.3
            );

            if (archContent) {
              mobileTl.fromTo(
                archContent,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
                0.8
              );
              mobileTl.to(
                archContent,
                { opacity: 0, y: -15, duration: 0.4, ease: "power2.in" },
                2.4
              );
            }

            // Mobile vanilla dome expansion
            mobileTl.fromTo(
              archDomeWrapper,
              { scale: 1, yPercent: 0 },
              { scale: 3.0, yPercent: -35, duration: 1.0, ease: "power2.inOut" },
              2.5
            );

            mobileTl.fromTo(
              showcaseLayer,
              { opacity: 0 },
              { opacity: 1, pointerEvents: "auto", duration: 0.3 },
              3.3
            );

            // Continuous mobile track glide
            mobileTl.fromTo(
              track,
              { xPercent: 0 },
              { xPercent: -80, duration: 4.0, ease: "none" },
              3.6
            );

            mobileTl.to({}, { duration: 0.6 }, 7.6);
          }
        }
      );

      return () => {
        scrollTriggerInstanceRef.current = null;
      };
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const scrollToExplore = () => {
    const st = scrollTriggerInstanceRef.current;
    if (st) {
      // Scroll directly to the Arch Dome centerpiece (time 2.5 / 12.2 = 0.205)
      const targetScroll = st.start + 0.21 * (st.end - st.start);
      scrollToY(targetScroll);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#081a1a] text-[#EDE5DA]"
      aria-label="Amenities Hero & Signature Environments Showcase"
    >
      {/* Pinned 100dvh Viewport Stage */}
      <div
        ref={stageRef}
        className="relative w-full h-[100dvh] overflow-hidden will-change-transform"
      >
        {/* ========================================================================= */}
        {/* LAYER 0: HERO SECTION (HEADING ONLY, EDITORIAL MINIMALISM)                */}
        {/* ========================================================================= */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 lg:px-16 pt-16 sm:pt-20 bg-[#153D3D] text-[#EDE5DA] overflow-hidden"
        >
          {/* Ambient background glow vignette */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#62AA9E]/10 rounded-full blur-[260px] pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div
            ref={heroContentRef}
            className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 will-change-transform"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#EDE5DA]/15 bg-[#081a1a]/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#62AA9E]" />
              <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.25em] text-[#EDE5DA]/90 font-medium">
                The Orion One Experience
              </span>
            </div>

            <h1 className="type-display font-serif-heading font-luxia-display text-3xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-[#EDE5DA] leading-[1.12]">
              <span className="block">Designed Around</span>
              <span className="type-display-accent block font-normal text-sand-gradient">
                How You Live
              </span>
            </h1>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light leading-relaxed max-w-2xl mx-auto">
              A considered collection of amenities for fitness, wellness, recreation, convenience, and everyday living.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto">
              <button
                type="button"
                onClick={scrollToExplore}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#62AA9E]/20 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              {onOpenInquiry && (
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] hover:border-[#62AA9E]/50 border border-[#EDE5DA]/20 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-md uppercase cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Book a Private Tour</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 1: RISING CIRCULAR ARCH DOME WITH EDITORIAL CENTERPIECE              */}
        {/* (Smoothly rises, holds, then expands to fill the entire screen with vanilla) */}
        {/* ========================================================================= */}
        <div
          ref={archLayerRef}
          className="absolute inset-0 z-20 w-full h-full overflow-hidden will-change-transform flex flex-col justify-end items-center pointer-events-none"
        >
          {/* Semicircular Arch Dome SVG & Solid Warm Sand (#EDE5DA) Canvas */}
          <div
            ref={archDomeWrapperRef}
            className="relative w-full h-full flex flex-col items-center justify-center will-change-transform"
          >
            {/* Desktop SVG Arch Dome Fill */}
            <div className="hidden lg:block absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              <svg
                viewBox="0 0 1600 1000"
                preserveAspectRatio="xMidYEnd meet"
                className="w-full h-full overflow-visible"
              >
                {/* Solid Arch Dome Fill (Warm Sand / Vanilla: #EDE5DA) */}
                <path
                  d="M 140,720 A 660,660 0 0,1 1460,720 L 1460,1000 L 140,1000 Z"
                  fill="#EDE5DA"
                  stroke="rgba(21, 61, 61, 0.14)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Mobile / Tablet SVG Arch Dome Fill */}
            <div className="block lg:hidden absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              <svg
                viewBox="0 0 420 560"
                preserveAspectRatio="xMidYEnd meet"
                className="w-full h-full overflow-visible"
              >
                <path
                  d="M 15,300 A 195,195 0 0,1 405,300 L 405,560 L 15,560 Z"
                  fill="#EDE5DA"
                  stroke="rgba(21, 61, 61, 0.14)"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Center Editorial Centerpiece inside Arch Dome */}
            <div
              ref={archContentRef}
              className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center text-[#153D3D] will-change-transform"
            >
              {/* Main Heading */}
              <h2 className="font-serif-heading font-luxia-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#153D3D] leading-[1.08] tracking-tight">
                Signature Environments
              </h2>

              {/* Subtitle */}
              <p className="font-serif-heading italic text-base sm:text-xl lg:text-2xl text-[#0D2828]/85 mt-2 sm:mt-3">
                A Complete Everyday Experience
              </p>

              {/* Architectural sun & horizon crest icon */}
              <div className="my-4 sm:my-5 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-[#153D3D]/20 bg-[#EDE5DA]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[#153D3D]"
                >
                  <circle cx="12" cy="12" r="5" strokeDasharray="1 1.5" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
                  <path d="m4.93 4.93 2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" strokeLinecap="round" />
                </svg>
              </div>

              {/* Description from Amenities specification */}
              <p className="font-sans-body text-xs sm:text-sm lg:text-base text-[#153D3D]/85 font-light leading-relaxed max-w-lg">
                Orion One brings essential lifestyle facilities together within the development, giving residents spaces to stay active, relax, connect, and enjoy everyday convenience.
              </p>

              {/* Location seal */}
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-sans-body uppercase tracking-[0.25em] text-[#153D3D]/65 font-medium mt-4 sm:mt-5">
                <span>Sector F · DHA Phase III</span>
                <span className="w-1 h-1 rounded-full bg-[#62AA9E]" />
                <span>Islamabad</span>
              </div>

              {/* Subtle Scroll Cue */}
              <div className="pt-6 sm:pt-8 flex flex-col items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#153D3D]/70 font-semibold">
                <span>Scroll to Explore</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#62AA9E]" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: HORIZONTAL EDITORIAL SHOWCASE TRACK                              */}
        {/* (Filled Vanilla Canvas, Monumental Typography, Pure Framed Photography)    */}
        {/* ========================================================================= */}
        <div
          ref={showcaseLayerRef}
          className="absolute inset-0 z-30 w-full h-full bg-[#EDE5DA] text-[#153D3D] overflow-hidden will-change-transform flex items-center"
        >
          {/* Subtle Architectural Blueprint Grid (Anchored behind the moving sheet) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] flex justify-between px-8 sm:px-16 lg:px-24"
            aria-hidden="true"
          >
            <div className="w-px h-full bg-[#153D3D]" />
            <div className="w-px h-full bg-[#153D3D]" />
            <div className="w-px h-full bg-[#153D3D]" />
          </div>

          {/* Horizontal Track Container */}
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: `${SIGNATURE_SLIDES.length * 100}vw` }}
          >
            {SIGNATURE_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                ref={(el) => {
                  slidesRef.current[idx] = el;
                }}
                className="w-screen h-full flex-shrink-0 relative flex items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-16 select-none"
              >
                {/* Inner Slide Stage Grid */}
                <div className="relative w-full max-w-7xl mx-auto h-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 xl:gap-14 px-6 sm:px-10 lg:px-14 xl:px-16 pt-20 sm:pt-24 pb-8 sm:pb-12">
                  {/* Left Column: Ordinal, Tag & Massive Editorial Serif Headline */}
                  <div className="w-full lg:w-[46%] xl:w-[44%] flex flex-col justify-center z-20 pr-0 lg:pr-4">
                    {/* Location & Ordinal Kicker */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
                      <span className="text-[10px] sm:text-xs font-sans-body uppercase tracking-[0.3em] font-semibold text-[#62AA9E]">
                        {slide.tag}
                      </span>
                      <span className="w-6 h-px bg-[#153D3D]/25" />
                      <span className="text-[10px] sm:text-xs font-sans-body uppercase tracking-[0.22em] text-[#153D3D]/60 font-medium">
                        {slide.location}
                      </span>
                    </div>

                    {/* Enormous Staggered Serif Typography (Era Style) */}
                    <h2 className="font-serif-heading font-luxia-display text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-[4.75rem] text-[#153D3D] leading-[0.96] tracking-tight">
                      <span className="block will-change-transform ml-0 lg:ml-1 whitespace-nowrap">
                        {slide.lines[0]}
                      </span>
                      <span className="block will-change-transform ml-2 sm:ml-6 lg:ml-10 text-[#0D2828] whitespace-nowrap">
                        {slide.lines[1]}
                      </span>
                      <span className="block will-change-transform ml-1 sm:ml-3 lg:ml-6 whitespace-nowrap">
                        {slide.lines[2]}
                      </span>
                    </h2>
                  </div>

                  {/* Right Column: Pure Framed Architectural Photo Card */}
                  <div className="w-full lg:w-[54%] xl:w-[56%] flex items-center justify-center lg:justify-end z-10">
                    <div
                      ref={(el) => {
                        cardsRef.current[idx] = el;
                      }}
                      className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] aspect-[16/10] max-h-[50vh] sm:max-h-[54vh] lg:max-h-[58vh] xl:max-h-[62vh] overflow-hidden rounded-xs border border-[#153D3D]/15 shadow-[0_20px_50px_rgba(21,61,61,0.18)] will-change-transform group"
                    >
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 640px"
                        priority={idx < 2}
                        className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                      />

                      {/* Subtle architectural gradient scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
