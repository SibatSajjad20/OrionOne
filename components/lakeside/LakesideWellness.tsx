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

interface WellnessFacility {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const WELLNESS_FACILITIES: WellnessFacility[] = [
  {
    id: "pool",
    title: "Lake-Facing Infinity Pool",
    description:
      "Positioned high above the promenade, the cantilevered infinity pool visually merges with the lake basin below, creating a quiet space for early laps and sunset floating.",
    image: "/images/lakeside/wellness-infinity.jpg",
    alt: "Waterfront Infinity Pool Overlooking the Lake",
  },
  {
    id: "gym",
    title: "Double-Height Fitness Center",
    description:
      "Glazed architectural facades frame open views of the water while you train, offering private cardio zones, strength conditioning, steam, and sauna suites.",
    image: "/images/lakeside/wellness-gym.jpg",
    alt: "Double-Height Panoramic Gym Overlooking the Lake",
  },
];

export default function LakesideWellness({}: LakesideWellnessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsWrap = cardsWrapRef.current;
    if (!section || !cardsWrap) return;

    const ctx = gsap.context(() => {
      if (header) {
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
      }

      const cards = cardsWrap.querySelectorAll(".wellness-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "all",
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
        <div ref={headerRef} className="max-w-4xl mb-12 sm:mb-16 space-y-4">
          <h2 className="type-section font-serif-heading font-luxia-display text-2xl sm:text-5xl lg:text-7xl text-[#EDE5DA] tracking-tight leading-[1.08]">
            Wellness by the <br />
            <span className="type-display-accent font-normal text-sand-gradient">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16 items-stretch"
        >
          {WELLNESS_FACILITIES.map((facility) => (
            <article
              key={facility.id}
              className="wellness-card group rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d2828]/80 backdrop-blur-md border border-[#EDE5DA]/15 shadow-xl flex flex-col justify-start transition-all duration-500 hover:border-[#62AA9E]/50 hover:bg-[#0d2828]/95 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            >
              {/* Full-bleed Architectural Photo without numbering/labels */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#081a1a] shrink-0">
                <Image
                  src={facility.image}
                  alt={facility.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-[3000ms] ease-out group-hover:scale-105"
                />

                {/* Subtle scrim overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0d2828] via-[#0d2828]/15 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Clean Editorial Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start space-y-2.5">
                <h3 className="font-serif-heading font-luxia-display text-2xl sm:text-3xl text-[#EDE5DA] leading-snug tracking-tight group-hover:text-[#62AA9E] transition-colors duration-300">
                  {facility.title}
                </h3>
                <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </article>
          ))}
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
