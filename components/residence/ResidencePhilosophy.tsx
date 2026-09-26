"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PhilosophyItem {
  id: string;
  title: string;
  imageSrc: string;
  alt: string;
}

const PHILOSOPHY_PILLARS: PhilosophyItem[] = [
  {
    id: "natural-light",
    title: "Natural Light",
    imageSrc: "/images/residence/pic-5.webp",
    alt: "Sunlit double-height living room with floor to ceiling windows at Orion One",
  },
  {
    id: "intelligent-planning",
    title: "Intelligent Planning",
    imageSrc: "/images/residence/pic-2.jpg",
    alt: "Intelligently planned garden apartment terrace at Orion One",
  },
  {
    id: "quality-finishes",
    title: "Quality Finishes",
    imageSrc: "/images/residence/pic-3.webp",
    alt: "Tactile stone finishes and architectural detailing at Orion One",
  },
  {
    id: "lake-views",
    title: "Lake Views",
    imageSrc: "/images/residence/pic-1.jpg",
    alt: "Spectacular terrace views overlooking the lake at Orion One",
  },
];

export default function ResidencePhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Alternating scroll-driven horizontal hover animation: Right -> Left -> Right -> Left
      cardsRef.current.forEach((card, idx) => {
        const img = imagesRef.current[idx];
        const heading = headingsRef.current[idx];
        if (!card || !img) return;

        // Even indices (1st, 3rd) hover towards right; Odd indices (2nd, 4th) hover towards left
        const movesRight = idx % 2 === 0;
        const startX = movesRight ? -8 : 8;
        const endX = movesRight ? 8 : -8;

        gsap.fromTo(
          img,
          {
            xPercent: startX,
          },
          {
            xPercent: endX,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );

        // Heading subtle majestic entrance and parallax
        if (heading) {
          gsap.fromTo(
            heading,
            {
              opacity: 0.6,
              y: 40,
            },
            {
              opacity: 1,
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      });
    }, sectionRef);

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
      id="philosophy"
      ref={sectionRef}
      className="relative w-full bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-t border-[#EDE5DA]/10"
      aria-label="Design Philosophy"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-[#62AA9E]/5 rounded-full blur-[200px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Intro Header */}
      <div
        ref={headerRef}
        className="w-full max-w-4xl mx-auto px-4 sm:px-12 py-16 sm:py-32 text-center flex flex-col items-center"
      >
        <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-[1.08] mb-4 sm:mb-6">
          Designed around the way you live
        </h2>
        <p className="font-sans-body text-xs sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
          Every residence is planned with deliberate attention to how space is
          experienced throughout the day, balancing human proportion, light,
          and privacy.
        </p>
      </div>

      {/* Fullscreen Philosophy Pillars */}
      <div className="w-full flex flex-col">
        {PHILOSOPHY_PILLARS.map((pillar, idx) => (
          <div
            key={pillar.id}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className="group relative w-full h-[60vh] sm:h-screen min-h-[420px] sm:min-h-[640px] overflow-hidden flex items-center justify-center border-b border-[#EDE5DA]/10 select-none"
          >
            {/* Full Screen Background Image that hovers/glides to the right on scroll */}
            <div
              ref={(el) => {
                imagesRef.current[idx] = el;
              }}
              className={`absolute -top-[10%] -bottom-[10%] -left-[20%] w-[140%] h-[120%] pointer-events-none will-change-transform transition-transform duration-700 ease-out ${
                idx % 2 === 0
                  ? "group-hover:translate-x-3"
                  : "group-hover:-translate-x-3"
              }`}
            >
              <Image
                src={pillar.imageSrc}
                alt={pillar.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center filter brightness-[0.82] contrast-[1.05]"
              />
            </div>

            {/* Subtle Vignette Gradient Overlay for Editorial Depth & High Heading Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/80 via-[#081a1a]/30 to-[#081a1a]/60 pointer-events-none" />

            {/* Center Content: Just the Heading, Nothing Else */}
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto pointer-events-none">
              <h2
                ref={(el) => {
                  headingsRef.current[idx] = el;
                }}
                className="font-serif-heading text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-[#EDE5DA] leading-[1.05]"
              >
                {pillar.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
