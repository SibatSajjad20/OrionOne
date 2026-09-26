"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LIFESTYLE_FACILITIES = [
  {
    title: "Infinity Pool",
    narrative:
      "A serene resort-style pool setting hovering directly above the lake waters, offering uninterrupted horizon views.",
  },
  {
    title: "Lakefront Promenade",
    narrative:
      "A landscaped waterside promenade connecting residents with morning jogs, scenic shoreline strolls, and evening breezes.",
  },
  {
    title: "Fitness & Elevated Tracks",
    narrative:
      "Double-height fitness facilities and indoor/outdoor jogging circuits integrated into the architectural podium.",
  },
  {
    title: "Spa, Steam & Sauna",
    narrative:
      "Dedicated wellness suites designed for physical recovery, mental decompression, and restorative balance.",
  },
  {
    title: "Social & Gathering Lounges",
    narrative:
      "Curated lakefront lounges and communal terraces designed for quiet reading, vibrant conversation, and shared moments.",
  },
];

export default function ResidenceLifestyle() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".lifestyle-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-32 lg:py-40 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-t border-[#EDE5DA]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-20">
        {/* Centered Heading in One Line & Centered Intro */}
        <div ref={headerRef} className="max-w-5xl mx-auto text-center mb-16 sm:mb-24">
          <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#EDE5DA] uppercase mb-6 leading-tight max-w-4xl mx-auto">
            Your home is part of something larger
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl mx-auto">
            At Orion One, residential living extends naturally into an
            ecosystem of wellness, recreation, dining, and shoreline calm,
            bringing resort ease into every day.
          </p>
        </div>

        {/* Minimalist Architectural Divider Layout (No AI-slop cards, no icons, no gradients) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-12 sm:gap-y-16"
        >
          {LIFESTYLE_FACILITIES.map((facility, index) => (
            <div
              key={index}
              className="lifestyle-item group border-t border-[#EDE5DA]/20 pt-6 sm:pt-8 flex flex-col justify-start transition-colors duration-300"
            >
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-light text-[#EDE5DA] tracking-tight mb-3 group-hover:text-[#62AA9E] transition-colors">
                {facility.title}
              </h3>

              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                {facility.narrative}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
