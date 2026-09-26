"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LakesideWellnessProps {
  onOpenInquiry?: () => void;
}

export default function LakesideWellness({ onOpenInquiry }: LakesideWellnessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsWrap = cardsWrapRef.current;
    if (!section || !cardsWrap) return;

    const ctx = gsap.context(() => {
      const cards = cardsWrap.querySelectorAll(".wellness-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsWrap,
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
      id="wellness"
      ref={sectionRef}
      className="relative py-16 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="Wellness by the Water"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/4 w-[700px] h-[700px] bg-[#62AA9E]/5 rounded-full blur-[220px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-4xl mb-12 sm:mb-16 space-y-4">
          <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Wellness by the <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Water
            </span>
          </h2>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            The waterfront connects naturally with Orion One&apos;s broader wellness experience. Residents can combine outdoor movement along the promenade with dedicated fitness, wellness, and recovery facilities within the development.
          </p>
        </div>

        {/* Dual Architectural Wellness Showcase */}
        <div
          ref={cardsWrapRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-12 sm:mb-16 items-stretch"
        >
          {/* Item 1: Infinity Pool */}
          <div className="wellness-card flex flex-col justify-start group">
            {/* Pure Architectural Photo */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#081a1a] border border-[#EDE5DA]/10 shrink-0">
              <Image
                src="/images/lakeside/wellness-infinity.jpg"
                alt="Waterfront Infinity Pool Overlooking the Lake"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-[3000ms] group-hover:scale-105"
              />
            </div>

            {/* Typography */}
            <div className="pt-6 space-y-3 flex-1 flex flex-col justify-start border-t border-[#EDE5DA]/15 mt-6">
              <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light leading-snug group-hover:text-[#62AA9E] transition-colors">
                Lake-Facing Infinity Pool
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Positioned high above the promenade, the cantilevered infinity pool visually merges with the lake basin below, creating a quiet space for early laps and sunset floating.
              </p>
            </div>
          </div>

          {/* Item 2: Dedicated Fitness Pavilion */}
          <div className="wellness-card flex flex-col justify-start group">
            {/* Pure Architectural Photo */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#081a1a] border border-[#EDE5DA]/10 shrink-0">
              <Image
                src="/images/lakeside/wellness-gym.jpg"
                alt="Double-Height Panoramic Gym Overlooking the Lake"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-[3000ms] group-hover:scale-105"
              />
            </div>

            {/* Typography */}
            <div className="pt-6 space-y-3 flex-1 flex flex-col justify-start border-t border-[#EDE5DA]/15 mt-6">
              <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light leading-snug group-hover:text-[#62AA9E] transition-colors">
                Double-Height Fitness Center
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Glazed architectural facades frame open views of the water while you train, offering private cardio zones, strength conditioning, steam, and sauna suites.
              </p>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#EDE5DA]/10">
          <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light max-w-xl">
            Wellness facilities at Orion One are reserved for residential owners and private members, creating an unhurried, private environment.
          </p>

          <Link
            href="/amenities"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-8 py-4 rounded-full transition-all duration-300 shadow-md cursor-pointer shrink-0"
          >
            <span>Explore Amenities</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
