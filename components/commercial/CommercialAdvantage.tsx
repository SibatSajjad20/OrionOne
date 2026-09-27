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
    title: "Premium Visibility",
    headline: "Distinctive Architectural Landmark",
    description:
      "Commercial spaces engineered with prominent frontage along the main sector boulevard and lakefront promenade, ensuring continuous visual prominence from pedestrian and vehicular approaches.",
  },
  {
    number: "02",
    title: "Built-in Community",
    headline: "Immediate Captive Resident Base",
    description:
      "An integrated residential population of luxury apartments and penthouses right above provides an affluent, discerning customer ecosystem for daily dining, retail, and lifestyle services.",
  },
  {
    number: "03",
    title: "Ground & First Floor",
    headline: "Dedicated Multi-Level Commercial Zone",
    description:
      "Purpose-built commercial podium across ground and first floors, offering double-height ceiling volumes, generous frontage, and intuitive pedestrian circulation separated from residential lobbies.",
  },
  {
    number: "04",
    title: "Waterfront Dining",
    headline: "Lake-Facing Alfresco Terraces",
    description:
      "Open-air dining decks directly fronting the lake and dancing fountains, creating an atmospheric culinary destination that naturally draws patrons from across Islamabad and Rawalpindi.",
  },
];

export default function CommercialAdvantage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

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
          clearProps: "all",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Advantage items staggered entrance
      const items = grid.querySelectorAll(".advantage-card");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: grid,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden"
    >
      {/* Ambient glow vignette */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#62AA9E]/4 rounded-full blur-[200px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-4xl mb-12 sm:mb-20 space-y-4">
          <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Designed For <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Visibility & Activity
            </span>
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            The commercial proposition at Orion One unites high footfall, architectural distinction, and built-in demand to secure long-term business vitality.
          </p>
        </div>

        {/* 4 Architectural Advantage Items */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12 sm:gap-y-16"
        >
          {ADVANTAGES.map((adv) => (
            <div
              key={adv.number}
              className="advantage-card group border-t border-[#EDE5DA]/20 pt-6 sm:pt-8 flex flex-col justify-start transition-colors duration-300"
            >
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
