"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ADVANTAGES = [
  {
    number: "01",
    title: "Lakefront Setting",
    headline: "Distinctive Waterfront Position",
    description:
      "A finite shoreline location within Sector F of DHA Phase III, providing natural serenity, open water panoramas, and private pedestrian trails along the lake basin.",
  },
  {
    number: "02",
    title: "DHA Connectivity",
    headline: "Access to Major Boulevards",
    description:
      "Direct linkage to DHA Phase III main boulevards and adjacent sectors, facilitating uninterrupted access to commercial avenues, sports complexes, and civic clubs.",
  },
  {
    number: "03",
    title: "Everyday Facilities",
    headline: "Comprehensive Community Amenities",
    description:
      "Immediate proximity to established educational institutions, multi-specialty healthcare centers, retail arcades, and lakeside dining destinations.",
  },
  {
    number: "04",
    title: "Regional Access",
    headline: "Fast Metropolitan Transit",
    description:
      "Effortless connections to GT Road, Rawalpindi Ring Road, Islamabad Expressway, and Islamabad International Airport for regional and global commutes.",
  },
];

export default function LocationAdvantage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !header || !cardsContainer) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        header,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Cards entrance
      const cards = cardsContainer.querySelectorAll(".advantage-card");
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
            trigger: cardsContainer,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="advantage"
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="The Location Advantage"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/3 left-1/4 w-[750px] h-[750px] bg-[#62AA9E]/4 rounded-full blur-[240px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-4xl mb-14 sm:mb-20 space-y-4 will-change-transform">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#62AA9E]" />
            <span className="font-sans-body text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
              Strategic Superiority
            </span>
          </div>

          <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            The Location <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Advantage
            </span>
          </h2>

          <p className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA]/90 font-light leading-snug">
            Close to What Matters
          </p>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            A position at Orion One balances peaceful waterfront seclusion with effortless city connectivity, making daily life both relaxing and efficient.
          </p>
        </div>

        {/* 4 Architectural Advantage Items */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12 sm:gap-y-16 items-stretch"
        >
          {ADVANTAGES.map((adv) => (
            <div
              key={adv.number}
              className="advantage-card group border-t border-[#EDE5DA]/20 pt-6 sm:pt-8 flex flex-col justify-start transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#62AA9E] tracking-widest font-medium">
                  {adv.number}
                </span>
                <span className="font-mono text-[10px] text-[#C9BFB1]/60 uppercase tracking-widest">
                  {adv.title}
                </span>
              </div>

              <h3 className="font-serif-heading text-2xl sm:text-3xl font-light text-[#EDE5DA] tracking-tight mb-3 group-hover:text-[#62AA9E] transition-colors">
                {adv.headline}
              </h3>

              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
