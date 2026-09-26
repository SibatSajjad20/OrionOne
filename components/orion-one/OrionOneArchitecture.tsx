"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

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
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
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

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pin + scrub only on large screens; mobile shows all facets stacked
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
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#081a1a]">
      {/* Pinned Stage Viewport */}
      <div
        ref={stageRef}
        className="relative w-full h-auto min-h-0 lg:min-h-[100dvh] lg:h-[100dvh] overflow-visible lg:overflow-hidden bg-[#081a1a] text-[#EDE5DA] flex flex-col lg:block"
      >
        {/* ========================================================= */}
        {/* 1. LEFT PANEL: FULL 50% WIDTH, FULL HEIGHT, PARTITIONS ONLY*/}
        {/* ========================================================= */}
        <div
          ref={leftPanelRef}
          className="relative lg:absolute top-0 left-0 w-full lg:w-1/2 h-auto lg:h-full z-20 flex flex-col pt-2 sm:pt-4 lg:pt-24 pb-0 order-2 lg:order-1 overflow-visible lg:overflow-hidden bg-[#081a1a]"
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
                  className={`flex-none lg:flex-1 w-full flex flex-col justify-center px-4 sm:px-12 lg:px-14 xl:px-16 py-6 lg:py-0 transition-all duration-400 cursor-pointer will-change-transform relative opacity-100 ${
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

        {/* ========================================================= */}
        {/* 2. RIGHT PANEL: FULL 50% WIDTH CLEAR ARCHITECTURAL RENDER */}
        {/* Completely clean image, no text overlays, smooth crossfade*/}
        {/* ========================================================= */}
        <div
          ref={imagePanelRef}
          className="relative lg:absolute top-0 right-0 w-full lg:w-1/2 h-[50vw] max-h-[420px] lg:max-h-none lg:h-full overflow-hidden z-10 border-b lg:border-b-0 lg:border-l border-[#EDE5DA]/10 shadow-[-12px_0_35px_rgba(0,0,0,0.45)] order-1 lg:order-2 shrink-0"
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
