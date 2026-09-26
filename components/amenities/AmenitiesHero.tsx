"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { scrollToElement } from "@/lib/scrollTo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AmenitiesHeroProps {
  onOpenInquiry?: () => void;
}

export default function AmenitiesHero({ onOpenInquiry }: AmenitiesHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textWrap = textWrapRef.current;
    if (!textWrap) return;

    const ctx = gsap.context(() => {
      // 1. Initial stately entrance for headline and text
      gsap.fromTo(
        textWrap,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("horizontal-showcase");
    if (el) {
      scrollToElement(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] flex flex-col justify-center items-center pt-36 sm:pt-44 lg:pt-48 pb-20 sm:pb-28 overflow-hidden bg-[#153D3D] text-[#EDE5DA]"
      aria-label="Amenities Hero"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#62AA9E]/10 rounded-full blur-[260px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* Editorial Headline & Narrative Block */}
        <div ref={textWrapRef} className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h1 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-light text-[#EDE5DA] tracking-tight leading-[1.02] uppercase">
            Designed Around <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              How You Live
            </span>
          </h1>

          <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light leading-relaxed max-w-2xl mx-auto">
            A considered collection of amenities for fitness, wellness, recreation, convenience, and everyday living.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="#horizontal-showcase"
              onClick={scrollToExplore}
              className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#62AA9E]/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] hover:border-[#62AA9E]/50 border border-[#EDE5DA]/20 px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-md uppercase cursor-pointer hover:-translate-y-0.5"
            >
              <span>Book a Private Tour</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
