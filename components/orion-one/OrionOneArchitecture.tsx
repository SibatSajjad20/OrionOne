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
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const ARCHITECTURAL_FACETS: ArchitecturalFacet[] = [
  {
    id: "architecture-nature",
    number: "01",
    title: "Architecture & Nature",
    description:
      "Stepped garden terraces connecting the tower directly to the landscaped lakeside promenade.",
    image: "/images/orion-one/terrace-elevations.jpg",
    alt: "Stepped garden terraces connecting architecture and nature at Orion One",
  },
  {
    id: "lake-views",
    number: "02",
    title: "Lake Views",
    description:
      "Oriented toward the waterfront to capture panoramic horizons from every private terrace.",
    image: "/images/orion-one/lakefront-view.jpg",
    alt: "Cascading outdoor terraces overlooking the lake at Orion One",
  },
  {
    id: "natural-light",
    number: "03",
    title: "Natural Light",
    description:
      "Floor-to-ceiling structural glazing drawing ambient daylight deep into each residence.",
    image: "/images/lakeside/balcony-panoramic.jpg",
    alt: "Floor-to-ceiling panoramic balcony terrace with ambient sunlight and lake views at Orion One",
  },
];

interface OrionOneArchitectureProps {
  onOpenInquiry?: () => void;
}

