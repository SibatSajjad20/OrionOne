"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DestinationCard {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const DESTINATION_CARDS: DestinationCard[] = [
  {
    id: "promenade",
    title: "Lakefront Promenade",
    description:
      "Continuous paved walking and jogging paths shaped along the shoreline edge, offering morning stillness and panoramic open water views.",
    image: "/images/lakeside/promenade-deck.jpg",
    alt: "Lakefront promenade and walking paths at Orion One",
  },
  {
    id: "social-spaces",
    title: "Lakefront Social Spaces",
    description:
      "Plazas, lakeside seating, and open-air gathering grounds designed for conversation, quiet reflection, and community connection.",
    image: "/images/lakeside/fountain-plaza.jpg",
    alt: "Open-air lakeside social spaces and gathering plazas",
  },
  {
    id: "dining-retail",
    title: "Waterfront Dining & Retail",
    description:
      "Curated commercial terraces featuring open-air restaurants, artisanal coffee spots, and boutique retail directly overlooking the water.",
    image: "/images/commercial/dining-terrace.jpg",
    alt: "Waterfront dining terrace and artisanal cafes",
  },
  {
    id: "wellness",
    title: "Movement & Restorative Wellness",
    description:
      "Double-height fitness suites, a lake-facing infinity pool, sauna, and dedicated spaces designed for active health and recovery.",
    image: "/images/amenities/fitness-gym.jpg",
    alt: "Double-height fitness and wellness suites",
  },
  {
    id: "community",
    title: "Vibrant Lakefront Community",
    description:
      "Shared environments and landscaped recreation lawns bringing residents and visitors together in a harmonious neighborhood.",
    image: "/images/location/dha-community-club.jpg",
    alt: "Community grounds and shared landscaped recreation",
  },
];

interface ConnectedAspect {
  id: string;
  title: string;
  subtitle: string;
}

const CONNECTED_ASPECTS: ConnectedAspect[] = [
  {
    id: "live",
    title: "Live",
    subtitle: "Lakefront residences planned around comfort, light, and water views.",
  },
  {
    id: "work-invest",
    title: "Work & Invest",
    subtitle: "Commercial spaces positioned within a thriving residential waterfront.",
  },
  {
    id: "dine",
    title: "Dine",
    subtitle: "Curated open-air culinary terraces overlooking the lake horizon.",
  },
  {
    id: "move",
    title: "Move",
    subtitle: "Shoreline jogging tracks, movement suites, and landscaped trails.",
  },
  {
    id: "restore",
    title: "Restore",
    subtitle: "Restorative wellness, spa, and spaces designed for daily recovery.",
  },
  {
    id: "connect",
    title: "Connect",
    subtitle: "Social gathering spaces designed to nurture belonging and community.",
  },
];

