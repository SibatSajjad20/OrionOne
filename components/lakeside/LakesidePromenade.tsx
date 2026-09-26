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
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 80);
      };

      const mm = gsap.matchMedia();

      // Desktop & Tablet: Smooth Pinned Horizontal Scroll
      mm.add("(min-width: 768px)", () => {
        const tween = gsap.to(track, {
          x: () => getScrollAmount(),
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
      className="relative w-full bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="The Lakeside Promenade"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-[#62AA9E]/4 rounded-full blur-[260px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Clean Stage Header */}
      <div className="pt-20 sm:pt-24 pb-4 px-4 sm:px-8 lg:px-16 max-w-[1500px] mx-auto">
        <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
          The Lakeside <span className="italic font-normal text-sand-gradient normal-case">Promenade</span>
        </h2>
      </div>

      {/* Horizontal Sliding Track (Desktop) / Native Fluid Stack (Mobile) */}
      <div className="py-8 sm:py-12 md:py-16 overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row items-stretch gap-6 md:gap-8 px-4 sm:px-8 lg:px-16 w-full md:w-max will-change-transform"
        >
          {PROMENADE_ITEMS.map((item) => (
            <article
              key={item.id}
              className="promenade-card w-full md:w-[540px] lg:w-[600px] shrink-0 rounded-2xl bg-[#0d2828] border border-[#EDE5DA]/15 p-5 sm:p-7 shadow-2xl flex flex-col justify-start group transition-colors duration-500 hover:border-[#62AA9E]/40"
            >
              {/* Clean Architectural Photo - Absolutely No Text/Tags on Image */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#081a1a] border border-[#EDE5DA]/10 shrink-0">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-center transition-transform duration-[2500ms] group-hover:scale-105"
                />
              </div>

              {/* Clean Editorial Narrative */}
              <div className="pt-6 space-y-3 flex-1 flex flex-col justify-start">
                <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light leading-snug">
                  {item.title}
                </h3>

                <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
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
