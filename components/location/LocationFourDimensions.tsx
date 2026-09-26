"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Home, Briefcase, Sparkles, Route } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DIMENSIONS = [
  {
    id: "home",
    number: "01",
    dimension: "Home",
    headline: "Lakefront Residences",
    description:
      "Serene lakefront residences within DHA Phase III, offering private panoramic balconies, natural light, and undisturbed waterside living.",
    image: "/images/about/lakefront-balcony.jpg",
    alt: "Private lakefront residences and panoramic balconies overlooking the water",
    icon: Home,
  },
  {
    id: "business",
    number: "02",
    dimension: "Business",
    headline: "Commercial Spaces",
    description:
      "Commercial spaces positioned within a growing mixed-use environment, backed by captive residential footfall and high-visibility promenade frontage.",
    image: "/images/commercial/retail-arcade.jpg",
    alt: "Modern retail arcade and curated commercial terraces at Orion One",
    icon: Briefcase,
  },
  {
    id: "leisure",
    number: "03",
    dimension: "Leisure",
    headline: "Waterfront Recreation",
    description:
      "Dining, recreation, parks, and community destinations nearby, bringing active leisure and relaxed evenings steps from your front door.",
    image: "/images/lakeside/promenade-deck.jpg",
    alt: "Lakefront promenade, botanical trails, and recreational outdoor decks",
    icon: Sparkles,
  },
  {
    id: "connectivity",
    number: "04",
    dimension: "Connectivity",
    headline: "Regional Road Networks",
    description:
      "Road networks connecting DHA with Islamabad and Rawalpindi, providing quick, predictable transit across the twin cities and international airport.",
    image: "/images/location/dha-phase3-map.jpg",
    alt: "Masterplan map showing strategic road networks connecting DHA with twin cities",
    icon: Route,
  },
];

export default function LocationFourDimensions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !header || !cardsContainer) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        header,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Cards entrance
      const cards = cardsContainer.querySelectorAll(".dimension-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="four-dimensions"
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="Location That Connects"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-[#62AA9E]/4 rounded-full blur-[260px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-4xl mb-14 sm:mb-20 space-y-4 will-change-transform">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#62AA9E]" />
            <span className="font-sans-body text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
              Multidimensional Integration
            </span>
          </div>

          <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Location That <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Connects
            </span>
          </h2>

          <p className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA]/90 font-light leading-snug">
            Residential · Commercial · Lifestyle
          </p>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            Orion One&apos;s location supports more than residential living. It weaves together home, business, leisure, and regional access into an enduring waterfront address.
          </p>
        </div>

        {/* 4 Architectural Dimension Cards: Strictly symmetrical, top-aligned, zero text on images */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch"
        >
          {DIMENSIONS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="dimension-card rounded-2xl bg-[#0d2828] border border-[#EDE5DA]/15 p-6 sm:p-7 shadow-xl flex flex-col justify-between group transition-all duration-300 hover:border-[#62AA9E]/40"
              >
                <div>
                  {/* Clean Architectural Photo - No text on image */}
                  <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-[#081a1a] border border-[#EDE5DA]/10 shrink-0 mb-6">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-[2500ms] group-hover:scale-105"
                    />
                  </div>

                  {/* Header Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#EDE5DA]/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#153D3D] border border-[#EDE5DA]/15 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#62AA9E]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest font-medium">
                        {item.dimension}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#808080]">
                      {item.number}
                    </span>
                  </div>

                  {/* Narrative Content */}
                  <div className="pt-4 space-y-2">
                    <h3 className="font-serif-heading text-2xl text-[#EDE5DA] font-light leading-snug">
                      {item.headline}
                    </h3>
                    <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EDE5DA]/10 flex items-center justify-between text-[11px] font-sans-body text-[#62AA9E]">
                  <span>Integrated Realm</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#62AA9E]" />
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
