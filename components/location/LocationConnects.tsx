"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { scrollToY } from "@/lib/scrollTo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Dimension {
  category: string;
  headline: string;
  description: string;
  image: string;
  alt: string;
}

const DIMENSIONS: Dimension[] = [
  {
    category: "Home",
    headline: "Lakefront Residences",
    description:
      "A distinctive waterfront position within DHA Phase III, oriented around open horizons and serene waters.",
    image: "/images/orion-one/lakefront-view.jpg",
    alt: "Lakefront Residences overlooking the water at Orion One",
  },
  {
    category: "Business",
    headline: "Commercial Spaces",
    description:
      "Commercial spaces positioned within a growing mixed-use environment, backed by captive resident footfall.",
    image: "/images/location/urban-business.jpg",
    alt: "Commercial spaces and waterfront promenade at Orion One",
  },
  {
    category: "Leisure",
    headline: "Everyday Recreation",
    description:
      "Dining, recreation, parks, and community destinations nearby, bringing active leisure steps from your door.",
    image: "/images/lakeside/hero-lake.jpg",
    alt: "Lakeside leisure and recreation horizon at Orion One",
  },
  {
    category: "Connectivity",
    headline: "Regional Networks",
    description:
      "Direct road networks connecting DHA Phase III with Islamabad, Rawalpindi, and the international airport.",
    image: "/images/location/lakeview-commercial-aerial.jpg",
    alt: "Regional road connectivity in Sector F DHA Phase III",
  },
];

