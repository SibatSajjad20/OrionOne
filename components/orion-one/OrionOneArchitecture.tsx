"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { scrollToY } from "@/lib/scrollTo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ArchitecturalFacet {
  id: string;
  title: string;
  description: string;
}

const ARCHITECTURAL_FACETS: ArchitecturalFacet[] = [
  {
    id: "organic-form",
    title: "Organic Form",
    description:
      "Curvilinear lines and cascading podiums echoing the natural rhythm and movement of the lake.",
  },
  {
    id: "lake-views",
    title: "Lake Views",
    description:
      "Oriented toward the waterfront to capture panoramic horizons from every private terrace.",
  },
  {
    id: "natural-light",
    title: "Natural Light",
    description:
      "Floor-to-ceiling structural glazing drawing ambient daylight deep into each residence.",
  },
  {
    id: "architecture-nature",
    title: "Architecture & Nature",
    description:
      "Stepped garden terraces connecting the tower directly to the landscaped lakeside promenade.",
  },
];

interface ElevationPerspective {
  id: string;
  image: string;
  alt: string;
}

const ELEVATION_PERSPECTIVES: ElevationPerspective[] = [
  {
    id: "facade",
    image: "/images/orion-one/architecture-fluid.jpg",
    alt: "Fluid waterfront architectural facade of Orion One",
  },
  {
    id: "terraces",
    image: "/images/orion-one/terrace-elevations.jpg",
    alt: "Cascading outdoor terraces overlooking the lake at Orion One",
  },
  {
    id: "arrival",
    image: "/images/orion-one/arrival-plaza.jpg",
    alt: "Arrival court and entry canopy at Orion One",
  },
  {
    id: "night",
    image: "/images/orion-one/night-reflection.jpg",
    alt: "Evening architectural illumination and lake reflection of Orion One",
  },
];

interface OrionOneArchitectureProps {
  onOpenInquiry?: () => void;
}

