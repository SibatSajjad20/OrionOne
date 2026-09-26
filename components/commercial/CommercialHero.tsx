"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { scrollToElement } from "@/lib/scrollTo";

interface CommercialHeroProps {
  onOpenInquiry?: () => void;
}

const SLIDES = [
  {
    src: "/images/commercial/slide-retail.jpg",
    alt: "Curated Retail Promenade and High-End Luxury Boutiques at Orion One",
  },
  {
    src: "/images/commercial/slide-podium.jpg",
    alt: "Orion One Lakefront Commercial Podium Architecture",
  },
  {
    src: "/images/commercial/slide-dining.jpg",
    alt: "Waterfront Dining Terraces along the Shoreline at Orion One",
  },
  {
    src: "/images/commercial/slide-aerial.jpg",
    alt: "Aerial Lakeview Commercial and Dancing Fountains",
  },
  {
    src: "/images/commercial/slide-deck.jpg",
    alt: "Open-Air Sunset Terraces Overlooking the Lake",
  },
];

export default function CommercialHero({ onOpenInquiry }: CommercialHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((curr) => {
      setPrevSlide(curr);
      return (curr + 1) % SLIDES.length;
    });
  }, []);

  // Continuous auto-advance with an unhurried, stately 4.8s cadence
  useEffect(() => {
    const interval = setInterval(nextSlide, 4800);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const scrollToSpaces = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("spaces");
    if (element) {
      scrollToElement(element);
    }
  };

  return (
    <section
      className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-end overflow-hidden bg-[#153D3D]"
      aria-label="Commercial Showcase Visual Hero"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS FULL-VIEWPORT CAROUSEL (Zero-Black-Flash Layered Crossfade)   */}
      {/* The incoming slide dissolves in on z-20 while the previous slide stays    */}
      {/* 100% visible on z-10 underneath, eliminating any dark background flash.   */}
      {/* Each active slide executes a smooth, subtle Ken Burns zoom (1.0 -> 1.06)  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {SLIDES.map((slide, idx) => {
          const isCurrent = idx === currentSlide;
          const isPrev = idx === prevSlide;

          let zIndexClass = "z-0";
          let opacityClass = "opacity-0";
          let animClass = "scale-100";

          if (isCurrent) {
            // Incoming slide dissolves in gracefully with an unhurried 1.8s crossfade
            zIndexClass = "z-20";
            opacityClass = "opacity-100 transition-opacity duration-[1800ms] ease-in-out";
            animClass = "animate-hero-kenburns";
          } else if (isPrev) {
            // Outgoing slide remains solidly visible at full opacity underneath during dissolve
            zIndexClass = "z-10";
            opacityClass = "opacity-100";
            animClass = "scale-106";
          }

          return (
            <div
              key={slide.src}
              className={`absolute inset-0 w-full h-full ${zIndexClass} ${opacityClass}`}
            >
              <div className={`w-full h-full ${animClass}`}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. ARCHITECTURAL MULTI-STOP GRADIENT SCRIM (Legibility & Seamless Flow)   */}
      {/* ========================================================================= */}
      {/* Top Scrim for Fixed Header */}
      <div
        className="absolute top-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-[#081a1a]/90 via-[#081a1a]/40 to-transparent pointer-events-none z-30"
        aria-hidden="true"
      />

      {/* Primary Backdrop Scrim: Lateral & Bottom darkening for crisp typography */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#153D3D] via-[#0d2828]/80 via-40% to-transparent pointer-events-none z-30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#081a1a]/85 via-[#081a1a]/40 sm:via-[#081a1a]/20 to-transparent pointer-events-none z-30"
        aria-hidden="true"
      />

      {/* Subtle brand ambient mint glow behind heading */}
      <div
        className="absolute bottom-1/3 left-10 sm:left-24 w-[400px] sm:w-[700px] h-[350px] bg-[#62AA9E]/10 rounded-full blur-[140px] pointer-events-none z-30"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 3. EDITORIAL DISPLAY CANOPY (Positioned atop Full-Bleed Showcase)         */}
      {/* ========================================================================= */}
      <div className="relative z-40 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 lg:pb-28">
        <div className="max-w-4xl">
          {/* Hero Headline */}
          <h1 className="font-serif-heading text-3xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-light text-[#EDE5DA] tracking-tight leading-[0.98] uppercase">
            Where Business <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Meets Destination Living
            </span>
          </h1>

          {/* Sensory Subtitle */}
          <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#EDE5DA]/85 font-light leading-relaxed max-w-2xl pt-5 sm:pt-6">
            Commercial spaces for brands, businesses, and entrepreneurs looking for a distinctive address at Orion One.
          </p>

          {/* Action Controls */}
          <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <a
              href="#spaces"
              onClick={scrollToSpaces}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#62AA9E]/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Commercial</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] hover:border-[#62AA9E]/50 border border-[#EDE5DA]/20 px-7 py-3.5 rounded-full transition-all duration-300 backdrop-blur-md shadow-md uppercase cursor-pointer hover:-translate-y-0.5"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
