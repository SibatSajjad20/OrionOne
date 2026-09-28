"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

interface AboutHeroProps {
  onOpenInquiry?: () => void;
}

export default function AboutHero({ onOpenInquiry: _onOpenInquiry }: AboutHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canopyRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canopy = canopyRef.current;
    const narrative = narrativeRef.current;
    const ledger = ledgerRef.current;
    const imageFrame = imageFrameRef.current;

    if (!container || !canopy || !narrative || !ledger || !imageFrame) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        canopy,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, clearProps: "all" }
      )
        .fromTo(
          narrative,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, clearProps: "all" },
          "-=0.7"
        )
        .fromTo(
          imageFrame,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, clearProps: "all" },
          "-=0.7"
        );

      const ledgerItems = ledger.querySelectorAll(".ledger-row");
      if (ledgerItems.length > 0) {
        tl.fromTo(
          ledgerItems,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, clearProps: "all" },
          "-=0.8"
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-28 sm:pt-36 pb-20 sm:pb-32 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* Subtle ambient lighting vignette */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] bg-[#62AA9E]/6 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Hero Architectural Spread: Canopy, Narrative & Signage Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-12 sm:pb-16">
        {/* Left Column: Display Canopy & Lead Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div ref={canopyRef}>
            <h1 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-light text-[#EDE5DA] tracking-[0.02em] leading-[1.18] transform-gpu backface-hidden">
              <span className="block">Experience shaped us.</span>
              <span className="block">Vision drives us.</span>
              <span className="block">Execution defines us.</span>
            </h1>
          </div>

          <div
            ref={narrativeRef}
            className="space-y-4 text-[#EDE5DA]/85 font-sans-body text-base sm:text-lg font-light leading-relaxed max-w-2xl pt-2"
          >
            <p>
              Orion One is a signature lakefront development conceived by <span className="text-[#EDE5DA] font-medium">SP Builders</span>, a multidisciplinary firm specializing in construction, structural consultancy, and landmark real estate.
            </p>
          </div>
        </div>

        {/* Right Column: Hero Architectural Signage Image */}
        <div ref={imageFrameRef} className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#0d2828] border border-[#EDE5DA]/15 shadow-2xl">
            <Image
              src="/images/about/sp-builders-facade.png"
              alt="SP Builders Architectural Signage and Headquarters"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-all duration-700 ease-out"
            />
          </div>
        </div>
      </div>

      {/* Architectural Pedigree Ledger Spread */}
      <div className="border-t border-[#EDE5DA]/15 pt-10 sm:pt-14 space-y-8">
        <div ref={ledgerRef} className="border-t border-[#EDE5DA]/15 divide-y divide-[#EDE5DA]/10">
          <div className="ledger-row py-6 grid grid-cols-12 gap-4 items-baseline">
            <span className="col-span-2 sm:col-span-1 font-sans-body text-xs text-[#62AA9E] font-medium tracking-wider">
              01
            </span>
            <div className="col-span-10 sm:col-span-4">
              <h2 className="font-sans-body text-sm sm:text-[15px] font-semibold uppercase tracking-wider text-[#EDE5DA]">
                Engineering Lifecycle
              </h2>
            </div>
            <p className="col-span-12 sm:col-span-7 font-sans-body text-sm sm:text-[15px] text-[#C9BFB1] font-light leading-relaxed">
              From subterranean civil works to high rise structural envelope and luxury interior delivery.
            </p>
          </div>

          <div className="ledger-row py-6 grid grid-cols-12 gap-4 items-baseline">
            <span className="col-span-2 sm:col-span-1 font-sans-body text-xs text-[#62AA9E] font-medium tracking-wider">
              02
            </span>
            <div className="col-span-10 sm:col-span-4">
              <h2 className="font-sans-body text-sm sm:text-[15px] font-semibold uppercase tracking-wider text-[#EDE5DA]">
                Masterplanning Foresight
              </h2>
            </div>
            <p className="col-span-12 sm:col-span-7 font-sans-body text-sm sm:text-[15px] text-[#C9BFB1] font-light leading-relaxed">
              Precise urban integration balancing privacy, pedestrian promenade flow, and open horizons.
            </p>
          </div>

          <div className="ledger-row py-6 grid grid-cols-12 gap-4 items-baseline">
            <span className="col-span-2 sm:col-span-1 font-sans-body text-xs text-[#62AA9E] font-medium tracking-wider">
              03
            </span>
            <div className="col-span-10 sm:col-span-4">
              <h2 className="font-sans-body text-sm sm:text-[15px] font-semibold uppercase tracking-wider text-[#EDE5DA]">
                Shoreline Stewardship
              </h2>
            </div>
            <p className="col-span-12 sm:col-span-7 font-sans-body text-sm sm:text-[15px] text-[#C9BFB1] font-light leading-relaxed">
              A dedication to architectural quality on the most coveted water edge in Islamabad.
            </p>
          </div>
        </div>

        {/* Understated Editorial Anchor */}
        <div className="pt-2 flex items-center gap-6">
          <a
            href="#philosophy"
            className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#EDE5DA] hover:text-[#62AA9E] transition-colors"
          >
            <span>Explore The Design Philosophy</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#62AA9E] transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
