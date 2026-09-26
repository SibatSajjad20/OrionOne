"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Artery {
  id: string;
  name: string;
  image: string;
}

const ARTERIES: Artery[] = [
  {
    id: "dha-boulevards",
    name: "DHA Main Boulevards",
    image: "/images/location/dha-community-club.jpg",
  },
  {
    id: "gt-road",
    name: "GT Road (Grand Trunk Road)",
    image: "/images/location/urban-growth.jpg",
  },
  {
    id: "ring-road",
    name: "Rawalpindi Ring Road",
    image: "/images/location/lakeview-commercial-aerial.jpg",
  },
  {
    id: "expressway",
    name: "Islamabad Expressway",
    image: "/images/location/urban-business.jpg",
  },
  {
    id: "airport",
    name: "Islamabad International Airport",
    image: "/images/commercial/slide-aerial.jpg",
  },
];

interface UrbanPart {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
}

const URBAN_PARTS: UrbanPart[] = [
  {
    id: "education",
    number: "01",
    title: "Education",
    subtitle: "Schools and universities",
    description:
      "Prestigious academic campuses, reputable grammar schools, and higher education institutes within easy reach of Sector F.",
    image: "/images/location/urban-education.jpg",
    alt: "Educational institutions and university campuses near Sector F DHA Phase III",
  },
  {
    id: "healthcare",
    number: "02",
    title: "Healthcare",
    subtitle: "Healthcare facilities",
    description:
      "Multi-specialty medical complexes, specialized diagnostic laboratories, and round-the-clock emergency clinics in immediate proximity.",
    image: "/images/location/urban-healthcare.jpg",
    alt: "Healthcare facilities and medical clinics in DHA Phase III",
  },
  {
    id: "retail",
    number: "03",
    title: "Retail & Dining",
    subtitle: "Retail and dining destinations",
    description:
      "Curated shopping arcades, international culinary brands, artisanal coffee terraces, and lakeside commercial hubs.",
    image: "/images/location/urban-retail.jpg",
    alt: "Retail arcade and curated lakefront dining terraces",
  },
  {
    id: "business",
    number: "04",
    title: "Business",
    subtitle: "Established business districts",
    description:
      "Centralized corporate headquarters, financial complexes, and professional executive offices driving regional commerce.",
    image: "/images/location/urban-business.jpg",
    alt: "Corporate towers and commercial business districts",
  },
  {
    id: "growth",
    number: "05",
    title: "Future Growth",
    subtitle: "Future growth corridors",
    description:
      "Direct positioning along Islamabad's master-planned metropolitan expansion corridors ensuring sustained capital value.",
    image: "/images/location/urban-growth.jpg",
    alt: "Expanding masterplan corridors and metropolitan infrastructure",
  },
];