export default function OrionOneArchitecture({}: OrionOneArchitectureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const facetCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Active elevation perspective state (0 to 3)
  const [activeElevation, setActiveElevation] = useState<number>(0);
  const activeElevationRef = useRef<number>(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleCardClick = (idx: number) => {
    setActiveElevation(idx);
    activeElevationRef.current = idx;

    if (tlRef.current && tlRef.current.scrollTrigger) {
      const st = tlRef.current.scrollTrigger;
      const progressTargets = [0, 0.35, 0.68, 1.0];
      const targetScroll =
        st.start + (st.end - st.start) * progressTargets[idx];
      scrollToY(targetScroll);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const imagePanel = imagePanelRef.current;
    const leftPanel = leftPanelRef.current;

    if (!container || !stage || !imagePanel || !leftPanel) {
      return;
    }

    const facetCards = facetCardsRef.current.filter(
      Boolean
    ) as HTMLDivElement[];

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (facetCards[0]) {
        gsap.set(facetCards[0], { opacity: 1, y: 0 });
      }

      facetCards.slice(1).forEach((card) => {
        gsap.set(card, { opacity: 0, y: 80 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=180%",
          pin: stage,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p >= 0.72) {
              if (activeElevationRef.current !== 3) {
                setActiveElevation(3);
                activeElevationRef.current = 3;
              }
            } else if (p >= 0.44) {
              if (activeElevationRef.current !== 2) {
                setActiveElevation(2);
                activeElevationRef.current = 2;
              }
            } else if (p >= 0.16) {
              if (activeElevationRef.current !== 1) {
                setActiveElevation(1);
                activeElevationRef.current = 1;
              }
            } else {
              if (activeElevationRef.current !== 0) {
                setActiveElevation(0);
                activeElevationRef.current = 0;
              }
            }
          },
        },
      });

      tlRef.current = tl;

      if (facetCards[1]) {
        tl.to(
          facetCards[1],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          0.15
        );
      }

      if (facetCards[2]) {
        tl.to(
          facetCards[2],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          0.85
        );
      }

      if (facetCards[3]) {
        tl.to(
          facetCards[3],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          1.55
        );
      }

      tl.to({}, { duration: 0.4 });

      return () => {
        tlRef.current = null;
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = container.querySelectorAll(".mobile-arch-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#081a1a]">
      {/* ========================================================= */}
      {/* MOBILE & TABLET EDITORIAL ARCHITECTURAL CARDS LAYOUT     */}
      {/* High-end stacked cards with full-width photography       */}
      {/* ========================================================= */}
      <div className="lg:hidden px-4 sm:px-8 py-16 sm:py-24 space-y-8 bg-[#081a1a] text-[#EDE5DA]">
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#62AA9E] font-medium font-sans-body">
            Architectural Form &amp; Rhythm
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-light text-[#EDE5DA] tracking-tight leading-[1.1] uppercase">
            Curated <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Perspectives
            </span>
          </h2>
          <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed max-w-xl">
            Curvilinear lines, cascading podiums, and floor-to-ceiling glass designed in natural harmony with the lake.
          </p>
        </div>

        <div className="space-y-6">
          {ARCHITECTURAL_FACETS.map((facet, idx) => {
            const elev = ELEVATION_PERSPECTIVES[idx];
            return (
              <div
                key={facet.id}
                className="mobile-arch-card rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-xl transition-all duration-300 hover:border-[#62AA9E]/40"
              >
                {/* Full-bleed Architectural Image */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#081a1a]">
                  <Image
                    src={elev.image}
                    alt={elev.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority={idx === 0}
                  />
                  {/* Subtle top-to-bottom scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2828] via-transparent to-black/20 pointer-events-none" />

                  {/* Corner Index Badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#081a1a]/85 backdrop-blur-md border border-[#EDE5DA]/20 text-[10px] font-sans-body tracking-[0.2em] text-[#62AA9E] uppercase font-semibold">
                    0{idx + 1} · {facet.title}
                  </div>
                </div>

                {/* Narrative Description */}
                <div className="p-5 sm:p-7 space-y-2">
                  <h3 className="font-serif-heading text-xl sm:text-2xl font-light text-[#EDE5DA] tracking-tight">
                    {facet.title}
                  </h3>
                  <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                    {facet.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP PINNED STAGE VIEWPORT (>= 1024px)                 */}
      {/* Untouched 50/50 stage with scrubbed elevation crossfades  */}
      {/* ========================================================= */}
      <div
        ref={stageRef}
        className="hidden lg:block relative w-full h-[100dvh] overflow-hidden bg-[#081a1a] text-[#EDE5DA]"
      >
        {/* 1. LEFT PANEL: FULL 50% WIDTH, FULL HEIGHT, PARTITIONS ONLY */}
        <div
          ref={leftPanelRef}
          className="absolute top-0 left-0 w-1/2 h-full z-20 flex flex-col pt-24 pb-0 overflow-hidden bg-[#081a1a]"
        >
          <div className="flex-1 flex flex-col w-full h-full">
            {ARCHITECTURAL_FACETS.map((facet, idx) => {
              const isCurrent = activeElevation === idx;
              const isLast = idx === ARCHITECTURAL_FACETS.length - 1;

              return (
                <div
                  key={facet.id}
                  ref={(el) => {
                    facetCardsRef.current[idx] = el;
                  }}
                  onClick={() => handleCardClick(idx)}
                  className={`flex-1 w-full flex flex-col justify-center px-12 lg:px-14 xl:px-16 transition-all duration-400 cursor-pointer will-change-transform relative opacity-100 ${
                    !isLast ? "border-b border-[#EDE5DA]/15" : ""
                  } ${
                    isCurrent
                      ? "bg-[#0b2424]/90"
                      : "bg-transparent hover:bg-[#0b2424]/40"
                  }`}
                >
                  {/* Subtle Active Accent on Left Edge */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-400 ${
                      isCurrent ? "bg-[#62AA9E] opacity-100" : "bg-transparent opacity-0"
                    }`}
                  />

                  <div className="max-w-xl">
                    <h3
                      className={`font-serif-heading text-base sm:text-2xl lg:text-[27px] font-light tracking-tight leading-snug transition-colors duration-300 ${
                        isCurrent ? "text-[#EDE5DA]" : "text-[#EDE5DA]/70"
                      }`}
                    >
                      {facet.title}
                    </h3>

                    <p
                      className={`font-sans-body text-xs sm:text-sm lg:text-[15px] font-light leading-relaxed mt-2 transition-colors duration-300 ${
                        isCurrent ? "text-[#EDE5DA]/90" : "text-[#C9BFB1]/65"
                      }`}
                    >
                      {facet.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. RIGHT PANEL: FULL 50% WIDTH CLEAR ARCHITECTURAL RENDER */}
        <div
          ref={imagePanelRef}
          className="absolute top-0 right-0 w-1/2 h-full overflow-hidden z-10 border-l border-[#EDE5DA]/10 shadow-[-12px_0_35px_rgba(0,0,0,0.45)]"
        >
          {ELEVATION_PERSPECTIVES.map((elev, idx) => (
            <div
              key={elev.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                activeElevation === idx
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={elev.image}
                alt={elev.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
