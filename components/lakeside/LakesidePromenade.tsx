"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PromenadeItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const PROMENADE_ITEMS: PromenadeItem[] = [
  {
    id: "tracks",
    title: "Continuous Jogging & Walking Circuit",
    description:
      "A dedicated shoreline loop engineered for runners, brisk walkers, and morning strolls. Fully buffered from vehicular access, ensuring uninterrupted motion beside calm waters.",
    image: "/images/lakeside/promenade-jogging.jpg",
    alt: "Dedicated Lakeside Walking and Jogging Track",
  },
  {
    id: "pedestrian",
    title: "Shaded Botanical Boardwalks",
    description:
      "Meandering timber boardwalks shaded by indigenous olive, jacaranda, and wetland trees. Natural landscape buffers create refreshing breezes and quiet shaded passages.",
    image: "/images/lakeside/promenade-deck.jpg",
    alt: "Landscaped Pedestrian Shoreline Boardwalk",
  },
  {
    id: "seating",
    title: "Shoreline Resting Alcoves & Sunset Benches",
    description:
      "Architecturally sculpted stone terraces and marine-grade teak resting alcoves positioned westward, catching golden hour reflections across the open water basin.",
    image: "/images/lakeside/day-lake.jpg",
    alt: "Outdoor Shoreline Seating and Viewing Decks",
  },
  {
    id: "fountains",
    title: "The Fountain Plaza & Amphitheater",
    description:
      "Open pedestrian tiered waterside steps positioned directly before the dancing water fountains, creating an expansive civic stage for evening community life.",
    image: "/images/lakeside/fountain-plaza.jpg",
    alt: "The Fountain Plaza and Amphitheater Gathering Space",
  },
  {
    id: "movement",
    title: "Open-Air Movement & Yoga Decks",
    description:
      "Secluded timber decks hovering over the water, reserved for morning yoga sessions, quiet meditation, and restorative movement while dawn mist settles over the lake.",
    image: "/images/lakeside/hero-lake.jpg",
    alt: "Fresh-Air Movement Spaces by the Water",
  },
];

export default function LakesidePromenade() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet: Smooth Pinned Horizontal Scroll
      mm.add("(min-width: 768px)", () => {
        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.kill();
        };
      });

      // Mobile: Cinematic Pinned Horizontal Glide
      mm.add("(max-width: 767px)", () => {
        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 32),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${(track.scrollWidth - window.innerWidth) * 1.35}`,
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.kill();
        };
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="promenade"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-start pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="The Lakeside Promenade"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-[#62AA9E]/4 rounded-full blur-[260px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Clean Stage Header - Moved up and tightened */}
      <div className="pb-3 sm:pb-4 px-4 sm:px-8 lg:px-16 max-w-[1500px] mx-auto w-full shrink-0">
        <h2 className="type-section font-serif-heading font-luxia-display text-2xl sm:text-4xl lg:text-5xl text-[#EDE5DA] tracking-tight leading-[1.08]">
          The Lakeside <span className="type-display-accent font-normal text-sand-gradient">Promenade</span>
        </h2>
        <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light max-w-xl mt-1.5 sm:mt-2 leading-relaxed">
          A continuous pedestrian loop connecting calm waters, lush tree canopies, and civic gathering terraces.
        </p>
      </div>

      {/* Horizontal Sliding Track (Desktop & Mobile Synchronized) */}
      <div className="pt-2 sm:pt-3 pb-4 sm:pb-6 overflow-hidden w-full">
        <div
          ref={trackRef}
          className="flex flex-row items-stretch gap-4 sm:gap-6 px-4 sm:px-8 lg:px-16 w-max will-change-transform"
        >
          {PROMENADE_ITEMS.map((item) => (
            <article
              key={item.id}
              className="promenade-card group w-[82vw] sm:w-[380px] md:w-[410px] lg:w-[430px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d2828]/80 backdrop-blur-md border border-[#EDE5DA]/15 shadow-xl flex flex-col justify-start transition-all duration-500 hover:border-[#62AA9E]/50 hover:bg-[#0d2828]/95 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            >
              {/* Full-bleed Architectural Photo without numbering/labels */}
              <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-[#081a1a] shrink-0">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 82vw, 430px"
                  className="object-cover object-center transition-transform duration-[2500ms] ease-out group-hover:scale-105"
                />

                {/* Subtle scrim transition */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0d2828] via-[#0d2828]/15 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Clean Editorial Content */}
              <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-start space-y-1.5 sm:space-y-2">
                <h3 className="font-serif-heading font-luxia-display text-lg sm:text-xl lg:text-2xl text-[#EDE5DA] leading-snug tracking-tight group-hover:text-[#62AA9E] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="font-sans-body text-xs sm:text-[13px] text-[#C9BFB1] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
