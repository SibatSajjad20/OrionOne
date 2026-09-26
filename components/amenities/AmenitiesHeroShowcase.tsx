"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowDown, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SignatureSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const SIGNATURE_SLIDES: SignatureSlide[] = [
  {
    id: "pool",
    title: "Lake-Facing Infinity Pool",
    description:
      "An elevated infinity pool overlooking the lake, creating a resort-style setting above the waterfront with undisturbed horizon vistas.",
    image: "/images/amenities/infinity-pool.jpg",
    alt: "Elevated Infinity Pool Overlooking the Lake at Orion One",
  },
  {
    id: "fitness",
    title: "Double-Height Fitness Center",
    description:
      "A premium fitness environment connected to elevated and outdoor jogging tracks, designed to support regular training and active living.",
    image: "/images/amenities/fitness-gym.jpg",
    alt: "Double-Height Fitness Center and Movement Suites",
  },
  {
    id: "spa",
    title: "Wellness Spa & Recovery",
    description:
      "Dedicated spaces for personal care, relaxation, steam, sauna, and restorative wellbeing overlooking lush landscaped courtyards.",
    image: "/images/amenities/spa.jpg",
    alt: "Wellness Spa and Steam Recovery Facilities",
  },
  {
    id: "dining",
    title: "Dining Within Reach",
    description:
      "Cafés and restaurants form part of the Orion One experience, bringing food, social activity, and waterfront views into the development.",
    image: "/images/amenities/dining.jpg",
    alt: "Waterfront Dining Terraces and Social Promenade",
  },
  {
    id: "concierge",
    title: "Concierge & Arrival Lounge",
    description:
      "A dedicated arrival experience designed to support residents and visitors with discreet, intuitive hospitality and seamless service.",
    image: "/images/amenities/concierge.jpg",
    alt: "Concierge and Welcome Lounge Arrival Experience",
  },
];

interface AmenitiesHeroShowcaseProps {
  onOpenInquiry?: () => void;
}

