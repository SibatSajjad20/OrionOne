"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AmenitiesCtaBannerProps {
  onOpenInquiry?: () => void;
}

export default function AmenitiesCtaBanner({ onOpenInquiry }: AmenitiesCtaBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden">
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#62AA9E]/6 rounded-full blur-[200px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 text-center space-y-8 will-change-transform"
      >
        <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] leading-[1.08] uppercase max-w-4xl mx-auto">
          Everything You Need <br />
          <span className="italic font-normal text-sand-gradient normal-case">
            Within Reach
          </span>
        </h2>

        <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light max-w-2xl mx-auto leading-relaxed pt-2">
          A thoughtfully planned amenity experience designed to support the way you live every day.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto">
          <Link
            href="/residence"
            data-magnetic
            data-magnetic-strength="16"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.75,0,0.25,1)] shadow-xl hover:shadow-[#62AA9E]/20 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Residences</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {onOpenInquiry && (
            <button
              type="button"
              onClick={onOpenInquiry}
              data-magnetic
              data-magnetic-strength="16"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] hover:border-[#62AA9E]/50 border border-[#EDE5DA]/20 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.75,0,0.25,1)] backdrop-blur-md shadow-md cursor-pointer hover:-translate-y-0.5"
            >
              <span>Book a Private Tour</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
            </button>
          )}
        </div>

        <div className="pt-10 border-t border-[#EDE5DA]/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#808080] font-sans-body">
          <span>Show Suite Open Daily · 10AM – 7PM</span>
          <span className="hidden sm:inline">·</span>
          <span>4th Floor, District 101, Bahria Town (Phase VIII), Islamabad</span>
          <span className="hidden sm:inline">·</span>
          <span>+92 300 9079 164</span>
        </div>
      </div>
    </section>
  );
}
