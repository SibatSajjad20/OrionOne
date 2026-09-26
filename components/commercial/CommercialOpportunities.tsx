"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OpportunityItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const OPPORTUNITIES: OpportunityItem[] = [
  {
    id: "restaurants",
    title: "Signature Restaurants",
    description:
      "Destination dining concepts with a strong visual and experiential identity, connected to waterfront terraces.",
    image: "/images/commercial/slide-dining.jpg",
    alt: "Signature Restaurants Waterfront Dining Terrace",
  },
  {
    id: "cafes",
    title: "Premium Cafés",
    description:
      "Contemporary café concepts designed for everyday visits, morning rituals, and social occasions.",
    image: "/images/commercial/slide-deck.jpg",
    alt: "Premium Cafés and Terrace Lounge",
  },
  {
    id: "retail",
    title: "Boutique Retail",
    description:
      "Curated brands and retail experiences that complement the architectural character of the development.",
    image: "/images/commercial/slide-retail.jpg",
    alt: "Boutique Retail Arcade and Galleria",
  },
  {
    id: "offices",
    title: "Corporate Offices",
    description:
      "A premium setting for businesses and private family offices seeking a distinctive commercial address.",
    image: "/images/commercial/slide-podium.jpg",
    alt: "Corporate Offices and Commercial Podium",
  },
  {
    id: "lifestyle",
    title: "Lifestyle Businesses",
    description:
      "Concepts serving contemporary living, wellness, leisure, and everyday needs for residents and visitors.",
    image: "/images/about/wellness-pool.png",
    alt: "Lifestyle and Wellness Spaces",
  },
];

export default function CommercialOpportunities() {
  const triggerRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerRef = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
        const inners = innerRef.current.filter(Boolean) as HTMLDivElement[];
        const shades = shadeRef.current.filter(Boolean) as HTMLDivElement[];

        if (slides.length <= 1) return;

        for (let i = 1; i < slides.length; i++) {
          gsap.set(slides[i], { yPercent: 100 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: `+=${(slides.length - 1) * 100}%`,
            pin: true,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        for (let i = 1; i < slides.length; i++) {
          tl.to(slides[i], {
            yPercent: 0,
            ease: "none",
            duration: 1,
          });

          if (inners[i - 1]) {
            tl.to(
              inners[i - 1],
              {
                scale: 0.94,
                ease: "none",
                duration: 1,
              },
              "<"
            );
          }

          if (shades[i - 1]) {
            tl.to(
              shades[i - 1],
              {
                opacity: 0.5,
                ease: "none",
                duration: 1,
              },
              "<"
            );
          }
        }
      });
    }, triggerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="opportunities"
      ref={triggerRef}
      className="relative w-full h-auto md:h-[100dvh] overflow-visible md:overflow-hidden bg-[#081a1a] z-20 flex flex-col md:block"
      aria-label="Commercial Spaces Showcase"
    >
      {OPPORTUNITIES.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => {
            slidesRef.current[idx] = el;
          }}
          className="relative md:absolute inset-0 w-full h-auto min-h-[70vh] md:min-h-0 md:h-full overflow-hidden will-change-transform md:shadow-[0_-15px_35px_rgba(0,0,0,0.5)] md:border-t border-[#EDE5DA]/10"
          style={{ zIndex: idx + 1 }}
        >
          {/* Inner Container: Handles Subtle 3D Receding Depth */}
          <div
            ref={(el) => {
              innerRef.current[idx] = el;
            }}
            className="relative w-full h-full min-h-[70vh] md:min-h-0 will-change-transform"
          >
            {/* Full-bleed Imagery */}
            <Image
              src={item.image}
              alt={item.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Dynamic Depth Shade Overlay (Dims previous slide as next one slides over) */}
            <div
              ref={(el) => {
                shadeRef.current[idx] = el;
              }}
              className="absolute inset-0 bg-[#081a1a] opacity-0 pointer-events-none z-[4]"
            />

            {/* Top Scrim (Protects Fixed Header Legibility) */}
            <div className="absolute top-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-b from-[#081a1a]/85 via-[#081a1a]/35 to-transparent pointer-events-none z-[3]" />

            {/* Bottom Scrim (Ensures Crisp Typography) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/55 via-45% to-transparent pointer-events-none z-[3]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#081a1a]/80 via-[#081a1a]/25 to-transparent pointer-events-none z-[3]" />

            {/* Typography Overlay: Heading & Subheading only (No labels on bottom right corner) */}
            <div className="absolute bottom-8 sm:bottom-20 lg:bottom-24 left-4 sm:left-12 lg:left-20 max-w-3xl z-10 pr-4">
              <h3 className="font-serif-heading text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] mb-2 sm:mb-4">
                {item.title}
              </h3>
              <p className="font-sans-body text-xs sm:text-base lg:text-lg text-[#EDE5DA]/85 font-light leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
