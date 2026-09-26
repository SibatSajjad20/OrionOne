"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GlideSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const GLIDE_SLIDES: GlideSlide[] = [
  {
    id: "pool",
    title: "Lake-Facing Infinity Pool",
    description:
      "An elevated infinity pool overlooking the lake, creating a resort-style setting above the waterfront.",
    image: "/images/amenities/infinity-pool.jpg",
    alt: "Elevated Infinity Pool Overlooking the Lake",
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
      "Dedicated spaces for personal care, relaxation, steam, sauna, and restorative wellbeing.",
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
    id: "arrival",
    title: "Concierge & Arrival Lounge",
    description:
      "A dedicated arrival experience designed to support residents and visitors with discreet, intuitive hospitality.",
    image: "/images/amenities/concierge.jpg",
    alt: "Concierge and Welcome Lounge Arrival Experience",
  },
];

export default function AmenitiesHorizontalGlide() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet: Pinned Horizontal Glide scrolling from Right to Left
      mm.add("(min-width: 768px)", () => {
        const getScrollDistance = () => {
          return -(track.scrollWidth - window.innerWidth + 120);
        };

        const tween = gsap.to(track, {
          x: () => getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Add subtle counter-parallax to inner images
        const images = track.querySelectorAll(".glide-image-inner");
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: 8 },
            {
              xPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
                scrub: 0.8,
              },
            }
          );
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
      id="horizontal-showcase"
      ref={containerRef}
      className="relative w-full bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-y border-[#EDE5DA]/15"
      aria-label="Flagship Amenities Horizontal Glide Showcase"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-[#62AA9E]/4 rounded-full blur-[260px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Stage Header */}
      <div className="pt-20 sm:pt-24 pb-4 px-4 sm:px-8 lg:px-16 max-w-[1500px] mx-auto text-center">
        <h2 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
          Signature <br />
          <span className="italic font-normal text-sand-gradient normal-case">
            Environments
          </span>
        </h2>
      </div>

      {/* Horizontal Sliding Track (Desktop) / Native Fluid Stack (Mobile) */}
      <div className="py-8 sm:py-12 md:py-16 overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row items-stretch gap-6 md:gap-10 px-4 sm:px-8 lg:px-16 w-full md:w-max will-change-transform"
        >
          {GLIDE_SLIDES.map((slide) => (
            <article
              key={slide.id}
              className="glide-panel relative w-full md:w-[72vw] lg:w-[62vw] max-w-[1000px] h-[480px] sm:h-[540px] md:h-[65vh] shrink-0 rounded-2xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-2xl flex flex-col justify-end group transition-colors duration-500 hover:border-[#62AA9E]/40"
            >
              {/* Full-bleed Architectural Image Container with Counter-Parallax */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="glide-image-inner relative w-[116%] h-full -left-[8%]">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 75vw"
                    className="object-cover object-center transition-transform duration-[2500ms] group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Scrims for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/50 via-45% to-transparent pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#081a1a]/70 via-[#081a1a]/20 to-transparent pointer-events-none z-10" />

              {/* Editorial Typography (Cleanly positioned at bottom) */}
              <div className="relative z-20 p-6 sm:p-10 lg:p-12 max-w-2xl space-y-3">
                <h3 className="font-serif-heading text-2xl sm:text-4xl text-[#EDE5DA] font-light leading-snug">
                  {slide.title}
                </h3>
                <p className="font-sans-body text-xs sm:text-sm sm:text-base text-[#EDE5DA]/85 font-light leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
