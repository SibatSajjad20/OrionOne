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
    image: "/images/amenities/lake-facing-infinity-pool.png",
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
  const firstSlideTextRef = useRef<HTMLDivElement>(null);
  const firstSlideCardRef = useRef<HTMLDivElement>(null);
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
    const firstSlideText = firstSlideTextRef.current;
    const firstSlideCard = firstSlideCardRef.current;

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
          gsap.set(archLayer, { clearProps: "transform" });
          gsap.set(archLayer, { yPercent: 100, y: 0, opacity: 1, pointerEvents: "auto", display: "flex" });
          gsap.set(archDomeWrapper, { scale: 1, yPercent: 0, transformOrigin: "center 70%" });
          gsap.set(showcaseLayer, { opacity: 0, pointerEvents: "none" });
          if (firstSlideText) gsap.set(firstSlideText, { opacity: 0, y: 35 });
          if (firstSlideCard) gsap.set(firstSlideCard, { opacity: 0, scale: 0.94 });
          gsap.set(track, { xPercent: 0 });

          if (isDesktop) {
            // =========================================================================
            // DESKTOP: HERO -> OVAL ARCH RISE & HOLD -> SMOOTH FULL-SCREEN EXPANSION -> FIRST CARD REVEAL -> HORIZONTAL GLIDE
            // Quick, responsive transitions - in one fluid scroll motion the arch fills the screen and Slide 01 appears!
            // Total timeline duration: 7.6 units
            // =========================================================================
            const masterTl = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=380%",
                pin: stage,
                pinSpacing: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            scrollTriggerInstanceRef.current = masterTl.scrollTrigger || null;

            // 0.0 -> 0.8: Hero content fades & recedes
            masterTl.fromTo(
              heroContent,
              { scale: 1, opacity: 1, y: 0 },
              {
                scale: 0.94,
                opacity: 0,
                y: -30,
                duration: 0.8,
                ease: "power2.out",
              },
              0.0
            );

            // 0.2 -> 1.0: Oval Arch rises up smoothly from bottom
            masterTl.fromTo(
              archLayer,
              { yPercent: 100, y: 0 },
              {
                yPercent: 0,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
              },
              0.2
            );

            // 0.5 -> 1.0: Editorial centerpiece inside Oval Arch fades and slides up
            if (archContent) {
              masterTl.fromTo(
                archContent,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                0.5
              );
            }

            // 1.0 -> 1.4: Brief natural pause so "Signature Environments" is clearly viewed
            masterTl.to({}, { duration: 0.4 }, 1.0);

            // 1.4 -> 1.8: Editorial centerpiece inside Oval Arch fades out as shape begins expanding
            if (archContent) {
              masterTl.to(
                archContent,
                { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" },
                1.4
              );
            }

            // 1.4 -> 2.2: SIGNATURE ENVIRONMENTS SHAPE SMOOTHLY EXPANDS AND FILLS THE ENTIRE SCREEN
            masterTl.fromTo(
              archDomeWrapper,
              { scale: 1 },
              {
                scale: 3.8,
                duration: 0.8,
                ease: "power2.inOut",
              },
              1.4
            );

            // 1.8 -> 2.2: Showcase canvas seamlessly emerges as the arch shape reaches full screen
            masterTl.fromTo(
              showcaseLayer,
              { opacity: 0 },
              {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.4,
                ease: "power2.out",
              },
              1.8
            );

            // 2.2 -> 2.8: TEXT AND IMAGE OF FIRST CARD ("Lake-Facing Infinity Pool") SMOOTHLY APPEAR
            if (firstSlideText) {
              masterTl.fromTo(
                firstSlideText,
                { opacity: 0, y: 35 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                2.2
              );
            }
            if (firstSlideCard) {
              masterTl.fromTo(
                firstSlideCard,
                { opacity: 0, scale: 0.94 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
                2.2
              );
            }

            // 2.8 -> 3.2: Short natural reading pause on Slide 01
            masterTl.to({}, { duration: 0.4 }, 2.8);

            // 3.2 -> 7.2: CONTINUOUS BUTTER-SMOOTH HORIZONTAL GLIDE across remaining slides
            masterTl.fromTo(
              track,
              { xPercent: 0 },
              {
                xPercent: -80,
                duration: 4.0,
                ease: "none",
              },
              3.2
            );

            // 7.2 -> 7.6: Brief resting buffer on Concierge before unpinning into Amenities Index
            masterTl.to({}, { duration: 0.4 }, 7.2);
          } else {
            // =========================================================================
            // MOBILE / TABLET: TOUCH-ADAPTED PINNED JOURNEY WITH QUICK SEAMLESS FLOW
            // =========================================================================
            const mobileTl = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=360%",
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
              { scale: 0.94, opacity: 0, y: -20, duration: 0.7, ease: "power2.out" },
              0.0
            );

            mobileTl.fromTo(
              archLayer,
              { yPercent: 100, y: 0 },
              { yPercent: 0, y: 0, duration: 0.7, ease: "power2.out" },
              0.2
            );

            if (archContent) {
              mobileTl.fromTo(
                archContent,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                0.5
              );
            }

            // Mobile brief hold on Arch
            mobileTl.to({}, { duration: 0.3 }, 0.9);

            if (archContent) {
              mobileTl.to(
                archContent,
                { opacity: 0, y: -15, duration: 0.3, ease: "power2.in" },
                1.2
              );
            }

            // Mobile arch shape smoothly expands to fill screen
            mobileTl.fromTo(
              archDomeWrapper,
              { scale: 1 },
              { scale: 3.5, duration: 0.7, ease: "power2.inOut" },
              1.2
            );

            mobileTl.fromTo(
              showcaseLayer,
              { opacity: 0 },
              { opacity: 1, pointerEvents: "auto", duration: 0.3 },
              1.6
            );

            // First card text and image smoothly appear
            if (firstSlideText) {
              mobileTl.fromTo(
                firstSlideText,
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                1.9
              );
            }
            if (firstSlideCard) {
              mobileTl.fromTo(
                firstSlideCard,
                { opacity: 0, scale: 0.94 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
                1.9
              );
            }

            // Mobile brief hold on Slide 01
            mobileTl.to({}, { duration: 0.4 }, 2.4);

            // Continuous mobile track glide
            mobileTl.fromTo(
              track,
              { xPercent: 0 },
              { xPercent: -80, duration: 3.8, ease: "none" },
              2.8
            );

            mobileTl.to({}, { duration: 0.4 }, 6.6);
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
      // Scroll directly to the Arch Dome centerpiece (time 1.2 / 7.6 ≈ 0.16)
      const targetScroll = st.start + 0.16 * (st.end - st.start);
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
        {/* ========================================================================= */}
        <div
          ref={archLayerRef}
          className="absolute inset-0 z-20 w-full h-full overflow-hidden will-change-transform flex flex-col justify-end items-center pointer-events-none"
        >
          {/* Semicircular Arch Dome SVG & Deep Obsidian Moss Canvas */}
          <div
            ref={archDomeWrapperRef}
            className="relative w-full h-full flex flex-col items-center justify-center will-change-transform"
          >
            {/* Desktop SVG Arch Dome Fill - Matches exact oval arch portal geometry from Image 2 */}
            <div className="hidden lg:flex absolute inset-0 w-full h-full items-end justify-center overflow-visible pointer-events-none">
              <svg
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                className="w-full h-full max-w-[1240px]"
              >
                <defs>
                  {/* Subtle inner gradient for rich architectural depth in site dark palette */}
                  <linearGradient id="archFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#081a1a" stopOpacity="0.98" />
                    <stop offset="45%" stopColor="#0b2424" stopOpacity="0.99" />
                    <stop offset="100%" stopColor="#081a1a" stopOpacity="1" />
                  </linearGradient>
                  {/* Subtle champagne & emerald accent stroke */}
                  <linearGradient id="archStrokeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(237, 229, 218, 0.45)" />
                    <stop offset="50%" stopColor="rgba(98, 170, 158, 0.35)" />
                    <stop offset="100%" stopColor="rgba(237, 229, 218, 0.15)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 166,1000 L 166,750 A 334,625 0 0,1 834,750 L 834,1000 Z"
                  fill="url(#archFillGrad)"
                  stroke="url(#archStrokeGrad)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Mobile / Tablet SVG Arch Dome Fill */}
            <div className="flex lg:hidden absolute inset-0 w-full h-full items-end justify-center overflow-visible pointer-events-none">
              <svg
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="archFillGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#081a1a" stopOpacity="0.98" />
                    <stop offset="45%" stopColor="#0b2424" stopOpacity="0.99" />
                    <stop offset="100%" stopColor="#081a1a" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="archStrokeGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(237, 229, 218, 0.4)" />
                    <stop offset="50%" stopColor="rgba(98, 170, 158, 0.3)" />
                    <stop offset="100%" stopColor="rgba(237, 229, 218, 0.15)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 60,1000 L 60,670 A 440,550 0 0,1 940,670 L 940,1000 Z"
                  fill="url(#archFillGradMobile)"
                  stroke="url(#archStrokeGradMobile)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Ambient emerald backlight inside arch */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[#62AA9E]/10 rounded-full blur-[180px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Center Editorial Centerpiece inside Arch Dome */}
            <div
              ref={archContentRef}
              className="relative z-10 w-full max-w-xl mx-auto px-6 flex flex-col items-center text-center text-[#EDE5DA] pt-14 sm:pt-16 pb-4 will-change-transform"
            >
              {/* Main Heading */}
              <h2 className="font-serif-heading font-luxia-display text-4xl sm:text-6xl lg:text-7xl text-[#EDE5DA] leading-[1.02] tracking-tight">
                <span className="block">Signature</span>
                <span className="block italic font-normal text-sand-gradient">Environments</span>
              </h2>

              {/* Subtitle */}
              <p className="font-serif-heading italic text-base sm:text-xl lg:text-2xl text-[#C9BFB1] mt-2 sm:mt-3">
                A Complete Everyday Experience
              </p>

              {/* Architectural sun & horizon crest icon */}
              <div className="my-3 sm:my-4 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#EDE5DA]/20 bg-[#0d2828]/80 text-[#62AA9E] shadow-lg">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[#62AA9E]"
                >
                  <circle cx="12" cy="12" r="5" strokeDasharray="1 1.5" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
                  <path d="m4.93 4.93 2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" strokeLinecap="round" />
                </svg>
              </div>

              {/* Description from Amenities specification */}
              <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA]/85 font-light leading-relaxed max-w-md">
                Orion One brings essential lifestyle facilities together within the development, giving residents spaces to stay active, relax, connect, and enjoy everyday convenience.
              </p>

              {/* Location seal */}
              <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.25em] text-[#EDE5DA]/60 font-medium mt-3 sm:mt-4">
                <span>Sector F · DHA Phase III</span>
                <span className="w-1 h-1 rounded-full bg-[#62AA9E]" />
                <span>Islamabad</span>
              </div>

              {/* Subtle Scroll Cue */}
              <button
                type="button"
                onClick={() => {
                  const st = scrollTriggerInstanceRef.current;
                  if (st) {
                    const targetScroll = st.start + 0.36 * (st.end - st.start);
                    scrollToY(targetScroll);
                  }
                }}
                className="pt-5 sm:pt-6 flex flex-col items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#EDE5DA]/70 hover:text-[#EDE5DA] transition-colors font-semibold cursor-pointer"
              >
                <span>Scroll to Explore</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#62AA9E]" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: HORIZONTAL EDITORIAL SHOWCASE TRACK                              */}
        {/* (Architectural Photography & Monumental Typography on Dark Canvas)        */}
        {/* ========================================================================= */}
        <div
          ref={showcaseLayerRef}
          className="absolute inset-0 z-30 w-full h-full bg-[#081a1a] text-[#EDE5DA] overflow-hidden will-change-transform flex items-center"
        >
          {/* Subtle architectural gradient background matching arch interior */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#081a1a] via-[#0d2828] to-[#081a1a] pointer-events-none"
            aria-hidden="true"
          />

          {/* Ambient emerald backlight glow vignette */}
          <div
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#62AA9E]/10 rounded-full blur-[240px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Subtle Architectural Blueprint Grid (Anchored behind the moving sheet) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] flex justify-between px-8 sm:px-16 lg:px-24"
            aria-hidden="true"
          >
            <div className="w-px h-full bg-[#EDE5DA]" />
            <div className="w-px h-full bg-[#EDE5DA]" />
            <div className="w-px h-full bg-[#EDE5DA]" />
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
                  {/* Left Column: Massive Editorial Serif Headline & Narrative Description */}
                  <div
                    ref={idx === 0 ? firstSlideTextRef : undefined}
                    className="w-full lg:w-[48%] xl:w-[46%] flex flex-col justify-center z-20 pr-0 lg:pr-4"
                  >
                    {/* Enormous Staggered Serif Typography (Era Style) */}
                    <h2 className="font-serif-heading font-luxia-display text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-[4.75rem] text-[#EDE5DA] leading-[0.96] tracking-tight">
                      <span className="block will-change-transform ml-0 lg:ml-1 whitespace-nowrap">
                        {slide.lines[0]}
                      </span>
                      <span className="block will-change-transform ml-2 sm:ml-6 lg:ml-10 text-sand-gradient whitespace-nowrap">
                        {slide.lines[1]}
                      </span>
                      <span className="block will-change-transform ml-1 sm:ml-3 lg:ml-6 text-[#EDE5DA]/90 whitespace-nowrap">
                        {slide.lines[2]}
                      </span>
                    </h2>

                    {/* Description narrative */}
                    <p className="mt-4 sm:mt-6 font-sans-body text-xs sm:text-sm lg:text-base text-[#C9BFB1] font-light leading-relaxed max-w-lg">
                      {slide.description}
                    </p>
                  </div>

                  {/* Right Column: Pure Framed Architectural Photo Card */}
                  <div className="w-full lg:w-[52%] xl:w-[54%] flex items-center justify-center lg:justify-end z-10">
                    <div
                      ref={(el) => {
                        cardsRef.current[idx] = el;
                        if (idx === 0) firstSlideCardRef.current = el;
                      }}
                      className="relative w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[600px] xl:max-w-[660px] aspect-[16/10] max-h-[50vh] sm:max-h-[54vh] lg:max-h-[58vh] xl:max-h-[62vh] overflow-hidden rounded-xs border border-[#EDE5DA]/20 shadow-[0_25px_60px_rgba(0,0,0,0.5)] will-change-transform group"
                    >
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 660px"
                        priority={idx < 2}
                        className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                      />

                      {/* Subtle architectural gradient scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/50 via-transparent to-transparent pointer-events-none" />
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
