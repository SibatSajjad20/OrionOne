"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AmenityDomain {
  id: string;
  title: string;
  category: string;
  description: string;
  spaces: string[];
  image: string;
  alt: string;
}

const DOMAINS: AmenityDomain[] = [
  {
    id: "movement",
    title: "Movement & Recovery",
    category: "Wellness & Athletics",
    description:
      "A high-line training and restorative environment connecting the double-height fitness center, Finnish cedar sauna, and elevated running circuits overlooking panoramic lake vistas.",
    spaces: ["Fitness Center", "Elevated Jogging Track", "Steam & Sauna"],
    image: "/images/amenities/fitness-gym.jpg",
    alt: "Double-height fitness center and movement suites overlooking the lake",
  },
  {
    id: "water",
    title: "Water & Recreation",
    category: "Aquatics & Horizon",
    description:
      "Fluid architectural elements suspended gracefully above the shoreline, encompassing the elevated infinity pool, private balcony plunge pools, and botanical water gardens.",
    spaces: ["Infinity Pool", "Private Pool Residences", "Water Garden"],
    image: "/images/amenities/infinity-pool.jpg",
    alt: "Elevated infinity pool overlooking the open lake basin",
  },
  {
    id: "community",
    title: "Community & Sanctuary",
    category: "Gathering & Reflection",
    description:
      "Sanctuaries conceived for connection, neighborhood gathering, and daily spiritual reflection surrounded by open-air lakeside terraces, play areas, and serene water gardens.",
    spaces: ["Lakeside Social Terraces", "Kids' Play Area", "Mosque & Prayer Area"],
    image: "/images/amenities/water-garden.jpg",
    alt: "Landscaped water garden and peaceful gathering sanctuary",
  },
  {
    id: "arrival",
    title: "Arrival & Smart Living",
    category: "Hospitality & Security",
    description:
      "Discreet, intuitive hospitality paired with 24/7 dedicated concierge service, intelligent biometric access, and secure multi-level underground resident parking.",
    spaces: ["Concierge Welcome Lounge", "Smart Home Automation", "Basement Parking"],
    image: "/images/amenities/concierge.jpg",
    alt: "Concierge welcome lounge and reception lobby",
  },
];

interface AmenitiesInteractiveExplorerProps {
  onOpenInquiry?: () => void;
}