export default function AmenitiesHeroShowcase({
  onOpenInquiry,
}: AmenitiesHeroShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Layer 0: Hero
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Layer 1: Transition Page ("Signature Environments")
  const transitionLayerRef = useRef<HTMLDivElement>(null);
  const transitionInnerRef = useRef<HTMLDivElement>(null);
  const transitionShadeRef = useRef<HTMLDivElement>(null);

  // Layers 2..6: The 5 Full-Screen Slides
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const slideInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  const slideShadesRef = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const heroLayer = heroLayerRef.current;
    const heroContent = heroContentRef.current;
    const transitionLayer = transitionLayerRef.current;
    const transitionInner = transitionInnerRef.current;

    if (
      !container ||
      !stage ||
      !heroLayer ||
      !heroContent ||
      !transitionLayer ||
      !transitionInner
    )
      return;

    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    const slideInners = slideInnersRef.current.filter(Boolean) as HTMLDivElement[];
    const slideShades = slideShadesRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      
      gsap.set(heroLayer, { opacity: 1, pointerEvents: "auto", display: "flex" });
      gsap.set(heroContent, { scale: 1, opacity: 1 });

      gsap.fromTo(
        heroContent,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      gsap.set(transitionLayer, { yPercent: 100 });

      slides.forEach((slide) => {
        gsap.set(slide, { xPercent: 100 });
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=550%",
          pin: stage,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTriggerInstanceRef.current = masterTl.scrollTrigger || null;

      masterTl.to({}, { duration: 0.1 });

      masterTl.addLabel("transitionUp", 0.1);

      masterTl.to(
        transitionLayer,
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        "transitionUp"
      );

      masterTl.to(
        heroContent,
        {
          scale: 0.94,
          opacity: 0.15,
          duration: 0.9,
          ease: "power2.out",
        },
        "transitionUp"
      );

      masterTl.to({}, { duration: 0.5 });

      for (let i = 0; i < slides.length; i++) {
        const label = `slide_${i}`;
        masterTl.addLabel(label);

        masterTl.to(
          slides[i],
          {
            xPercent: 0,
            duration: 1.2,
            ease: "none",
          },
          label
        );

        if (i === 0) {
          masterTl.to(
            transitionInner,
            {
              scale: 0.94,
              duration: 1.2,
              ease: "none",
            },
            label
          );
          if (transitionShadeRef.current) {
            masterTl.to(
              transitionShadeRef.current,
              {
                opacity: 0.65,
                duration: 1.2,
                ease: "none",
              },
              label
            );
          }
        } else {
          if (slideInners[i - 1]) {
            masterTl.to(
              slideInners[i - 1],
              {
                scale: 0.94,
                duration: 1.2,
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
                duration: 1.2,
                ease: "none",
              },
              label
            );
          }
        }

        masterTl.to({}, { duration: i === slides.length - 1 ? 1.0 : 0.7 });
      }

      return () => {
        scrollTriggerInstanceRef.current = null;
      };
    
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Jump to collection transition via button
  const scrollToExplore = () => {
    const st = scrollTriggerInstanceRef.current;
    if (st) {
      const targetScroll = st.start + 0.09 * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#081a1a] text-[#EDE5DA]"
      aria-label="Amenities Hero & Signature Environments Showcase"
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="relative w-full h-[100dvh] overflow-hidden will-change-transform"
      >
        {/* ========================================================================= */}
        {/* LAYER 0: HERO SECTION (HEADING ONLY, NO IMAGE)                            */}
        {/* ========================================================================= */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 lg:px-16 bg-[#153D3D] text-[#EDE5DA] overflow-hidden"
        >
          {/* Ambient background glow vignette */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#62AA9E]/10 rounded-full blur-[260px] pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div
            ref={heroContentRef}
            className="max-w-4xl mx-auto space-y-6 sm:space-y-8 will-change-transform"
          >
            <h1 className="font-serif-heading text-3xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-light text-[#EDE5DA] leading-[1.02] uppercase">
              Designed Around <br />
              <span className="italic font-normal text-sand-gradient normal-case">
                How You Live
              </span>
            </h1>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light leading-relaxed max-w-2xl mx-auto">
              A considered collection of amenities for fitness, wellness, recreation, convenience, and everyday living.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto">
              <button
                type="button"
                onClick={scrollToExplore}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#62AA9E]/20 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] hover:border-[#62AA9E]/50 border border-[#EDE5DA]/20 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-md uppercase cursor-pointer hover:-translate-y-0.5"
              >
                <span>Book a Private Tour</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 1: TRANSITION PAGE (SLIDES FROM BOTTOM UPWARDS)                     */}
        {/* "that just has a Signature Environments text in the center"               */}
        {/* ========================================================================= */}
        <div
          ref={transitionLayerRef}
          className="absolute inset-0 z-20 w-full h-full overflow-hidden will-change-transform bg-[#081a1a]"
        >
          <div
            ref={transitionInnerRef}
            className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 will-change-transform"
          >
            {/* Darkening shade when first slide covers it */}
            <div
              ref={transitionShadeRef}
              className="absolute inset-0 bg-[#081a1a] opacity-0 pointer-events-none z-[4]"
            />

            {/* Ambient center emerald glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#62AA9E]/12 rounded-full blur-[240px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Centered "Signature Environments" Text */}
            <div className="relative z-10 max-w-5xl space-y-4">
              <h2 className="font-serif-heading text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-[#EDE5DA] leading-[1.02] uppercase">
                Signature <br />
                <span className="italic font-normal text-sand-gradient normal-case">
                  Environments
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYERS 2..6: THE 5 FULL-SCREEN TABS / SLIDES (SLIDE FROM RIGHT)           */}
        {/* ========================================================================= */}
        {SIGNATURE_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            ref={(el) => {
              slidesRef.current[idx] = el;
            }}
            className="absolute inset-0 w-full h-full overflow-hidden will-change-transform bg-[#081a1a]"
            style={{ zIndex: 30 + idx }}
          >
            {/* Inner Container: Handles subtle 3D depth scale */}
            <div
              ref={(el) => {
                slideInnersRef.current[idx] = el;
              }}
              className="relative w-full h-full will-change-transform"
            >
              {/* Full-bleed Architectural Photography */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Dynamic Depth Shade Overlay when subsequent slide enters */}
              <div
                ref={(el) => {
                  slideShadesRef.current[idx] = el;
                }}
                className="absolute inset-0 bg-[#081a1a] opacity-0 pointer-events-none z-[4]"
              />

              {/* Scrims for text contrast */}
              <div className="absolute top-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-[#081a1a]/90 via-[#081a1a]/40 to-transparent pointer-events-none z-[3]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/60 via-45% to-transparent pointer-events-none z-[3]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#081a1a]/85 via-[#081a1a]/30 to-transparent pointer-events-none z-[3]" />

              {/* Bottom Content: Headline & Narrative */}
              <div className="absolute bottom-8 sm:bottom-20 lg:bottom-24 left-4 sm:left-8 lg:left-16 max-w-3xl z-10 space-y-2 sm:space-y-4 pr-4 sm:pr-8">
                <h3 className="font-serif-heading text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-[1.08]">
                  {slide.title}
                </h3>

                <p className="font-sans-body text-xs sm:text-base lg:text-lg text-[#EDE5DA]/90 font-light leading-relaxed max-w-2xl">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
