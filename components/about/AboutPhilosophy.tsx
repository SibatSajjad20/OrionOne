"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const thesesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const imageFrame = imageFrameRef.current;
    const thesesGrid = thesesGridRef.current;

    if (!section || !quote || !imageFrame || !thesesGrid) return;

    const ctx = gsap.context(() => {
      // Manifesto quote entrance
      gsap.fromTo(
        quote,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: quote,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Panoramic image frame entrance
      gsap.fromTo(
        imageFrame,
        { opacity: 0, scale: 0.97, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: imageFrame,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Staggered theses grid entrance
      const items = thesesGrid.querySelectorAll(".thesis-card");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: thesesGrid,
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
      id="philosophy"
      ref={sectionRef}
      className="relative py-16 sm:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden"
    >
      {/* Subtle ambient lighting vignette */}
      <div
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#62AA9E]/5 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* The Central Manifesto Spread */}
        <div ref={quoteRef} className="max-w-5xl mb-10 sm:mb-20">
          <blockquote className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl xl:text-[5rem] font-light text-[#EDE5DA] tracking-tight leading-[1.08]">
            &ldquo;We don&apos;t just build projects <br />
            <span className="italic font-normal text-sand-gradient">We create destinations&rdquo;</span>
          </blockquote>
        </div>

        {/* Cinematic Pure Borderless Panoramic Spread */}
        <div className="space-y-12 sm:space-y-16">
          <div
            ref={imageFrameRef}
            className="relative aspect-[16/10] sm:aspect-[21/8] w-full overflow-hidden rounded-xl bg-[#0d2828] border border-[#EDE5DA]/10 shadow-2xl"
          >
            <Image
              src="/images/about/orion-marble-wall.png"
              alt="Orion One Grand Entrance and Backlit Travertine Emblem"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-all duration-700 ease-out"
            />
          </div>

          {/* Architectural Theses Grid */}
          <div
            ref={thesesGridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-[#EDE5DA]/15 pt-12"
          >
            <div className="thesis-card space-y-3">
              <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
                Fluidity Over Rigidity
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Water has no sharp corners. The towers curve organically, channeling prevailing lake breezes and allowing natural morning and evening light to penetrate deep into every residence.
              </p>
            </div>

            <div className="thesis-card space-y-3">
              <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
                Integrated Functionality
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Residential quiet sits effortlessly above a vibrant waterfront promenade and culinary arcade, connected by landscaped trails and water features rather than commercial barriers.
              </p>
            </div>

            <div className="thesis-card space-y-3">
              <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
                Generational Longevity
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Situated on a finite shoreline in DHA Phase III Islamabad, Orion One is engineered with honest structural materials designed to age with dignity over the next century.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
