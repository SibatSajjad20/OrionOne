"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LocationAddress() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;
    const narrative = narrativeRef.current;
    if (!section || !imageEl || !narrative) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageEl,
        { opacity: 0, x: -35, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageEl,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        narrative,
        { opacity: 0, x: 35 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: narrative,
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
      id="address"
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="A Lakefront Address"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/3 w-[700px] h-[700px] bg-[#62AA9E]/4 rounded-full blur-[240px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Pure Architectural Landscape Photo */}
          <div ref={imageRef} className="lg:col-span-6 will-change-transform">
            <div className="relative rounded-3xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-2xl group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="/images/location/lakefront-shoreline.jpg"
                  alt="Lakefront Shoreline and Natural Waterfront Setting at Orion One"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center scale-100 transition-transform duration-[3000ms] group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Narrative */}
          <div ref={narrativeRef} className="lg:col-span-6 space-y-6 will-change-transform">
            <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
              A Lakefront <br />
              <span className="italic font-normal text-sand-gradient normal-case">
                Address
              </span>
            </h2>

            <p className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA]/90 font-light leading-snug">
              Positioned Beside the Lakeview Commercial Area
            </p>

            <div className="space-y-4 font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
              <p>
                Located in Sector F of DHA Phase III, Orion One sits beside Lakeview Commercial, surrounded by natural beauty and modern infrastructure.
              </p>
              <p>
                The development places residents and businesses within a connected environment shaped around waterfront living, commercial activity, leisure, and everyday convenience.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EDE5DA]/10">
              <p className="font-editorial-quote text-lg text-[#62AA9E] italic">
                &ldquo;Where water creates a natural connection between home, leisure, and commerce.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
