"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

export default function LocationUrbanEcosystem() {
  const triggerRef = useRef<HTMLElement>(null);
  const introHeadingRef = useRef<HTMLDivElement>(null);
  const introGlowRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerRef = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const trigger = triggerRef.current;
    const introHeading = introHeadingRef.current;
    const introGlow = introGlowRef.current;
    if (!trigger || !introHeading || !introGlow) return;

    const ctx = gsap.context(() => {
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
      const inners = innerRef.current.filter(Boolean) as HTMLDivElement[];
      const shades = shadeRef.current.filter(Boolean) as HTMLDivElement[];

      if (slides.length === 0) return;

      // 1. Initial State: All urban slides start translated off-screen to the left (-100%)
      for (let i = 0; i < slides.length; i++) {
        gsap.set(slides[i], { xPercent: -100 });
      }

      // Transition heading starts with soft optical focus
      gsap.set(introHeading, { scale: 0.9, opacity: 0, filter: "blur(12px)" });
      gsap.set(introGlow, { scale: 0.6, opacity: 0 });

      // 2. Master Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: `+=${(slides.length + 1) * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // PHASE 1: Transition Heading "EVERYTHING AROUND US" emerges on clear background
      tl.to(introHeading, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
      });
      tl.to(
        introGlow,
        {
          scale: 1.2,
          opacity: 0.85,
          duration: 1.2,
          ease: "power2.out",
        },
        "<"
      );

      // Dedicated pause to read the transition title card
      tl.to({}, { duration: 0.8 });

      // PHASE 2: Chain sequential slide entrances from the left
      for (let i = 0; i < slides.length; i++) {
        tl.to(slides[i], {
          xPercent: 0,
          ease: "none",
          duration: 1.2,
        });

        // When Slide 0 enters, smoothly fade out the transition heading
        if (i === 0) {
          tl.to(
            introHeading,
            {
              opacity: 0,
              scale: 1.05,
              filter: "blur(8px)",
              duration: 0.8,
              ease: "power2.in",
            },
            "<"
          );
          tl.to(
            introGlow,
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.in",
            },
            "<"
          );
        }

        // Depth scale and darkening shade on preceding slide
        if (i > 0 && inners[i - 1]) {
          tl.to(
            inners[i - 1],
            {
              scale: 0.94,
              ease: "none",
              duration: 1.2,
            },
            "<"
          );
        }

        if (i > 0 && shades[i - 1]) {
          tl.to(
            shades[i - 1],
            {
              opacity: 0.55,
              ease: "none",
              duration: 1.2,
            },
            "<"
          );
        }
      }
    }, triggerRef);

    // Refresh ScrollTrigger to account for exact layout positions
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
      id="urban-ecosystem"
      ref={triggerRef}
      className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#081a1a] z-20"
      aria-label="Everything Around Us — A Connected Urban Environment"
    >
      {/* ========================================================================= */}
      {/* CLEAR BACKGROUND WITH BIG TRANSITION HEADING: EVERYTHING AROUND US        */}
      {/* Seamless transition between Connected to DHA and Urban Ecosystem          */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 bg-[#081a1a] overflow-hidden">
        {/* Ambient center emerald glow */}
        <div
          ref={introGlowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#62AA9E]/15 rounded-full blur-[240px] pointer-events-none will-change-transform"
          aria-hidden="true"
        />

        <div
          ref={introHeadingRef}
          className="relative z-10 max-w-5xl space-y-4 will-change-transform"
        >
          <h2 className="font-serif-heading text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-light text-[#EDE5DA] leading-[1.02] uppercase">
            Everything <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Around Us
            </span>
          </h2>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THE 5 URBAN ECOSYSTEM SLIDES (SLIDE IN FROM LEFT OVER TRANSITION HEADING)  */}
      {/* ========================================================================= */}
      {URBAN_PARTS.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => {
            slidesRef.current[idx] = el;
          }}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform shadow-[25px_0_50px_rgba(0,0,0,0.65)] border-r border-[#EDE5DA]/15"
          style={{ zIndex: idx + 1 }}
        >
          {/* Inner Container: Handles subtle 3D depth scale */}
          <div
            ref={(el) => {
              innerRef.current[idx] = el;
            }}
            className="relative w-full h-full will-change-transform"
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

            {/* Dynamic Depth Shade Overlay (Dims previous slide as next one slides over from left) */}
            <div
              ref={(el) => {
                shadeRef.current[idx] = el;
              }}
              className="absolute inset-0 bg-[#081a1a] opacity-0 pointer-events-none z-[4]"
            />

            {/* Top Scrim */}
            <div className="absolute top-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-[#081a1a]/90 via-[#081a1a]/40 to-transparent pointer-events-none z-[3]" />

            {/* Bottom Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/60 via-45% to-transparent pointer-events-none z-[3]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#081a1a]/85 via-[#081a1a]/30 to-transparent pointer-events-none z-[3]" />

            {/* Bottom Content: Headline & Narrative */}
            <div className="absolute bottom-12 sm:bottom-20 lg:bottom-24 left-6 sm:left-12 lg:left-20 max-w-3xl z-10 space-y-3 sm:space-y-4">
              <h3 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.02] uppercase">
                {item.title}
              </h3>

              <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#EDE5DA]/85 font-light leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
