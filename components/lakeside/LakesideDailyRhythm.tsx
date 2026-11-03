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
    image: "/images/lakeside/hero-lake.jpg",
    alt: "Evening Illuminated Promenade and Dancing Fountains",
  },
];

export default function LakesideDailyRhythm() {
  const containerRef = useRef<HTMLElement>(null);
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = desktopStageRef.current;
    const panel2 = panel2Ref.current;
    const panel3 = panel3Ref.current;
    if (!stage || !panel2 || !panel3) return;

    const explicitReduced =
      typeof document !== "undefined" &&
      document.documentElement.dataset.reducedMotion === "true";

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop (>= 1024px): Pinned 100dvh stage, total section scroll height ~300vh
      mm.add("(min-width: 1024px)", () => {
        if (explicitReduced) {
          gsap.set([panel2, panel3], { yPercent: 0 });
          return;
        }

        // Panel 2 and 3 start at yPercent: 100 (below view)
        gsap.set(panel2, { yPercent: 100 });
        gsap.set(panel3, { yPercent: 100 });

        // ScrollTrigger pins stage for 200% scroll distance (200vh).
        // Combined with the 100dvh stage height, this creates exactly ~300vh total section scroll height.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=200%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Panel 2 slides to 0 with ease: "none" over the first half
        tl.to(panel2, {
          yPercent: 0,
          ease: "none",
          duration: 1,
        });

        // Panel 3 slides to 0 with ease: "none" over the second half
        // Unpins as soon as panel 3 reaches 0
        tl.to(panel3, {
          yPercent: 0,
          ease: "none",
          duration: 1,
        });

        return () => {
          tl.kill();
        };
      });

      // Mobile (< 1024px): Normal stacked document flow, clear transforms
      mm.add("(max-width: 1023px)", () => {
        gsap.set([panel2, panel3], { clearProps: "all" });
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="daily-rhythm"
      ref={containerRef}
      className="relative w-full bg-[#081a1a] text-[#EDE5DA]"
      aria-label="Waterfront Rhythm"
    >
      {/* =================================================================== */}
      {/* DESKTOP (>= 1024px): Pinned 100dvh stage, stacked slide sequence    */}
      {/* =================================================================== */}
      <div
        ref={desktopStageRef}
        className="hidden lg:block relative w-full h-[100dvh] overflow-hidden bg-[#081a1a]"
      >
        {/* Panel 1: Morning Stillness (z-1) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <Image
            src="/images/lakeside/balcony-panoramic.jpg"
            alt="Morning Waterfront Horizon and Quiet Strolls"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Top Scrim for Section Heading Legibility */}
          <div
            className="absolute top-0 inset-x-0 h-64 sm:h-80 pointer-events-none z-[1]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8, 26, 26, 0.85) 0%, rgba(8, 26, 26, 0.4) 60%, rgba(8, 26, 26, 0) 100%)",
            }}
          />

          {/* Section Heading & Intro Text (Top-Left) */}
          <div className="absolute top-0 left-0 pt-16 sm:pt-20 lg:pt-24 px-6 sm:px-12 lg:px-16 max-w-2xl z-10 space-y-3">
            <h2 className="type-section font-serif-heading font-luxia-display text-3xl sm:text-5xl lg:text-6xl text-[#EDE5DA] tracking-tight leading-[1.08]">
              The Rhythm of the <br />
              <span className="type-display-accent font-normal text-sand-gradient">
                Waterfront
              </span>
            </h2>
            <p className="font-sans-body text-xs sm:text-sm lg:text-base text-[#C9BFB1] font-light leading-relaxed">
              From morning stillness to illuminated evening waters, experience a landscape that shifts gracefully throughout the day.
            </p>
          </div>

          {/* Bottom Gradient: rgba(21,61,61,0) to 0.85 */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                "linear-gradient(to top, rgba(21, 61, 61, 0.85) 0%, rgba(21, 61, 61, 0.45) 35%, rgba(21, 61, 61, 0) 70%)",
            }}
          />

          {/* Title & Description: Bottom-Left, max-w-xl, moving with its panel */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-12 lg:p-16 max-w-xl z-10 space-y-2.5 sm:space-y-3">
            <h3 className="font-serif-heading font-luxia-display text-2xl sm:text-4xl lg:text-5xl text-[#EDE5DA] leading-tight tracking-tight">
              Morning Stillness
            </h3>
            <p className="font-sans-body text-xs sm:text-sm lg:text-base text-[#C9BFB1] font-light leading-relaxed">
              Still air and crisp dawn mist drifting across the lake basin. The day begins in undisturbed quiet along the shoreline promenade, where unobstructed water reflections mirror the architecture before the city awakens.
            </p>
          </div>
        </div>

        {/* Panel 2: Daytime Vitality (z-2) */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
          style={{ zIndex: 2 }}
        >
          <Image
            src="/images/lakeside/day-lake.jpg"
            alt="Daytime Waterfront Activities and Outdoor Spaces"
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Bottom Gradient: rgba(21,61,61,0) to 0.85 */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                "linear-gradient(to top, rgba(21, 61, 61, 0.85) 0%, rgba(21, 61, 61, 0.45) 35%, rgba(21, 61, 61, 0) 70%)",
            }}
          />

          {/* Title & Description: Bottom-Left, max-w-xl, moving with its panel */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-12 lg:p-16 max-w-xl z-10 space-y-2.5 sm:space-y-3">
            <h3 className="font-serif-heading font-luxia-display text-2xl sm:text-4xl lg:text-5xl text-[#EDE5DA] leading-tight tracking-tight">
              Daytime Vitality
            </h3>
            <p className="font-sans-body text-xs sm:text-sm lg:text-base text-[#C9BFB1] font-light leading-relaxed">
              Sunlight glints across the lake surface under expansive open skies. The waterfront pulses with active life: shaded terrace conversations, espresso meetings, and unhurried movement along botanical boardwalks.
            </p>
          </div>
        </div>

        {/* Panel 3: Twilight & Fountains (z-3) */}
        <div
          ref={panel3Ref}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
          style={{ zIndex: 3 }}
        >
          <Image
            src="/images/lakeside/hero-lake.jpg"
            alt="Evening Illuminated Promenade and Dancing Fountains"
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Bottom Gradient: rgba(21,61,61,0) to 0.85 */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                "linear-gradient(to top, rgba(21, 61, 61, 0.85) 0%, rgba(21, 61, 61, 0.45) 35%, rgba(21, 61, 61, 0) 70%)",
            }}
          />

          {/* Title & Description: Bottom-Left, max-w-xl, moving with its panel */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-12 lg:p-16 max-w-xl z-10 space-y-2.5 sm:space-y-3">
            <h3 className="font-serif-heading font-luxia-display text-2xl sm:text-4xl lg:text-5xl text-[#EDE5DA] leading-tight tracking-tight">
              Twilight & Fountains
            </h3>
            <p className="font-sans-body text-xs sm:text-sm lg:text-base text-[#C9BFB1] font-light leading-relaxed">
              Twilight settles across Sector F as golden hour transitions to evening elegance. The dancing fountains awaken with warm illumination, and shoreline terraces reflect peaceful night waters.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MOBILE (< 1024px): Three full-height (100svh) panels in normal flow */}
      {/* =================================================================== */}
      <div className="lg:hidden w-full bg-[#081a1a]">
        {PHASES.map((phase, idx) => {
          const isFirst = idx === 0;

          return (
            <div
              key={phase.id}
              className="relative w-full h-[100svh] overflow-hidden"
            >
              <Image
                src={phase.image}
                alt={phase.alt}
                fill
                priority={isFirst}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Panel 1 Header: Section Heading & Intro Text */}
              {isFirst && (
                <>
                  <div
                    className="absolute top-0 inset-x-0 h-64 pointer-events-none z-[1]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(8, 26, 26, 0.85) 0%, rgba(8, 26, 26, 0.4) 60%, rgba(8, 26, 26, 0) 100%)",
                    }}
                  />
                  <div className="absolute top-0 left-0 pt-16 px-6 max-w-xl z-10 space-y-2.5">
                    <h2 className="type-section font-serif-heading font-luxia-display text-2xl sm:text-4xl text-[#EDE5DA] tracking-tight leading-[1.08]">
                      The Rhythm of the <br />
                      <span className="type-display-accent font-normal text-sand-gradient">
                        Waterfront
                      </span>
                    </h2>
                    <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                      From morning stillness to illuminated evening waters, experience a landscape that shifts gracefully throughout the day.
                    </p>
                  </div>
                </>
              )}

              {/* Bottom Gradient: rgba(21,61,61,0) to 0.85 */}
              <div
                className="absolute inset-0 pointer-events-none z-[2]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(21, 61, 61, 0.85) 0%, rgba(21, 61, 61, 0.45) 35%, rgba(21, 61, 61, 0) 70%)",
                }}
              />

              {/* Title & Description: Bottom-Left, max-w-xl */}
              <div className="absolute bottom-0 left-0 p-6 max-w-xl z-10 space-y-2">
                <h3 className="font-serif-heading font-luxia-display text-2xl sm:text-3xl text-[#EDE5DA] leading-tight tracking-tight">
                  {phase.title}
                </h3>
                <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                  {phase.narrative}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
