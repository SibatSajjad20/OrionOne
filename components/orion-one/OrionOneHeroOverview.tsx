"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DestinationPillar {
  id: string;
  title: string;
  image: string;
  alt: string;
}

const DESTINATION_PILLARS: DestinationPillar[] = [
  {
    id: "lakefront",
    title: "Lakefront",
    image: "/images/orion-one/masterplan-lake.jpg",
    alt: "Lakefront setting shaped by water and open spaces at Orion One",
  },
  {
    id: "residences",
    title: "Residences",
    image: "/images/orion-one/lakefront-view.jpg",
    alt: "Thoughtfully planned residences at Orion One",
  },
  {
    id: "commercial",
    title: "Commercial",
    image: "/images/orion-one/podium-promenade.jpg",
    alt: "Curated commercial terraces and retail at Orion One",
  },
  {
    id: "wellness",
    title: "Wellness",
    image: "/images/amenities/infinity-pool.jpg",
    alt: "Wellness and recreation facilities at Orion One",
  },
];

interface OrionOneHeroOverviewProps {
  onOpenInquiry?: () => void;
}

export default function OrionOneHeroOverview({
  onOpenInquiry: _onOpenInquiry,
}: OrionOneHeroOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Hero Layer (Splits open as dual doors)
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroLeftDoorRef = useRef<HTMLDivElement>(null);
  const heroRightDoorRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Transition Page 1: "MORE THAN AN ADDRESS" + one-liner subheading
  const addressLayerRef = useRef<HTMLDivElement>(null);
  const addressStatementRef = useRef<HTMLDivElement>(null);
  const addressGlowRef = useRef<HTMLDivElement>(null);

  // Transition Page 2: "A DESTINATION" + supporting one-liner
  const destinationLayerRef = useRef<HTMLDivElement>(null);
  const destinationStatementRef = useRef<HTMLDivElement>(null);
  const destinationGlowRef = useRef<HTMLDivElement>(null);

  // The 4 Full-Screen Slides (Slide in from right, heading on the right side)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const slideInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  const slideShadesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const heroLayer = heroLayerRef.current;
    const heroLeftDoor = heroLeftDoorRef.current;
    const heroRightDoor = heroRightDoorRef.current;
    const heroContent = heroContentRef.current;

    const addressLayer = addressLayerRef.current;
    const addressStatement = addressStatementRef.current;
    const addressGlow = addressGlowRef.current;

    const destinationLayer = destinationLayerRef.current;
    const destinationStatement = destinationStatementRef.current;
    const destinationGlow = destinationGlowRef.current;

    if (
      !container ||
      !stage ||
      !heroLayer ||
      !heroLeftDoor ||
      !heroRightDoor ||
      !heroContent ||
      !addressLayer ||
      !addressStatement ||
      !addressGlow ||
      !destinationLayer ||
      !destinationStatement ||
      !destinationGlow
    ) {
      return;
    }

    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    const slideInners = slideInnersRef.current.filter(Boolean) as HTMLDivElement[];
    const slideShades = slideShadesRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // 1. Initial State Setup
        gsap.set(heroLayer, { opacity: 1, display: "block" });
        gsap.set(heroLeftDoor, { xPercent: 0 });
        gsap.set(heroRightDoor, { xPercent: 0 });
        gsap.set(heroContent, { opacity: 1, y: 0, scale: 1 });

        gsap.set(addressLayer, { opacity: 1, display: "flex" });
        gsap.set(addressStatement, {
          scale: 0.9,
          opacity: 0,
          filter: "blur(12px)",
          y: 25,
        });
        gsap.set(addressGlow, { scale: 0.6, opacity: 0 });

        gsap.set(destinationLayer, {
          yPercent: 100,
          opacity: 1,
          display: "flex",
          pointerEvents: "none",
        });
        gsap.set(destinationStatement, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        });
        gsap.set(destinationGlow, { scale: 1.2, opacity: 0.8 });

        slides.forEach((slide) => {
          gsap.set(slide, { xPercent: 100 });
        });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=650%",
            pin: stage,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        masterTl.to({}, { duration: 0.3 });

        masterTl.addLabel("heroSplit", 0.3);

        masterTl.to(
          heroContent,
          {
            opacity: 0,
            scale: 0.94,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "heroSplit"
        );

        masterTl.to(
          heroLeftDoor,
          {
            xPercent: -105,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "heroSplit+=0.1"
        );

        masterTl.to(
          heroRightDoor,
          {
            xPercent: 105,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "heroSplit+=0.1"
        );

        masterTl.to(
          addressGlow,
          {
            scale: 1.2,
            opacity: 0.8,
            duration: 1.3,
            ease: "power2.out",
          },
          "heroSplit+=0.3"
        );

        masterTl.to(
          addressStatement,
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1.3,
            ease: "power2.out",
          },
          "heroSplit+=0.3"
        );

        masterTl.to({}, { duration: 0.8 });

        masterTl.addLabel("toDestination");

        masterTl.to(
          addressStatement,
          {
            scale: 0.94,
            opacity: 0,
            filter: "blur(8px)",
            y: -40,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "toDestination"
        );

        masterTl.to(
          addressGlow,
          {
            opacity: 0,
            duration: 1.0,
            ease: "power2.out",
          },
          "toDestination"
        );

        masterTl.to(
          destinationLayer,
          {
            yPercent: 0,
            duration: 1.5,
            ease: "power2.out",
            pointerEvents: "auto",
          },
          "toDestination"
        );

        masterTl.to({}, { duration: 0.8 });

        for (let i = 0; i < slides.length; i++) {
          const label = `card_${i}`;
          masterTl.addLabel(label);

          masterTl.to(
            slides[i],
            {
              xPercent: 0,
              duration: 1.4,
              ease: "none",
            },
            label
          );

          if (i === 0) {
            masterTl.to(
              destinationStatement,
              {
                scale: 0.92,
                opacity: 0,
                filter: "blur(8px)",
                duration: 1.2,
                ease: "none",
              },
              label
            );
            masterTl.to(
              destinationGlow,
              {
                opacity: 0,
                duration: 1.0,
                ease: "none",
              },
              label
            );
          } else {
            if (slideInners[i - 1]) {
              masterTl.to(
                slideInners[i - 1],
                {
                  scale: 0.94,
                  duration: 1.3,
                  ease: "none",
                },
                label
              );
            }
            if (slideShades[i - 1]) {
              masterTl.to(
                slideShades[i - 1],
                {
                  opacity: 0.55,
                  duration: 1.3,
                  ease: "none",
                },
                label
              );
            }
          }

          masterTl.to({}, { duration: i === slides.length - 1 ? 1.0 : 0.7 });
        }
      });
    }, container);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleScrollDown = () => {
    if (containerRef.current) {
      const offsetTop =
        containerRef.current.offsetTop + containerRef.current.offsetHeight * 0.18;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#153D3D]">
      {/* Stage: vertical document on mobile, pinned viewport on md+ */}
      <div
        ref={stageRef}
        className="relative w-full h-auto md:h-[100dvh] overflow-visible md:overflow-hidden bg-[#153D3D] text-[#EDE5DA] flex flex-col"
      >
        {/* ========================================================= */}
        {/* TOP LAYER: Hero with Seamless Split Doors                 */}
        {/* ========================================================= */}
        <div
          ref={heroLayerRef}
          className="relative md:absolute inset-0 z-50 order-1 min-h-[100dvh] md:min-h-0 overflow-hidden pointer-events-none"
        >
          {/* Left Door */}
          <div
            ref={heroLeftDoorRef}
            className="absolute top-0 bottom-0 left-0 w-[calc(50%+1px)] overflow-hidden will-change-transform z-10"
          >
            <div className="absolute top-0 bottom-0 left-0 w-full h-full md:w-[200%]">
              <Image
                src="/images/orion-one/hero-lakefront.jpg"
                alt="Orion One Lakefront Horizon"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center filter brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-[#0a2222]/45" />
            </div>
          </div>

          {/* Right Door */}
          <div
            ref={heroRightDoorRef}
            className="absolute top-0 bottom-0 left-[50%] w-1/2 overflow-hidden will-change-transform z-10"
          >
            <div className="absolute top-0 bottom-0 left-0 md:-left-full w-full h-full md:w-[200%]">
              <Image
                src="/images/orion-one/hero-lakefront.jpg"
                alt="Orion One Lakefront Horizon"
                fill
                priority
                sizes="100vw"
                className="object-cover object-left md:object-center filter brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-[#0a2222]/45" />
            </div>
          </div>

          {/* Hero Typography & CTA */}
          <div
            ref={heroContentRef}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-8 pointer-events-auto will-change-transform pt-[calc(var(--header-h,5rem)+1rem)] md:pt-16"
          >
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="font-serif-heading text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#EDE5DA] leading-[1.06] uppercase">
                A New Horizon <br />
                <span className="italic font-normal text-sand-gradient normal-case">
                  of Luxury
                </span>
              </h1>

              <p className="font-serif-heading text-base sm:text-xl md:text-2xl text-[#EDE5DA] font-light italic max-w-2xl mx-auto">
                Where architecture flows like water and every view inspires
              </p>

              <p className="font-sans-body text-xs sm:text-sm md:text-base text-[#EDE5DA]/85 font-light max-w-2xl mx-auto leading-relaxed">
                Orion One brings contemporary architecture, lakefront living,
                curated commercial spaces, wellness, and community together in
                DHA Phase III, Islamabad.
              </p>

              <div className="pt-2">
                <p className="font-sans-body text-[11px] sm:text-xs tracking-[0.25em] text-[#62AA9E] uppercase font-semibold">
                  ORION ONE · DHA PHASE III · ISLAMABAD
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleScrollDown}
                  className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-9 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#62AA9E]/25 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Explore Orion One</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#EDE5DA]/50 pointer-events-none">
              <div className="w-4 h-7 rounded-full border border-[#EDE5DA]/30 flex items-start justify-center p-1">
                <div className="w-1 h-1.5 rounded-full bg-[#62AA9E] animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* UNDERNEATH LAYER 1: First Transition Page                 */}
        {/* ========================================================= */}
        <div
          ref={addressLayerRef}
          className="relative md:absolute inset-0 order-2 flex flex-col items-center justify-center px-4 sm:px-8 py-16 md:py-0 z-10 select-none bg-[#0a2222] min-h-[50vh] md:min-h-0"
        >
          <div
            ref={addressGlowRef}
            className="absolute w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-[#62AA9E]/15 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />

          <div
            ref={addressStatementRef}
            className="relative z-10 max-w-4xl text-center space-y-4 will-change-transform"
          >
            <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl xl:text-8xl font-light text-[#EDE5DA] leading-[1.06] uppercase">
              More Than An Address
            </h2>

            <p className="font-sans-body text-xs sm:text-sm md:text-base lg:text-lg text-[#C9BFB1] font-light max-w-2xl mx-auto leading-relaxed pt-1">
              A lakefront mixed-use development designed around architecture, nature, and everyday life.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* UNDERNEATH LAYER 2: Second Transition Page                */}
        {/* ========================================================= */}
        <div
          ref={destinationLayerRef}
          className="relative md:absolute inset-0 order-3 flex flex-col items-center justify-center px-4 sm:px-8 py-16 md:py-0 z-20 select-none bg-[#0a2222] will-change-transform md:shadow-[0_-25px_60px_rgba(0,0,0,0.6)] min-h-[50vh] md:min-h-0"
        >
          <div
            ref={destinationGlowRef}
            className="absolute w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-[#62AA9E]/15 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />

          <div
            ref={destinationStatementRef}
            className="relative z-10 max-w-4xl text-center space-y-4 will-change-transform"
          >
            <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl xl:text-8xl font-light leading-[1.06] uppercase">
              <span className="italic font-normal text-sand-gradient normal-case">
                A Destination
              </span>
            </h2>

            <p className="font-sans-body text-xs sm:text-sm md:text-base lg:text-lg text-[#C9BFB1] font-light max-w-2xl mx-auto leading-relaxed pt-1">
              Where the calm of the waterfront meets the convenience of contemporary urban living.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* THE 4 FULL-SCREEN SLIDES                                  */}
        {/* ========================================================= */}
        {DESTINATION_PILLARS.map((pillar, idx) => (
          <div
            key={pillar.id}
            ref={(el) => {
              slidesRef.current[idx] = el;
            }}
            className="relative md:absolute inset-0 order-4 w-full h-auto min-h-[70vh] md:min-h-0 md:h-full overflow-hidden will-change-transform bg-[#081a1a]"
            style={{ zIndex: 30 + idx }}
          >
            <div
              ref={(el) => {
                slideInnersRef.current[idx] = el;
              }}
              className="relative w-full h-full min-h-[70vh] md:min-h-0 will-change-transform"
            >
              <Image
                src={pillar.image}
                alt={pillar.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              <div
                ref={(el) => {
                  slideShadesRef.current[idx] = el;
                }}
                className="absolute inset-0 bg-[#081a1a] opacity-0 pointer-events-none z-[4]"
              />

              <div className="absolute top-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-b from-[#081a1a]/85 via-[#081a1a]/30 to-transparent pointer-events-none z-[3]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/45 via-40% to-transparent pointer-events-none z-[3]" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#081a1a]/85 via-[#081a1a]/25 to-transparent pointer-events-none z-[3]" />

              <div className="absolute right-6 sm:right-12 lg:right-16 xl:right-24 bottom-10 sm:bottom-16 lg:bottom-20 z-20 pointer-events-none select-none max-w-xl text-right">
                <h3 className="font-serif-heading text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-light uppercase text-[#EDE5DA] pr-2">
                  {pillar.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