export default function LocationAddressConnectivity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Section 02: A Lakefront Address (Dual-Door Seamless Blind Panels)
  const blindsLayerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Section 03 Transition: Center Heading "CONNECTED TO DHA & Beyond."
  const centerHeadingLayerRef = useRef<HTMLDivElement>(null);
  const centerHeadingRef = useRef<HTMLDivElement>(null);
  const centerGlowRef = useRef<HTMLDivElement>(null);

  // Section 03: The 5 DHA Full-Screen Slides (Slide up from bottom)
  const dhaSlidesLayerRef = useRef<HTMLDivElement>(null);
  const dhaSlidesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Section 04 Transition: "EVERYTHING AROUND US" (Slides in from the left)
  const urbanIntroLayerRef = useRef<HTMLDivElement>(null);
  const urbanIntroInnerRef = useRef<HTMLDivElement>(null);
  const urbanIntroShadeRef = useRef<HTMLDivElement>(null);

  // Section 04: The 5 Urban Ecosystem Slides (Slide in from the left)
  const urbanSlidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const urbanInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  const urbanShadesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const blindsLayer = blindsLayerRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const centerHeadingLayer = centerHeadingLayerRef.current;
    const centerHeading = centerHeadingRef.current;
    const centerGlow = centerGlowRef.current;
    const dhaSlidesLayer = dhaSlidesLayerRef.current;
    const urbanIntroLayer = urbanIntroLayerRef.current;

    if (
      !container ||
      !stage ||
      !blindsLayer ||
      !leftCol ||
      !rightCol ||
      !centerHeadingLayer ||
      !centerHeading ||
      !centerGlow ||
      !dhaSlidesLayer ||
      !urbanIntroLayer
    )
      return;

    const dhaSlides = dhaSlidesRef.current.filter(Boolean) as HTMLDivElement[];
    const urbanSlides = urbanSlidesRef.current.filter(Boolean) as HTMLDivElement[];
    const urbanInners = urbanInnersRef.current.filter(Boolean) as HTMLDivElement[];
    const urbanShades = urbanShadesRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / tablet: pinned scrubbed master timeline
      mm.add("(min-width: 768px)", () => {
        // -------------------------------------------------------------
        // Initial State Setup
        // -------------------------------------------------------------
        gsap.set(blindsLayer, { opacity: 1, pointerEvents: "auto", display: "flex" });
        gsap.set(leftCol, { xPercent: 0, opacity: 1 });
        gsap.set(rightCol, { xPercent: 0, opacity: 1 });

        gsap.set(centerHeading, {
          scale: 0.86,
          opacity: 0,
          filter: "blur(14px)",
          y: 30,
        });
        gsap.set(centerGlow, { scale: 0.5, opacity: 0 });
        gsap.set(centerHeadingLayer, { opacity: 1, display: "flex" });

        gsap.set(dhaSlidesLayer, { display: "none" });
        dhaSlides.forEach((slide) => {
          gsap.set(slide, { yPercent: 100, scale: 1, opacity: 1 });
        });

        gsap.set(urbanIntroLayer, { xPercent: -100 });

        urbanSlides.forEach((slide) => {
          gsap.set(slide, { xPercent: -100 });
        });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=1150%",
            pin: stage,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        masterTl.to({}, { duration: 1.0 });

        masterTl.addLabel("splitStart", 1.0);

        masterTl.to(
          leftCol,
          {
            xPercent: -105,
            duration: 1.8,
            ease: "power2.inOut",
          },
          "splitStart"
        );

        masterTl.to(
          rightCol,
          {
            xPercent: 105,
            duration: 1.8,
            ease: "power2.inOut",
          },
          "splitStart"
        );

        masterTl.to(
          centerGlow,
          {
            scale: 1.2,
            opacity: 0.9,
            duration: 1.6,
            ease: "power2.out",
          },
          "splitStart+=0.2"
        );

        masterTl.to(
          centerHeading,
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1.6,
            ease: "power2.out",
          },
          "splitStart+=0.2"
        );

        masterTl.set(blindsLayer, { pointerEvents: "none", display: "none" }, "splitStart+=1.8");

        masterTl.to({}, { duration: 1.4 });

        masterTl.addLabel("dhaSlide1Enter", 4.2);
        masterTl.set(dhaSlidesLayer, { display: "block" }, "dhaSlide1Enter");

        masterTl.to(
          centerHeading,
          {
            yPercent: -35,
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
            duration: 1.4,
            ease: "power2.inOut",
          },
          "dhaSlide1Enter"
        );

        masterTl.to(
          centerGlow,
          {
            opacity: 0,
            scale: 0.7,
            duration: 1.2,
            ease: "power2.in",
          },
          "dhaSlide1Enter"
        );

        if (dhaSlides[0]) {
          masterTl.to(
            dhaSlides[0],
            {
              yPercent: 0,
              duration: 1.6,
              ease: "power2.out",
            },
            "dhaSlide1Enter"
          );
        }
        masterTl.set(centerHeadingLayer, { display: "none" }, "dhaSlide1Enter+=1.6");
        masterTl.to({}, { duration: 1.0 });

        if (dhaSlides[1]) {
          masterTl.addLabel("dhaSlide2", 6.8);
          masterTl.to(dhaSlides[1], { yPercent: 0, duration: 1.4, ease: "power2.out" }, "dhaSlide2");
          if (dhaSlides[0]) {
            masterTl.to(dhaSlides[0], { scale: 0.96, opacity: 0.2, duration: 1.4, ease: "power2.out" }, "dhaSlide2");
          }
          masterTl.to({}, { duration: 0.6 });
        }

        if (dhaSlides[2]) {
          masterTl.addLabel("dhaSlide3", 8.8);
          masterTl.to(dhaSlides[2], { yPercent: 0, duration: 1.4, ease: "power2.out" }, "dhaSlide3");
          if (dhaSlides[1]) {
            masterTl.to(dhaSlides[1], { scale: 0.96, opacity: 0.2, duration: 1.4, ease: "power2.out" }, "dhaSlide3");
          }
          masterTl.to({}, { duration: 0.6 });
        }

        if (dhaSlides[3]) {
          masterTl.addLabel("dhaSlide4", 10.8);
          masterTl.to(dhaSlides[3], { yPercent: 0, duration: 1.4, ease: "power2.out" }, "dhaSlide4");
          if (dhaSlides[2]) {
            masterTl.to(dhaSlides[2], { scale: 0.96, opacity: 0.2, duration: 1.4, ease: "power2.out" }, "dhaSlide4");
          }
          masterTl.to({}, { duration: 0.6 });
        }

        if (dhaSlides[4]) {
          masterTl.addLabel("dhaSlide5", 12.8);
          masterTl.to(dhaSlides[4], { yPercent: 0, duration: 1.4, ease: "power2.out" }, "dhaSlide5");
          if (dhaSlides[3]) {
            masterTl.to(dhaSlides[3], { scale: 0.96, opacity: 0.2, duration: 1.4, ease: "power2.out" }, "dhaSlide5");
          }
          masterTl.to({}, { duration: 0.8 });
        }

        masterTl.addLabel("urbanIntroEnter", 15.0);

        masterTl.to(
          urbanIntroLayer,
          {
            xPercent: 0,
            duration: 1.6,
            ease: "power2.out",
          },
          "urbanIntroEnter"
        );

        if (dhaSlides[4]) {
          masterTl.to(
            dhaSlides[4],
            {
              scale: 0.94,
              opacity: 0.35,
              duration: 1.6,
              ease: "power2.out",
            },
            "urbanIntroEnter"
          );
        }

        masterTl.to({}, { duration: 1.2 });

        for (let i = 0; i < urbanSlides.length; i++) {
          const label = `urbanSlide_${i}`;
          masterTl.addLabel(label);

          masterTl.to(
            urbanSlides[i],
            {
              xPercent: 0,
              duration: 1.4,
              ease: "none",
            },
            label
          );

          if (i === 0) {
            if (urbanIntroInnerRef.current) {
              masterTl.to(
                urbanIntroInnerRef.current,
                {
                  scale: 0.94,
                  duration: 1.4,
                  ease: "none",
                },
                label
              );
            }
            if (urbanIntroShadeRef.current) {
              masterTl.to(
                urbanIntroShadeRef.current,
                {
                  opacity: 0.6,
                  duration: 1.4,
                  ease: "none",
                },
                label
              );
            }
          } else {
            if (urbanInners[i - 1]) {
              masterTl.to(
                urbanInners[i - 1],
                {
                  scale: 0.94,
                  duration: 1.4,
                  ease: "none",
                },
                label
              );
            }
            if (urbanShades[i - 1]) {
              masterTl.to(
                urbanShades[i - 1],
                {
                  opacity: 0.55,
                  duration: 1.4,
                  ease: "none",
                },
                label
              );
            }
          }

          masterTl.to({}, { duration: 0.6 });
        }

        masterTl.to({}, { duration: 0.8 });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="address"
      ref={containerRef}
      className="relative bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="A Lakefront Address & Regional Connectivity"
    >
      {/* Stage: document stack on mobile, pinned viewport on md+ */}
      <div
        ref={stageRef}
        className="relative w-full h-auto md:h-[100dvh] overflow-visible md:overflow-hidden flex flex-col md:justify-center select-none"
      >
        {/* ========================================================================= */}
        {/* LAYER 1: SECTION 02 - A LAKEFRONT ADDRESS (SEAMLESS DUAL-DOOR BLINDS)      */}
        {/* ========================================================================= */}
        <div
          ref={blindsLayerRef}
          className="relative md:absolute inset-0 z-30 w-full h-auto md:h-full flex flex-col lg:flex-row overflow-visible md:overflow-hidden pointer-events-auto"
        >
          {/* Left Panel: Photo card resting seamlessly on #081a1a */}
          <div
            ref={leftColRef}
            className="w-full lg:w-1/2 h-auto md:h-1/2 lg:h-full bg-[#081a1a] flex items-center justify-center lg:justify-end p-4 sm:p-10 lg:pr-14 will-change-transform"
          >
            <div className="relative w-full max-w-[560px] aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-2xl">
              <Image
                src="/images/location/lakefront-shoreline.jpg"
                alt="Lakefront Shoreline and Natural Waterfront Setting at Orion One"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Panel: Editorial narrative resting seamlessly on #081a1a */}
          <div
            ref={rightColRef}
            className="w-full lg:w-1/2 h-auto md:h-1/2 lg:h-full bg-[#081a1a] flex items-center justify-center lg:justify-start p-4 sm:p-10 lg:pl-14 will-change-transform"
          >
            <div className="max-w-[540px] space-y-3 sm:space-y-6 text-left">
              <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
                A Lakefront <br />
                <span className="italic font-normal text-sand-gradient normal-case">
                  Address
                </span>
              </h2>

              <p className="font-serif-heading text-sm sm:text-xl lg:text-2xl text-[#EDE5DA]/90 font-light leading-snug">
                Positioned Beside the Lakeview Commercial Area
              </p>

              <div className="space-y-2 sm:space-y-4 font-sans-body text-xs sm:text-base text-[#C9BFB1] font-light leading-relaxed">
                <p>
                  Located in Sector F of DHA Phase III, Orion One sits beside Lakeview Commercial, surrounded by natural beauty and modern infrastructure.
                </p>
                <p>
                  The development places residents and businesses within a connected environment shaped around waterfront living, commercial activity, leisure, and everyday convenience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: BIG TRANSITION HEADING APPEARING IN THE CENTER                   */}
        {/* "CONNECTED TO DHA & Beyond."                                              */}
        {/* ========================================================================= */}
        <div
          ref={centerHeadingLayerRef}
          className="relative md:absolute inset-0 z-20 w-full h-auto md:h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 py-16 md:py-0 bg-[#081a1a] overflow-hidden"
        >
          {/* Blooming ambient center emerald halo */}
          <div
            ref={centerGlowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#62AA9E]/15 rounded-full blur-[240px] pointer-events-none will-change-transform"
            aria-hidden="true"
          />

          <div
            ref={centerHeadingRef}
            className="relative z-10 max-w-5xl space-y-4 will-change-transform"
          >
            <h2 className="font-serif-heading text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-[#EDE5DA] leading-[1.02] uppercase">
              Connected to <br />
              <span className="italic font-normal text-sand-gradient normal-case">
                DHA &amp; Beyond
              </span>
            </h2>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3: 5 FULL-SCREEN DHA SLIDES (SLIDE UPWARDS FROM BOTTOM)             */}
        {/* ========================================================================= */}
        <div
          id="connectivity"
          ref={dhaSlidesLayerRef}
          className="relative md:absolute inset-0 z-22 w-full h-auto md:h-full overflow-visible md:overflow-hidden will-change-transform flex flex-col"
        >
          {ARTERIES.map((a, idx) => (
            <div
              key={a.id}
              ref={(el) => {
                dhaSlidesRef.current[idx] = el;
              }}
              className="relative md:absolute inset-0 w-full h-auto min-h-[70vh] md:min-h-0 md:h-full overflow-hidden will-change-transform bg-[#081a1a]"
              style={{ zIndex: idx + 1 }}
            >
              {/* Full-Screen Pure Photographic Visual */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />

                {/* Subtle cinematic gradient vignette for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a] via-[#081a1a]/30 to-black/30" />
              </div>

              {/* PURE HEADING ONLY — ZERO EXTRA LABELS, TEXT, OR BUTTONS */}
              <div className="absolute bottom-12 sm:bottom-24 lg:bottom-28 left-4 sm:left-16 lg:left-24 z-10 max-w-5xl pr-4">
                <h3 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl xl:text-8xl font-light text-[#EDE5DA] leading-[1.05] uppercase">
                  {a.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* LAYER 4: "EVERYTHING AROUND US" TRANSITION PANEL (SLIDES IN FROM LEFT!)   */}
        {/* Clear background, big heading, slides in from the left over DHA Slide 5   */}
        {/* ========================================================================= */}
        <div
          id="urban-ecosystem"
          ref={urbanIntroLayerRef}
          className="relative md:absolute inset-0 z-25 w-full h-auto md:h-full overflow-hidden will-change-transform md:shadow-[25px_0_50px_rgba(0,0,0,0.7)] md:border-r border-[#EDE5DA]/15 bg-[#081a1a]"
        >
          {/* Inner container for depth scale */}
          <div
            ref={urbanIntroInnerRef}
            className="relative w-full h-auto md:h-full min-h-[50vh] md:min-h-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-16 md:py-0 overflow-hidden will-change-transform"
          >
            {/* Darkening shade when next slide covers it */}
            <div
              ref={urbanIntroShadeRef}
              className="absolute inset-0 bg-[#081a1a] opacity-0 pointer-events-none z-[4]"
            />

            {/* Ambient center emerald glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#62AA9E]/15 rounded-full blur-[240px] pointer-events-none will-change-transform"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-5xl space-y-4 will-change-transform">
              <h2 className="font-serif-heading text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-[#EDE5DA] leading-[1.02] uppercase">
                Everything <br />
                <span className="italic font-normal text-sand-gradient normal-case">
                  Around Us
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 5: THE 5 URBAN ECOSYSTEM SLIDES (SLIDE IN FROM LEFT SEQUENTIALLY)   */}
        {/* ========================================================================= */}
        {URBAN_PARTS.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              urbanSlidesRef.current[idx] = el;
            }}
            className="relative md:absolute inset-0 w-full h-auto min-h-[70vh] md:min-h-0 md:h-full overflow-hidden will-change-transform md:shadow-[25px_0_50px_rgba(0,0,0,0.65)] md:border-r border-[#EDE5DA]/15"
            style={{ zIndex: 26 + idx }}
          >
            {/* Inner Container: Handles subtle 3D depth scale */}
            <div
              ref={(el) => {
                urbanInnersRef.current[idx] = el;
              }}
              className="relative w-full h-full min-h-[70vh] md:min-h-0 will-change-transform"
            >
              {/* Full-bleed Architectural Photography */}
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Dynamic Depth Shade Overlay */}
              <div
                ref={(el) => {
                  urbanShadesRef.current[idx] = el;
                }}
                className="absolute inset-0 bg-[#081a1a] opacity-0 pointer-events-none z-[4]"
              />

              {/* Top Scrim */}
              <div className="absolute top-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-[#081a1a]/90 via-[#081a1a]/40 to-transparent pointer-events-none z-[3]" />

              {/* Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/60 via-45% to-transparent pointer-events-none z-[3]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#081a1a]/85 via-[#081a1a]/30 to-transparent pointer-events-none z-[3]" />

              {/* Bottom Content: Headline & Narrative */}
              <div className="absolute bottom-8 sm:bottom-20 lg:bottom-24 left-4 sm:left-12 lg:left-20 max-w-3xl z-10 space-y-2 sm:space-y-4 pr-4">
                <h3 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.02] uppercase">
                  {item.title}
                </h3>

                <p className="font-sans-body text-xs sm:text-base lg:text-lg text-[#EDE5DA]/85 font-light leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