export default function OrionOneArchitecture({}: OrionOneArchitectureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyTrackRef = useRef<HTMLDivElement>(null);
  const shutterLeftMossRef = useRef<HTMLDivElement>(null);
  const shutterRightMossRef = useRef<HTMLDivElement>(null);
  const shutterLeftSandRef = useRef<HTMLDivElement>(null);
  const shutterRightSandRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const explicitReduced =
      document.documentElement.dataset.reducedMotion === "true";

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        if (explicitReduced) {
          gsap.set(
            [
              shutterLeftMossRef.current,
              shutterRightMossRef.current,
              shutterLeftSandRef.current,
              shutterRightSandRef.current,
            ],
            { autoAlpha: 0 }
          );
          return;
        }

        if (isDesktop && stickyTrackRef.current) {
          const panel0 = panelRefs.current[0];
          const panel1 = panelRefs.current[1];
          const image0 = imageWrapRefs.current[0];
          const image1 = imageWrapRefs.current[1];
          const image2 = imageWrapRefs.current[2];
          const copy0 = copyRefs.current[0];
          const copy1 = copyRefs.current[1];
          const copy2 = copyRefs.current[2];

          gsap.set(shutterLeftMossRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
          });
          gsap.set(shutterRightMossRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
          });
          gsap.set(shutterLeftSandRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
          });
          gsap.set(shutterRightSandRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
          });

          gsap.set([panel0, panel1], { yPercent: 0 });
          gsap.set(image0, { scale: 1.08 });
          gsap.set([image1, image2], { scale: 1 });
          gsap.set(copy0, { opacity: 0, y: 24 });
          gsap.set([copy1, copy2], { opacity: 0, y: 28 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stickyTrackRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;
                if (p < 0.42) {
                  setActiveIndex(0);
                } else if (p < 0.74) {
                  setActiveIndex(1);
                } else {
                  setActiveIndex(2);
                }
              },
            },
          });

          // Phase 1 (0 -> 0.26): Two Sand/Moss curtain layers peel open left/right over the first terrace image
          tl.to(
            shutterLeftMossRef.current,
            {
              clipPath: "inset(0% 100% 0% 0%)",
              ease: "power2.inOut",
              duration: 0.22,
            },
            0
          )
            .to(
              shutterRightMossRef.current,
              {
                clipPath: "inset(0% 0% 0% 100%)",
                ease: "power2.inOut",
                duration: 0.22,
              },
              0
            )
            .to(
              shutterLeftSandRef.current,
              {
                clipPath: "inset(0% 100% 0% 0%)",
                ease: "power2.inOut",
                duration: 0.26,
              },
              0.04
            )
            .to(
              shutterRightSandRef.current,
              {
                clipPath: "inset(0% 0% 0% 100%)",
                ease: "power2.inOut",
                duration: 0.26,
              },
              0.04
            )
            .to(
              image0,
              {
                scale: 1.04,
                ease: "power2.out",
                duration: 0.28,
              },
              0
            )
            .to(
              copy0,
              {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.16,
              },
              0.12
            );

          // Phase 2 (0.30 -> 0.64): First panel peels upward revealing second terrace facet underneath
          tl.to(
            panel0,
            {
              yPercent: -100,
              ease: "power2.inOut",
              duration: 0.34,
            },
            0.3
          )
            .to(
              image0,
              {
                scale: 1,
                ease: "none",
                duration: 0.34,
              },
              0.3
            )
            .fromTo(
              image1,
              { scale: 1 },
              {
                scale: 1.04,
                ease: "power2.out",
                duration: 0.34,
              },
              0.3
            )
            .to(
              copy1,
              {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.18,
              },
              0.44
            );

          // Phase 3 (0.66 -> 1.0): Second panel peels upward revealing third terrace facet, settling right at 1.0 (no dead scroll)
          tl.to(
            panel1,
            {
              yPercent: -100,
              ease: "power2.inOut",
              duration: 0.34,
            },
            0.66
          )
            .to(
              image1,
              {
                scale: 1,
                ease: "none",
                duration: 0.34,
              },
              0.66
            )
            .fromTo(
              image2,
              { scale: 1 },
              {
                scale: 1.04,
                ease: "power2.out",
                duration: 0.34,
              },
              0.66
            )
            .to(
              copy2,
              {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.18,
              },
              0.8
            );
        }

        if (isMobile && mobileCardsRef.current) {
          const cards =
            mobileCardsRef.current.querySelectorAll(".mobile-terrace-card");
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              {
                clipPath: "inset(12% 4% 12% 4% round 16px)",
                opacity: 0.4,
              },
              {
                clipPath: "inset(0% 0% 0% 0% round 16px)",
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        }
      },
      section
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="architecture-perspectives"
      ref={sectionRef}
      data-bg="moss"
      className="relative bg-[#081a1a] text-[#EDE5DA] border-t border-[#EDE5DA]/10"
      aria-label="Architectural Perspectives"
    >
      {/* =================================================================== */}
      {/* DESKTOP: Sticky Full-Bleed Shutter + Stepped Terrace Peel (~240vh)  */}
      {/* =================================================================== */}
      <div
        ref={stickyTrackRef}
        className="hidden lg:block relative h-[240vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#081a1a]">
          {/* Editorial Section Header Overlay (Top-Left) */}
          <div className="absolute top-24 left-8 xl:left-16 z-50 max-w-xl pointer-events-none">
            <h2 className="font-serif-heading font-luxia-display text-4xl xl:text-5xl text-[#EDE5DA] tracking-tight leading-[1.08] drop-shadow-md">
              Curated{" "}
              <span className="italic font-normal text-sand-gradient normal-case">
                Perspectives
              </span>
            </h2>
            <p className="mt-2 font-sans-body text-sm text-[#EDE5DA]/85 font-light leading-relaxed max-w-md drop-shadow">
              Curvilinear lines, cascading podiums, and floor-to-ceiling glass
              designed in natural harmony with the lake.
            </p>
          </div>

          {/* 3 Full-Bleed Terrace Panels (Stacked z-30, z-20, z-10) */}
          {ARCHITECTURAL_FACETS.map((facet, index) => {
            const zIndexClass =
              index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10";
            return (
              <article
                key={facet.id}
                ref={(el) => {
                  panelRefs.current[index] = el as HTMLDivElement | null;
                }}
                className={`absolute inset-0 w-full h-full overflow-hidden bg-[#081a1a] will-change-transform ${zIndexClass} ${
                  index < 2
                    ? "border-b-2 border-[#62AA9E]/45 shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
                    : ""
                }`}
              >
                {/* Full-bleed Image with subtle scrubbed scale */}
                <div
                  ref={(el) => {
                    imageWrapRefs.current[index] = el;
                  }}
                  className="relative w-full h-full will-change-transform"
                >
                  <Image
                    src={facet.image}
                    alt={facet.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  {/* Directional atmospheric gradients for editorial legibility */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/90 via-[#081a1a]/25 to-[#081a1a]/65 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Overlaid Facet Title + Description (Bottom-Left) */}
                <div
                  ref={(el) => {
                    copyRefs.current[index] = el;
                  }}
                  className="absolute bottom-12 xl:bottom-16 left-8 xl:left-16 z-20 max-w-xl space-y-3 will-change-transform"
                >
                  <span className="font-sans-body text-xs uppercase tracking-[0.28em] text-[#62AA9E] font-semibold block">
                    Terrace Facet {facet.number}
                  </span>
                  <h3 className="font-serif-heading font-luxia-display text-4xl xl:text-5xl text-[#EDE5DA] leading-[1.08]">
                    {facet.title}
                  </h3>
                  <p className="font-sans-body text-base text-[#EDE5DA]/90 font-light leading-relaxed">
                    {facet.description}
                  </p>
                </div>
              </article>
            );
          })}

          {/* Clip-Path Shutter Curtain Layers (Sand inner layer + Moss outer layer) */}
          {/* Sand Curtain Left & Right */}
          <div
            ref={shutterLeftSandRef}
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-y-0 left-0 w-1/2 z-40
              bg-[#EDE5DA]/20 backdrop-blur-[2px] border-r border-[#EDE5DA]/40
              will-change-[clip-path]
            "
          />
          <div
            ref={shutterRightSandRef}
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-y-0 right-0 w-1/2 z-40
              bg-[#EDE5DA]/20 backdrop-blur-[2px] border-l border-[#EDE5DA]/40
              will-change-[clip-path]
            "
          />

          {/* Moss Curtain Left & Right */}
          <div
            ref={shutterLeftMossRef}
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-y-0 left-0 w-1/2 z-40
              bg-[#153D3D] border-r border-[#62AA9E]/45
              will-change-[clip-path]
            "
          />
          <div
            ref={shutterRightMossRef}
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-y-0 right-0 w-1/2 z-40
              bg-[#153D3D] border-l border-[#62AA9E]/45
              will-change-[clip-path]
            "
          />

          {/* Mint 01 / 02 / 03 Ticks Bottom-Right */}
          <div
            className="absolute bottom-12 xl:bottom-16 right-8 xl:right-16 z-50 flex items-center gap-4 bg-[#081a1a]/75 backdrop-blur-md border border-[#EDE5DA]/15 px-5 py-3 rounded-full"
            aria-label="Terrace perspective indicator"
          >
            {ARCHITECTURAL_FACETS.map((facet, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div key={facet.id} className="flex items-center gap-2">
                  <span
                    className={`font-sans-body text-xs tracking-[0.22em] transition-colors duration-300 ${
                      isActive
                        ? "text-[#62AA9E] font-bold"
                        : "text-[#EDE5DA]/45 font-light"
                    }`}
                  >
                    {facet.number}
                  </span>
                  <span
                    className={`h-[2px] rounded-full transition-all duration-300 ${
                      isActive ? "w-7 bg-[#62AA9E]" : "w-2 bg-[#EDE5DA]/20"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MOBILE (<1024px): Stacked Full-Bleed Cards with Clip-Path Reveal    */}
      {/* =================================================================== */}
      <div className="lg:hidden py-20 px-4 sm:px-8 space-y-10">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-serif-heading font-luxia-display text-3xl sm:text-5xl text-[#EDE5DA] tracking-tight leading-[1.08]">
            Curated <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Perspectives
            </span>
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
            Curvilinear lines, cascading podiums, and floor-to-ceiling glass
            designed in natural harmony with the lake.
          </p>
        </div>

        <div ref={mobileCardsRef} className="space-y-6">
          {ARCHITECTURAL_FACETS.map((facet) => (
            <article
              key={facet.id}
              className="mobile-terrace-card relative aspect-[4/5] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15"
            >
              <Image
                src={facet.image}
                alt={facet.alt}
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/35 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between gap-4">
                <div className="space-y-2 max-w-lg">
                  <span className="font-sans-body text-[11px] uppercase tracking-[0.25em] text-[#62AA9E] font-semibold block">
                    {facet.number}
                  </span>
                  <h3 className="font-serif-heading font-luxia-display text-2xl sm:text-3xl text-[#EDE5DA] leading-snug">
                    {facet.title}
                  </h3>
                  <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA]/85 font-light leading-relaxed">
                    {facet.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
