"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { scrollToElement } from "@/lib/scrollTo";

interface LocationHeroProps {
  onOpenInquiry?: () => void;
}

export default function LocationHero({ onOpenInquiry }: LocationHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const imgContainer = imageContainerRef.current;

    if (!container || !leftCol || !imgContainer) return;

    const ctx = gsap.context(() => {
      // Smooth initial mount entrance
      gsap.fromTo(
        leftCol,
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        imgContainer,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const scrollToAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("address");
    if (element) {
      scrollToElement(element);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#0F3D3C] text-[#EDE5DA] overflow-hidden flex items-center pt-28 sm:pt-32 lg:pt-0"
      aria-label="Location Architectural Showcase"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-HEIGHT IMAGERY: Bleeds to the right edge and bottom of viewport   */}
      {/* ========================================================================= */}
      <div
        ref={imageContainerRef}
        className="absolute inset-y-0 right-0 w-full lg:w-[65%] xl:w-[70%] h-full pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/location/lakeview-commercial-aerial.jpg"
            alt="Aerial Perspective of Sector F Lakefront Core and Lakeview Commercial in DHA Phase III"
            fill
            priority
            quality={92}
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="object-cover object-center lg:object-[center_60%]"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DIRECTIONAL ATMOSPHERIC SHADOW: Fading into #0F3D3C behind left text   */}
      {/* ========================================================================= */}
      {/* Desktop Horizontal Directional Shadow */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, #0F3D3C 0%, #0F3D3C 30%, rgba(15, 61, 60, 0.95) 42%, rgba(15, 61, 60, 0.72) 55%, rgba(15, 61, 60, 0.3) 70%, rgba(15, 61, 60, 0.05) 84%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Mobile/Tablet Vertical Directional Shadow */}
      <div
        className="block lg:hidden absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(180deg, #0F3D3C 0%, #0F3D3C 46%, rgba(15, 61, 60, 0.88) 66%, rgba(15, 61, 60, 0.3) 85%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Seamless Header Top Vignette */}
      <div
        className="absolute top-0 inset-x-0 h-36 pointer-events-none z-10 bg-gradient-to-b from-[#0F3D3C]/95 via-[#0F3D3C]/45 to-transparent"
        aria-hidden="true"
      />

      {/* Seamless Bottom Vignette */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-10 bg-gradient-to-t from-[#0F3D3C]/90 via-[#0F3D3C]/35 to-transparent"
        aria-hidden="true"
      />

      {/* Ambient atmospheric glow behind text */}
      <div
        className="absolute top-1/3 left-6 sm:left-16 w-[700px] h-[550px] bg-[#62AA9E]/10 rounded-full blur-[220px] pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT (Left Column): Clean, prominent editorial typography     */}
      {/* ========================================================================= */}
      <div
        ref={leftColRef}
        className="relative z-20 max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-20"
      >
        <div className="max-w-2xl lg:max-w-3xl space-y-7 sm:space-y-8">
          <h1 className="font-serif-heading text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-light text-[#EDE5DA] tracking-tight leading-[0.94] uppercase">
            At the Heart <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              of DHA Phase III
            </span>
          </h1>

          <p className="font-sans-body text-base sm:text-lg lg:text-xl text-[#EDE5DA]/85 font-light leading-relaxed max-w-xl">
            Orion One brings lakefront living, contemporary architecture, and everyday connectivity together within DHA Phase III.
          </p>

          {/* Direct Action Controls */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <a
              href="#address"
              onClick={scrollToAddress}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#62AA9E]/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore the Location</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            {onOpenInquiry && (
              <button
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
    </section>
  );
}
