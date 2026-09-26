"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RhythmPhase {
  id: string;
  title: string;
  narrative: string;
  image: string;
  alt: string;
}

const PHASES: RhythmPhase[] = [
  {
    id: "morning",
    title: "Morning Stillness",
    narrative:
      "Still air and crisp dawn mist drifting across the lake basin. The day begins in undisturbed quiet along the shoreline promenade, where unobstructed water reflections mirror the architecture before the city awakens.",
    image: "/images/lakeside/balcony-panoramic.jpg",
    alt: "Morning Waterfront Horizon and Quiet Strolls",
  },
  {
    id: "day",
    title: "Daytime Vitality",
    narrative:
      "Sunlight glints across the lake surface under expansive open skies. The waterfront pulses with active life: shaded terrace conversations, espresso meetings, and unhurried movement along botanical boardwalks.",
    image: "/images/lakeside/day-lake.jpg",
    alt: "Daytime Waterfront Activities and Outdoor Spaces",
  },
  {
    id: "evening",
    title: "Twilight & Fountains",
    narrative:
      "Twilight settles across Sector F as golden hour transitions to evening elegance. The dancing fountains awaken with warm illumination, and shoreline terraces reflect peaceful night waters.",
    image: "/images/lakeside/evening-lake.jpg",
    alt: "Evening Illuminated Promenade and Dancing Fountains",
  },
];

export default function LakesideDailyRhythm() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll(".rhythm-card");
      gsap.fromTo(
        cardElements,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards,
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
      id="daily-rhythm"
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="Waterfront Rhythm"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/3 right-1/4 w-[750px] h-[750px] bg-[#62AA9E]/4 rounded-full blur-[240px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Clean Editorial Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <h2 className="font-serif-heading text-4xl sm:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            The Rhythm of the <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Waterfront
            </span>
          </h2>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
            From morning stillness to illuminated evening waters, experience a landscape that shifts gracefully throughout the day.
          </p>
        </div>

        {/* 3 Architectural Editorial Triptych Columns */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch"
        >
          {PHASES.map((phase) => (
            <article
              key={phase.id}
              className="rhythm-card flex flex-col justify-start group"
            >
              {/* Pure Photography */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#081a1a] border border-[#EDE5DA]/10 shrink-0">
                <Image
                  src={phase.image}
                  alt={phase.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-[2500ms] group-hover:scale-105"
                />
              </div>

              {/* Clean Typography */}
              <div className="pt-6 space-y-3 flex-1 flex flex-col justify-start border-t border-[#EDE5DA]/15 mt-6">
                <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light leading-snug group-hover:text-[#62AA9E] transition-colors">
                  {phase.title}
                </h3>

                <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                  {phase.narrative}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