export default function AmenitiesInteractiveExplorer({
  onOpenInquiry,
}: AmenitiesInteractiveExplorerProps) {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const pinContainer = pinContainerRef.current;
    if (!pinContainer) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Full-Screen Pinned Upward Slide Transitions
      mm.add("(min-width: 1024px)", () => {
        const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
        const total = slides.length;
        if (total <= 1) return;

        // Slide 0 starts in view; subsequent slides parked below at translateY 100%
        slides.forEach((slide, i) => {
          gsap.set(slide, {
            yPercent: i === 0 ? 0 : 100,
            scale: 1,
            opacity: 1,
            zIndex: 10 + i * 10,
          });
        });

        // Pin full-screen container and scrub slide-up deck
        const tl = gsap.timeline({
          scrollTrigger: {
            id: "curated-spaces-pin",
            trigger: pinContainer,
            start: "top top",
            end: `+=${(total - 1) * 125}%`,
            pin: pinContainer,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Staggered upward slides
        for (let i = 0; i < total - 1; i++) {
          const startTime = i;

          // Outgoing slide smoothly recedes
          tl.to(
            slides[i],
            {
              scale: 0.94,
              opacity: 0.25,
              yPercent: -10,
              ease: "power1.inOut",
              duration: 1,
            },
            startTime
          );

          // Incoming slide slides UPWARDS from bottom to cover full screen
          tl.to(
            slides[i + 1],
            {
              yPercent: 0,
              ease: "power1.inOut",
              duration: 1,
            },
            startTime
          );

          // Image parallax inside incoming slide
          const imgInner = slides[i + 1].querySelector(".slide-image-inner");
          if (imgInner) {
            tl.fromTo(
              imgInner,
              { scale: 1.12 },
              { scale: 1, ease: "power1.inOut", duration: 1 },
              startTime
            );
          }
        }

        return () => {
          tl.kill();
        };
      });
    }, pinContainerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="relative w-full bg-[#081a1a] text-[#EDE5DA]"
      aria-label="Curated Spaces, Seamlessly Connected"
    >
      {/* Section Introductory Masthead */}
      <div className="w-full bg-[#081a1a] py-24 sm:py-32 border-b border-[#EDE5DA]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-[#62AA9E]" />
              <p className="font-sans-body text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
                The Everyday Experience
              </p>
            </div>

            <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
              Curated Spaces, <br />
              <span className="italic font-normal text-sand-gradient normal-case">
                Seamlessly Connected
              </span>
            </h2>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light leading-relaxed max-w-2xl pt-2">
              A complete everyday experience bringing essential lifestyle, fitness, wellness, and community facilities together within the development.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Experience: Full-Screen Pinned Upward Slide-Deck */}
      <div className="hidden lg:block">
        <div
          ref={pinContainerRef}
          className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[#081a1a]"
        >
          {DOMAINS.map((domain, idx) => (
            <div
              key={domain.id}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full bg-[#081a1a] border-t border-[#EDE5DA]/15 shadow-[0_-30px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-16 will-change-transform"
            >
              <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col justify-between">
                {/* Header Row: Category Eyebrow + Domain Title */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 sm:pb-8 border-b border-[#EDE5DA]/10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-[1px] bg-[#62AA9E]" />
                      <span className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.3em] text-[#62AA9E]">
                        {domain.category}
                      </span>
                    </div>
                    <h3 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08]">
                      {domain.title}
                    </h3>
                  </div>
                </div>

                {/* Body Row: Landscape Image (Left) + Info & Narrative (Right) */}
                <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center flex-1 my-auto py-6">
                  {/* Left Column: Landscape Image Card */}
                  <div className="col-span-12 lg:col-span-6 flex items-center">
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-2xl group">
                      <div className="slide-image-inner relative w-full h-full">
                        <Image
                          src={domain.image}
                          alt={domain.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          priority={idx === 0}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Right Column: Narrative & Key Spaces */}
                  <div className="col-span-12 lg:col-span-6 flex flex-col justify-center space-y-8 lg:pl-6">
                    <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light leading-relaxed max-w-xl">
                      {domain.description}
                    </p>

                    {/* Integrated Spaces List */}
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#EDE5DA]/50 mb-3">
                        Featured Facilities
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#EDE5DA] font-sans-body font-light">
                        {domain.spaces.map((space, sIdx) => (
                          <span key={space} className="flex items-center gap-4">
                            <span>{space}</span>
                            {sIdx < domain.spaces.length - 1 && (
                              <span className="text-[#62AA9E]/40 select-none">
                                •
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onOpenInquiry?.()}
                        className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] hover:border-[#62AA9E]/50 border border-[#EDE5DA]/20 px-7 py-3.5 rounded-full transition-all duration-300 backdrop-blur-md shadow-md cursor-pointer hover:-translate-y-0.5"
                      >
                        <span>Inquire About Spaces</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Experience: Sticky Upward Stacking Cards */}
      <div className="lg:hidden py-16 px-4 sm:px-8 space-y-8">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {DOMAINS.map((domain) => (
            <div
              key={domain.id}
              className="relative sm:sticky sm:top-24 bg-[#0d2828] rounded-xl border border-[#EDE5DA]/15 p-5 sm:p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.85)] space-y-5"
            >
              {/* Header: Category & Title */}
              <div className="border-b border-[#EDE5DA]/10 pb-4 space-y-1">
                <span className="font-sans-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[#62AA9E]">
                  {domain.category}
                </span>
                <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
                  {domain.title}
                </h3>
              </div>

              {/* Landscape Image */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#081a1a] border border-[#EDE5DA]/15 shadow-xl">
                <Image
                  src={domain.image}
                  alt={domain.alt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Narrative Content */}
              <div className="space-y-4 pt-1">
                <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                  {domain.description}
                </p>

                {/* Spaces List */}
                <div className="pt-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA]/50 mb-2">
                    Featured Facilities
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#EDE5DA] font-sans-body font-light">
                    {domain.spaces.map((space, sIdx) => (
                      <span key={space} className="flex items-center gap-3">
                        <span>{space}</span>
                        {sIdx < domain.spaces.length - 1 && (
                          <span className="text-[#62AA9E]/40 select-none">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.()}
                    className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA] bg-[#153D3D] hover:bg-[#153D3D]/80 border border-[#EDE5DA]/20 px-6 py-3 rounded-full transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Inquire About Spaces</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