export default function OrionOneWaterfrontDestination() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Transition Page: "LIFE, BY THE WATER." with lake video background
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [enableVideo, setEnableVideo] = useState(false);
  const transitionLayerRef = useRef<HTMLDivElement>(null);
  const transitionInnerRef = useRef<HTMLDivElement>(null);
  const transitionGlowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // First card: Centered image that zooms in to fill the screen
  const zoomCardRef = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLDivElement>(null);
  const zoomTextRef = useRef<HTMLDivElement>(null);
  const zoomShadeRef = useRef<HTMLDivElement>(null);

  // Subsequent full-screen cards: Slide in sequentially from bottom upwards
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const slideInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  const slideShadesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Connected Destination Section
  const matrixSectionRef = useRef<HTMLDivElement>(null);
  const matrixCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setEnableVideo(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (enableVideo && videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, [enableVideo, videoLoaded]);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const transitionLayer = transitionLayerRef.current;
    const transitionInner = transitionInnerRef.current;
    const transitionGlow = transitionGlowRef.current;
    const zoomCard = zoomCardRef.current;
    const zoomImage = zoomImageRef.current;
    const zoomText = zoomTextRef.current;
    const zoomShade = zoomShadeRef.current;

    if (
      !container ||
      !stage ||
      !transitionLayer ||
      !transitionInner ||
      !transitionGlow ||
      !zoomCard ||
      !zoomImage ||
      !zoomText ||
      !zoomShade
    ) {
      return;
    }

    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    const slideInners = slideInnersRef.current.filter(Boolean) as HTMLDivElement[];
    const slideShades = slideShadesRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(transitionLayer, { opacity: 1, display: "flex", pointerEvents: "auto" });
        gsap.set(transitionInner, { opacity: 1, y: 0, scale: 1 });
        gsap.set(transitionGlow, { opacity: 0.85, scale: 1 });

        gsap.set(zoomCard, {
          scale: 1,
          borderRadius: "20px",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7)",
          borderColor: "rgba(237, 229, 218, 0.15)",
        });
        gsap.set(zoomImage, { scale: 1 });
        gsap.set(zoomText, { opacity: 0, y: 30 });
        gsap.set(zoomShade, { opacity: 0 });

        slides.forEach((slide) => {
          gsap.set(slide, { yPercent: 100 });
        });
        slideInners.forEach((inner) => {
          gsap.set(inner, { scale: 1, y: 0 });
        });
        slideShades.forEach((shade) => {
          gsap.set(shade, { opacity: 0 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=560%",
            pin: stage,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 0.7 });

        tl.addLabel("transitionOut");

        tl.to(
          transitionInner,
          {
            opacity: 0,
            y: -28,
            scale: 0.95,
            filter: "blur(10px)",
            duration: 1.0,
            ease: "power2.inOut",
          },
          "transitionOut"
        );

        tl.to(
          transitionGlow,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "transitionOut"
        );

        tl.to(
          transitionLayer,
          {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            pointerEvents: "none",
          },
          "transitionOut+=0.1"
        );

        tl.to({}, { duration: 0.4 });

        tl.to(
          zoomCard,
          {
            scale: () => {
              const bounds = zoomCard.getBoundingClientRect();
              const currentScale =
                (gsap.getProperty(zoomCard, "scale") as number) || 1;
              const baseW = bounds.width / currentScale;
              const baseH = bounds.height / currentScale;
              return (
                Math.max(
                  window.innerWidth / (baseW || 1),
                  window.innerHeight / (baseH || 1)
                ) * 1.05
              );
            },
            borderRadius: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            borderColor: "rgba(237, 229, 218, 0)",
            duration: 1.5,
            ease: "none",
          },
          "zoom"
        );

        tl.to(
          zoomImage,
          {
            scale: 1.08,
            duration: 1.5,
            ease: "none",
          },
          "zoom"
        );

        tl.to(
          zoomText,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "zoom+=0.8"
        );

        tl.to({}, { duration: 0.5 });

        slides.forEach((slide, idx) => {
          const label = `slide_${idx}`;
          tl.addLabel(label);

          if (idx === 0) {
            tl.to(
              zoomText,
              {
                opacity: 0,
                y: -20,
                duration: 1.0,
                ease: "none",
              },
              label
            );
            tl.to(
              zoomShade,
              {
                opacity: 0.45,
                duration: 1.2,
                ease: "none",
              },
              label
            );
            tl.to(
              zoomImage,
              {
                scale: 1.02,
                duration: 1.2,
                ease: "none",
              },
              label
            );
          } else {
            if (slideInners[idx - 1]) {
              tl.to(
                slideInners[idx - 1],
                {
                  scale: 0.94,
                  duration: 1.2,
                  ease: "none",
                },
                label
              );
            }
            if (slideShades[idx - 1]) {
              tl.to(
                slideShades[idx - 1],
                {
                  opacity: 0.45,
                  duration: 1.2,
                  ease: "none",
                },
                label
              );
            }
          }

          tl.to(
            slide,
            {
              yPercent: 0,
              duration: 1.3,
              ease: "none",
            },
            label
          );

          tl.to({}, { duration: 0.6 });
        });

        tl.to({}, { duration: 0.5 });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Animate the connected destination matrix separately with ScrollTrigger
  useEffect(() => {
    const el = matrixSectionRef.current;
    if (!el) return;

    const cards = matrixCardsRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ============================================================= */}
      {/* PINNED SECTION: Centered First Card Zoom -> Full-Screen Slides*/}
      {/* ============================================================= */}
      <section ref={containerRef} className="relative w-full bg-[#0d2828]">
        <div
          ref={stageRef}
          className="relative w-full h-auto md:h-[100dvh] overflow-visible md:overflow-hidden bg-[#0d2828] text-[#EDE5DA] flex flex-col"
        >
          {/* Ambient top border glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#62AA9E]/40 to-transparent z-30" />

          {/* ================================================================= */}
          {/* TRANSITION PAGE: "LIFE, BY THE WATER." WITH LAKE VIDEO BACKGROUND */}
          {/* Positioned before the centered card; dissolves smoothly on scroll */}
          {/* ================================================================= */}
          <div
            ref={transitionLayerRef}
            className="relative md:absolute inset-0 z-[25] order-1 w-full h-auto min-h-[100dvh] md:min-h-0 md:h-full overflow-hidden will-change-transform bg-[#081a1a]"
          >
            {/* Background Video & Fallback Poster Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  enableVideo && videoLoaded
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <Image
                  src="/images/orion-one/lake-video-poster.jpg"
                  alt="Life, By The Water"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {enableVideo && (
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onCanPlayThrough={() => setVideoLoaded(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    videoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <source src="/lake_video.mp4" type="video/mp4" />
                </video>
              )}

              {/* Atmospheric Vignette & Scrims for text contrast and prestigious tone */}
              <div className="absolute inset-0 bg-[#081a1a]/45 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/25 to-[#081a1a]/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0d2828]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Center Heading & Statement Container */}
            <div
              ref={transitionInnerRef}
              className="relative z-10 w-full h-full min-h-[100dvh] md:min-h-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 select-none will-change-transform"
            >
              {/* Luminous Ambient Backlight Glow */}
              <div
                ref={transitionGlowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[350px] sm:h-[450px] bg-[#62AA9E]/18 rounded-full blur-[140px] pointer-events-none will-change-transform"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-5xl space-y-4">
                <h2 className="font-serif-heading text-2xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-[#EDE5DA] leading-[1.04] uppercase">
                  Life, By The Water
                </h2>

                <p className="font-sans-body text-xs sm:text-sm md:text-base lg:text-lg text-[#C9BFB1] font-light max-w-2xl mx-auto leading-relaxed pt-2">
                  Where the lake becomes part of everyday life.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* FIRST CARD: Display ONLY image in center, nothing else.   */}
          {/* Zooms in on scroll until it fills the entire screen.      */}
          {/* ========================================================= */}
          <div className="relative md:absolute inset-0 order-2 flex items-stretch md:items-center justify-center pointer-events-none z-10 overflow-visible md:overflow-hidden">
            <div
              ref={zoomCardRef}
              className="relative overflow-hidden will-change-transform bg-[#081a1a] border-0 md:border border-[#EDE5DA]/15 w-full md:w-[min(920px,78vw)] aspect-[16/10] md:max-h-[62vh] rounded-none md:rounded-[20px]"
            >
              <div
                ref={zoomImageRef}
                className="relative w-full h-full will-change-transform"
              >
                <Image
                  src={DESTINATION_CARDS[0].image}
                  alt={DESTINATION_CARDS[0].alt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority
                />

                {/* Cinematic gradient overlay at bottom for optimal text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/40 to-transparent pointer-events-none" />
              </div>

              {/* Shade layer when subsequent slides cover it */}
              <div
                ref={zoomShadeRef}
                className="absolute inset-0 bg-[#081a1a] opacity-0 pointer-events-none will-change-opacity z-20"
              />
            </div>
          </div>

          {/* First Card Text Layer — Outside zoomCardRef so it is NEVER scaled! */}
          <div
            ref={zoomTextRef}
            className="relative md:absolute inset-0 order-3 z-15 flex flex-col justify-end px-4 sm:px-12 lg:px-20 py-8 md:pb-16 pointer-events-none will-change-transform bg-[#0d2828] md:bg-transparent"
          >
            <div className="w-full max-w-[1300px] mx-auto space-y-2 pointer-events-auto">
              <h3 className="font-serif-heading text-xl sm:text-3xl lg:text-4xl font-light text-[#EDE5DA] tracking-tight">
                {DESTINATION_CARDS[0].title}
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed max-w-xl">
                {DESTINATION_CARDS[0].description}
              </p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* REST OF CARDS: Full screen sliding upwards from bottom.   */}
          {/* Just displays the photo, heading & small supporting text. */}
          {/* ========================================================= */}
          {DESTINATION_CARDS.slice(1).map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                slidesRef.current[idx] = el;
              }}
              className="relative md:absolute inset-0 order-4 w-full h-auto min-h-[70vh] md:min-h-0 md:h-full z-20 will-change-transform overflow-hidden"
            >
              <div
                ref={(el) => {
                  slideInnersRef.current[idx] = el;
                }}
                className="relative w-full h-full min-h-[70vh] md:min-h-0 will-change-transform"
              >
                {/* Full-bleed Architectural Photograph */}
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />

                {/* Atmospheric gradient overlay at bottom for optimal contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/95 via-[#081a1a]/40 to-transparent pointer-events-none" />

                {/* Heading with one small supporting text below */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 sm:px-12 lg:px-20 pb-8 sm:pb-16 pointer-events-none">
                  <div className="w-full max-w-[1300px] mx-auto space-y-2 pointer-events-auto">
                    <h3 className="font-serif-heading text-xl sm:text-3xl lg:text-4xl font-light text-[#EDE5DA] tracking-tight">
                      {item.title}
                    </h3>

                    <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Shade layer when covered by next slide */}
                <div
                  ref={(el) => {
                    slideShadesRef.current[idx] = el;
                  }}
                  className="absolute inset-0 bg-[#081a1a] opacity-0 pointer-events-none will-change-opacity z-20"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================= */}
      {/* MERGED SECTION 06: CONNECTED DESTINATION — EVERYTHING WITHIN REACH */}
      {/* Symmetrical Architectural Matrix (Live, Work, Dine, Move, Restore, Connect) */}
      {/* ============================================================= */}
      <section
        ref={matrixSectionRef}
        className="relative py-16 sm:py-32 lg:py-40 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-t border-[#EDE5DA]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-20">
          {/* Centered Heading in One Line & Centered Intro */}
          <div className="max-w-5xl mx-auto text-center mb-16 sm:mb-24">
            <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#EDE5DA] uppercase mb-6 leading-tight max-w-4xl mx-auto">
              Everything Within{" "}
              <span className="italic font-normal text-sand-gradient normal-case">
                Reach
              </span>
            </h2>

            <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl mx-auto">
              Orion One brings different aspects of daily life together within
              one destination.
            </p>
          </div>

          {/* Minimalist Architectural Divider Layout (No AI-slop cards, no icons, no gradients) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-12 sm:gap-y-16">
            {CONNECTED_ASPECTS.map((aspect, idx) => (
              <div
                key={aspect.id}
                ref={(el) => {
                  matrixCardsRef.current[idx] = el;
                }}
                className="matrix-item group border-t border-[#EDE5DA]/20 pt-6 sm:pt-8 flex flex-col justify-start transition-colors duration-300"
              >
                <h3 className="font-serif-heading text-2xl sm:text-3xl font-light text-[#EDE5DA] tracking-tight mb-3 group-hover:text-[#62AA9E] transition-colors">
                  {aspect.title}
                </h3>

                <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                  {aspect.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
