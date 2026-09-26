"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LakesideHeart() {
  const [activePerspective, setActivePerspective] = useState<"shoreline" | "elevation">("shoreline");
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const header = headerRef.current;
    if (!section || !frame || !header) return;

    const ctx = gsap.context(() => {
      // Header smooth fade and lift
      gsap.fromTo(
        header,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Frame smooth scale & entrance reveal
      gsap.fromTo(
        frame,
        { opacity: 0, scale: 0.96, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="heart-of-orion"
      ref={sectionRef}
      className="relative py-16 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="The Lake at the Heart of Orion One"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-[#62AA9E]/5 rounded-full blur-[220px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-4xl mb-10 sm:mb-14 space-y-4 sm:space-y-5">
          <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            The Lake at the Heart of <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Orion One
            </span>
          </h2>

          <p className="font-serif-heading text-lg sm:text-2xl lg:text-3xl text-[#EDE5DA]/90 font-light leading-snug">
            The lake is more than a view. It forms the setting for everyday experiences at Orion One
          </p>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            From morning walks to relaxed evenings, the waterfront creates a natural connection between residences, dining, leisure, and community.
          </p>
        </div>

        {/* Panoramic Exhibition Frame */}
        <div
          ref={frameRef}
          className="relative rounded-2xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-2xl"
        >
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden">
            <Image
              src="/images/lakeside/hero-lake.jpg"
              alt="Shoreline Lake Horizon at Orion One"
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-center scale-100 transition-transform duration-[3000ms] hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