export default function LocationConnects() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopShellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const mobileStackRef = useRef<HTMLDivElement>(null);

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
          if (desktopShellRef.current) {
            desktopShellRef.current.style.height = "auto";
          }
          return;
        }

        if (isDesktop && desktopShellRef.current && trackRef.current) {
          const shell = desktopShellRef.current;
          const track = trackRef.current;

          const getMaxTranslate = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const syncShellHeight = () => {
            const distance = getMaxTranslate();
            shell.style.height = `${window.innerHeight + distance}px`;
          };

          syncShellHeight();
          window.addEventListener("resize", syncShellHeight);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: shell,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          });

          // Horizontal track translation
          tl.to(
            track,
            {
              x: () => -getMaxTranslate(),
              ease: "none",
              duration: 1,
            },
            0
          );

          // Title lines drift at opposite x rates (+/-10%)
          if (titleLine1Ref.current) {
            tl.fromTo(
              titleLine1Ref.current,
              { xPercent: 10 },
              { xPercent: -10, ease: "none", duration: 1 },
              0
            );
          }

          if (titleLine2Ref.current) {
            tl.fromTo(
              titleLine2Ref.current,
              { xPercent: -10 },
              { xPercent: 10, ease: "none", duration: 1 },
              0
            );
          }

          // Mint 1px progress under track
          if (progressFillRef.current) {
            tl.fromTo(
              progressFillRef.current,
              { scaleX: 0 },
              { scaleX: 1, ease: "none", duration: 1 },
              0
            );
          }

          return () => {
            window.removeEventListener("resize", syncShellHeight);
            shell.style.height = "";
          };
        }

        if (isMobile && mobileStackRef.current) {
          const cards =
            mobileStackRef.current.querySelectorAll(".dimension-mobile-card");
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              {
                clipPath: "inset(10% 4% 10% 4% round 16px)",
                opacity: 0.35,
              },
              {
                clipPath: "inset(0% 0% 0% 0% round 16px)",
                opacity: 1,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 86%",
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

  const handleCardClick = (index: number) => {
    const shell = desktopShellRef.current;
    const track = trackRef.current;
    if (!shell || !track || window.innerWidth < 1024) return;

    const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
    if (maxTranslate <= 0) return;

    const shellTop = window.scrollY + shell.getBoundingClientRect().top;
    const ratio =
      DIMENSIONS.length > 1 ? index / (DIMENSIONS.length - 1) : 0;
    const targetY = shellTop + ratio * maxTranslate;
    scrollToY(targetY);
  };

  return (
    <section
      id="location-connects"
      ref={sectionRef}
      data-bg="moss"
      className="relative bg-[#081a1a] text-[#EDE5DA] border-b border-[#EDE5DA]/15"
      aria-label="Location That Connects"
    >
      {/* Ambient background glow vignette */}
      <div
        className="
          pointer-events-none absolute top-1/2 right-1/3 -z-10
          w-[800px] h-[800px] rounded-full bg-[#62AA9E]/4 blur-[260px]
        "
        aria-hidden="true"
      />

      {/* =================================================================== */}
      {/* DESKTOP (>=1024px): Sticky 100vh Horizontal Scrub Stage             */}
      {/* =================================================================== */}
      <div
        ref={desktopShellRef}
        className="hidden lg:block relative w-full h-[280vh]"
      >
        <div
          className="
            sticky top-0 h-screen w-full overflow-hidden
            flex flex-col justify-between py-6 lg:py-8 xl:py-10
          "
        >
          {/* Top Header with Counter-Drifting Title Lines */}
          <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-16 flex items-end justify-between">
            <div className="space-y-1.5 xl:space-y-2">
              <p className="font-serif-heading text-xs lg:text-sm xl:text-base text-[#62AA9E] tracking-wide">
                Residential · Commercial · Lifestyle
              </p>
              <h2 className="font-serif-heading font-luxia-display text-3xl lg:text-4xl xl:text-5xl text-[#EDE5DA] tracking-tight leading-[1.06]">
                <span
                  ref={titleLine1Ref}
                  className="block will-change-transform"
                >
                  Location That
                </span>
                <span
                  ref={titleLine2Ref}
                  className="block font-normal text-sand-gradient normal-case will-change-transform"
                >
                  Connects
                </span>
              </h2>
            </div>
          </div>

          {/* Horizontal Track of 4 Dimension Cards */}
          <div className="relative w-full overflow-visible my-auto py-2 xl:py-3">
            <div
              ref={trackRef}
              className="
                flex items-stretch gap-6 xl:gap-8 px-8 lg:px-16 w-max
                will-change-transform
              "
            >
              {DIMENSIONS.map((dim, idx) => (
                <article
                  key={dim.category}
                  onClick={() => handleCardClick(idx)}
                  className="
                    group relative w-[360px] lg:w-[400px] xl:w-[440px] 2xl:w-[480px] shrink-0
                    rounded-2xl overflow-hidden bg-[#0d2828]/80
                    border border-[#EDE5DA]/15 hover:border-[#62AA9E]/45
                    transition-colors duration-300 cursor-pointer
                    flex flex-col justify-between
                  "
                >
                  {/* Lake/Moss Visual Header */}
                  <div className="relative aspect-[16/9] max-h-[220px] xl:max-h-[240px] w-full overflow-hidden bg-[#081a1a] border-b border-[#EDE5DA]/10 shrink-0">
                    <Image
                      src={dim.image}
                      alt={dim.alt}
                      fill
                      sizes="(max-width: 1280px) 400px, 480px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0d2828] via-[#0d2828]/25 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Dimension Copy */}
                  <div className="p-5 xl:p-6 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="font-serif-heading font-luxia-display text-2xl xl:text-3xl text-[#EDE5DA] tracking-tight leading-[1.1] group-hover:text-[#62AA9E] transition-colors">
                        {dim.category}
                      </h3>
                      <span className="font-sans-body text-sm xl:text-base text-[#EDE5DA]/90 font-medium block leading-snug">
                        {dim.headline}
                      </span>
                    </div>
                    <p className="font-sans-body text-xs xl:text-sm text-[#C9BFB1] font-light leading-relaxed">
                      {dim.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mint 1px Progress Under Track */}
          <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-16 pt-2">
            <div className="relative h-[1px] w-full bg-[#EDE5DA]/15 overflow-hidden">
              <div
                ref={progressFillRef}
                className="h-full w-full bg-[#62AA9E] origin-left scale-x-0 will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MOBILE (<1024px): Stacked Cards with Clip-Path Inset Reveal         */}
      {/* =================================================================== */}
      <div className="lg:hidden py-16 sm:py-24 px-4 sm:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="font-serif-heading font-luxia-display text-3xl sm:text-5xl text-[#EDE5DA] tracking-tight leading-[1.08]">
            Location That <br />
            <span className="font-normal text-sand-gradient normal-case">
              Connects
            </span>
          </h2>

          <p className="font-serif-heading text-base sm:text-xl text-[#62AA9E] leading-snug">
            Residential · Commercial · Lifestyle
          </p>
        </div>

        <div
          ref={mobileStackRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#EDE5DA]/15"
        >
          {DIMENSIONS.map((dim) => (
            <article
              key={dim.category}
              className="dimension-mobile-card rounded-2xl overflow-hidden bg-[#0d2828]/80 border border-[#EDE5DA]/15 flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#081a1a]">
                <Image
                  src={dim.image}
                  alt={dim.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0d2828] via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              <div className="p-6 space-y-2.5">
                <h3 className="font-serif-heading font-luxia-display text-2xl sm:text-3xl text-[#EDE5DA] tracking-tight leading-[1.1]">
                  {dim.category}
                </h3>
                <span className="font-sans-body text-base text-[#EDE5DA]/90 font-medium block leading-snug">
                  {dim.headline}
                </span>
                <p className="font-sans-body text-sm text-[#C9BFB1] font-light leading-relaxed">
                  {dim.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
