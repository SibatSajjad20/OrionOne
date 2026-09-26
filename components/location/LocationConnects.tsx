"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Dimension {
  category: string;
  headline: string;
  description: string;
}

const DIMENSIONS: Dimension[] = [
  {
    category: "Home",
    headline: "Lakefront Residences",
    description: "A distinctive waterfront position within DHA Phase III, oriented around open horizons and serene waters.",
  },
  {
    category: "Business",
    headline: "Commercial Spaces",
    description: "Commercial spaces positioned within a growing mixed-use environment, backed by captive resident footfall.",
  },
  {
    category: "Leisure",
    headline: "Everyday Recreation",
    description: "Dining, recreation, parks, and community destinations nearby, bringing active leisure steps from your door.",
  },
  {
    category: "Connectivity",
    headline: "Regional Networks",
    description: "Direct road networks connecting DHA Phase III with Islamabad, Rawalpindi, and the international airport.",
  },
];

export default function LocationConnects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const matrix = matrixRef.current;
    if (!section || !header || !matrix) return;

    const ctx = gsap.context(() => {
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

      const items = matrix.querySelectorAll(".dimension-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: matrix,
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
      id="location-connects"
      ref={sectionRef}
      className="relative py-16 sm:py-36 bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="Location That Connects"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 right-1/3 w-[800px] h-[800px] bg-[#62AA9E]/4 rounded-full blur-[260px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 space-y-10 sm:space-y-20">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl space-y-4 will-change-transform">
          <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Location That <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Connects
            </span>
          </h2>

          <p className="font-serif-heading text-lg sm:text-2xl text-[#EDE5DA]/90 font-light leading-snug">
            Residential · Commercial · Lifestyle
          </p>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
            Orion One&apos;s location supports more than residential living. It weaves together home, business, leisure, and regional access into an enduring waterfront address.
          </p>
        </div>

        {/* 4-Part Architectural Blueprint Matrix */}
        <div
          ref={matrixRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-8 sm:pt-14 border-t border-[#EDE5DA]/15 will-change-transform"
        >
          {DIMENSIONS.map((dim) => (
            <div key={dim.category} className="dimension-item">
              <div className="space-y-2 sm:space-y-4">
                <h3 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-light text-[#EDE5DA] tracking-tight leading-[1.1]">
                  {dim.category}
                </h3>
                <span className="font-sans-body text-base sm:text-lg text-[#EDE5DA]/90 font-medium block leading-snug">
                  {dim.headline}
                </span>
                <p className="font-sans-body text-sm sm:text-base lg:text-[17px] text-[#C9BFB1] font-light leading-relaxed">
                  {dim.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
