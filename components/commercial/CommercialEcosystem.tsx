"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  Users2,
  Waves,
  Hotel,
  Utensils,
  Footprints,
  Route,
  Navigation,
  Compass,
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DestinationAmenity {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  highlights: string[];
  icon: typeof Users2;
  desktop: {
    scale: number;
    origin: string;
    cardPlacement: "left" | "right";
  };
  mobile: {
    scale: number;
    origin: string;
  };
  pin: {
    x: number; // percentage
    y: number; // percentage
    label: string;
  };
}

const DESTINATION_AMENITIES: DestinationAmenity[] = [
  {
    id: "community-club",
    number: "01",
    category: "COMMUNITY & LEISURE",
    title: "DHA III Community Club",
    description:
      "A prestigious civic and sports destination featuring athletic facilities, recreation lawns, and private social banquets along the water.",
    highlights: ["Olympic-grade Sports", "Recreation Lawns & Amusements", "Civic Social Prestige"],
    icon: Users2,
    desktop: {
      scale: 2.3,
      origin: "28% 28%",
      cardPlacement: "right",
    },
    mobile: {
      scale: 1.6,
      origin: "28% 30%",
    },
    pin: {
      x: 28,
      y: 28,
      label: "DHA Community Club",
    },
  },
  {
    id: "dancing-fountains",
    number: "02",
    category: "WATERFRONT CENTERPIECE",
    title: "Dancing Fountains",
    description:
      "A signature illuminated water choreography and visual centerpiece drawing continuous evening visitors, dining patrons, and leisure gatherings.",
    highlights: ["Light & Sound Choreography", "Continuous Evening Footfall", "Iconic Tourism Anchor"],
    icon: Waves,
    desktop: {
      scale: 2.5,
      origin: "49% 58%",
      cardPlacement: "left",
    },
    mobile: {
      scale: 1.7,
      origin: "49% 56%",
    },
    pin: {
      x: 49,
      y: 58,
      label: "Dancing Fountains",
    },
  },
  {
    id: "hotel-commercial",
    number: "03",
    category: "HOSPITALITY & COMMERCE",
    title: "Five-Star Hotel & Commercial Towers",
    description:
      "Skyline hospitality infrastructure and neoclassical commercial towers bringing international executive travelers, luxury shoppers, and corporate patronage.",
    highlights: ["Five-Star Executive Suites", "Corporate Headquarters", "High-Net-Worth Footfall"],
    icon: Hotel,
    desktop: {
      scale: 2.2,
      origin: "70% 42%",
      cardPlacement: "left",
    },
    mobile: {
      scale: 1.55,
      origin: "70% 42%",
    },
    pin: {
      x: 68,
      y: 40,
      label: "Five-Star Hotel",
    },
  },
  {
    id: "food-court",
    number: "04",
    category: "CULINARY DESTINATIONS",
    title: "Food Court & Dining Pavilions",
    description:
      "A thriving culinary promenade with open-air waterfront decks, diverse gourmet dining concepts, and evening social energy directly on the shoreline.",
    highlights: ["Alfresco Waterfront Decks", "Curated Dining Clusters", "Morning to Midnight Demand"],
    icon: Utensils,
    desktop: {
      scale: 2.35,
      origin: "32% 69%",
      cardPlacement: "right",
    },
    mobile: {
      scale: 1.6,
      origin: "32% 65%",
    },
    pin: {
      x: 32,
      y: 69,
      label: "Waterfront Dining Pavilions",
    },
  },
  {
    id: "promenade",
    number: "05",
    category: "PEDESTRIAN SPINE",
    title: "Lakefront Promenade",
    description:
      "A continuous scenic shoreline boardwalk connecting every surrounding amenity, garden park, and leisure cluster directly back into Orion One.",
    highlights: ["Continuous Shoreline Boardwalk", "Direct Orion One Pedestrian Link", "Lush Waterside Parks"],
    icon: Footprints,
    desktop: {
      scale: 2.1,
      origin: "62% 68%",
      cardPlacement: "left",
    },
    mobile: {
      scale: 1.5,
      origin: "62% 66%",
    },
    pin: {
      x: 62,
      y: 68,
      label: "Lakefront Promenade",
    },
  },
];

const ACCESS_ARTERIES = [
  "DHA Main Boulevards",
  "GT Road Islamabad",
  "Rawalpindi Ring Road",
  "Islamabad Expressway",
  "Islamabad International Airport",
];

const SURROUNDING_NODES = [
  "Leading Schools & Universities",
  "Healthcare Facilities & Clinics",
  "Retail & Dining Hubs",
  "Corporate Business Districts",
  "Future Urban Growth Corridors",
];

export default function CommercialEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const frameWrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageMapRef = useRef<HTMLDivElement>(null);
  const pinsContainerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const overviewBannerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeWaypoint, setActiveWaypoint] = useState<number>(0);
  const [currentAmenityIdx, setCurrentAmenityIdx] = useState<number>(0);
  const [isOverviewActive, setIsOverviewActive] = useState<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const frameWrapper = frameWrapperRef.current;
    const frame = frameRef.current;
    const imageMap = imageMapRef.current;
    const pinsContainer = pinsContainerRef.current;
    const hud = hudRef.current;
    const overviewBanner = overviewBannerRef.current;

    if (!section || !header || !frameWrapper || !frame || !imageMap) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      
      gsap.set(cards, { opacity: 0, y: 35, pointerEvents: "none" });
      if (hud) gsap.set(hud, { opacity: 0, y: -20, pointerEvents: "none" });
      if (pinsContainer) gsap.set(pinsContainer, { opacity: 0, pointerEvents: "none" });
      if (overviewBanner) gsap.set(overviewBanner, { opacity: 0, y: 25, pointerEvents: "none" });

      gsap.set(imageMap, {
        scale: 1,
        transformOrigin: "50% 50%",
      });

      const isDesktop = true;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=550%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            if (p < 0.10) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(0);
              setIsOverviewActive(false);
            } else if (p >= 0.10 && p < 0.21) {
              setActiveWaypoint(0);
              setCurrentAmenityIdx(0);
              setIsOverviewActive(false);
            } else if (p >= 0.21 && p < 0.26) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(0);
              setIsOverviewActive(false);
            } else if (p >= 0.26 && p < 0.37) {
              setActiveWaypoint(1);
              setCurrentAmenityIdx(1);
              setIsOverviewActive(false);
            } else if (p >= 0.37 && p < 0.42) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(1);
              setIsOverviewActive(false);
            } else if (p >= 0.42 && p < 0.53) {
              setActiveWaypoint(2);
              setCurrentAmenityIdx(2);
              setIsOverviewActive(false);
            } else if (p >= 0.53 && p < 0.58) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(2);
              setIsOverviewActive(false);
            } else if (p >= 0.58 && p < 0.69) {
              setActiveWaypoint(3);
              setCurrentAmenityIdx(3);
              setIsOverviewActive(false);
            } else if (p >= 0.69 && p < 0.74) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(3);
              setIsOverviewActive(false);
            } else if (p >= 0.74 && p < 0.85) {
              setActiveWaypoint(4);
              setCurrentAmenityIdx(4);
              setIsOverviewActive(false);
            } else if (p >= 0.85 && p < 0.90) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(4);
              setIsOverviewActive(false);
            } else {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(4);
              setIsOverviewActive(true);
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      tl.to(
        header,
        {
          y: -50,
          opacity: 0,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
          duration: 0.10,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        frameWrapper,
        {
          maxWidth: "100vw",
          width: "100vw",
          height: "100vh",
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.10,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        frame,
        {
          borderRadius: "0px",
          borderWidth: "0px",
          duration: 0.10,
          ease: "power2.inOut",
        },
        0
      );

      if (hud) {
        tl.to(
          hud,
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.03,
            ease: "power2.out",
          },
          0.08
        );
      }

      if (pinsContainer) {
        tl.to(
          pinsContainer,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.03,
            ease: "power2.out",
          },
          0.08
        );
      }

      const wp0 = DESTINATION_AMENITIES[0];
      const origin0 = isDesktop ? wp0.desktop.origin : wp0.mobile.origin;
      const scale0 = isDesktop ? wp0.desktop.scale : wp0.mobile.scale;

      tl.to(
        imageMap,
        {
          scale: scale0,
          transformOrigin: origin0,
          duration: 0.05,
          ease: "power2.out",
        },
        0.10
      );

      if (cards[0]) {
        tl.to(
          cards[0],
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.03,
            ease: "power2.out",
          },
          0.12
        );
        tl.to(
          cards[0],
          {
            opacity: 0,
            y: -20,
            pointerEvents: "none",
            duration: 0.025,
            ease: "power2.in",
          },
          0.20
        );
      }

      tl.to(
        imageMap,
        {
          scale: 1.0,
          transformOrigin: origin0,
          duration: 0.05,
          ease: "power2.inOut",
        },
        0.21
      );

      const wp1 = DESTINATION_AMENITIES[1];
      const origin1 = isDesktop ? wp1.desktop.origin : wp1.mobile.origin;
      const scale1 = isDesktop ? wp1.desktop.scale : wp1.mobile.scale;

      tl.to(
        imageMap,
        {
          scale: scale1,
          transformOrigin: origin1,
          duration: 0.05,
          ease: "power2.out",
        },
        0.26
      );

      if (cards[1]) {
        tl.to(
          cards[1],
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.03,
            ease: "power2.out",
          },
          0.28
        );
        tl.to(
          cards[1],
          {
            opacity: 0,
            y: -20,
            pointerEvents: "none",
            duration: 0.025,
            ease: "power2.in",
          },
          0.36
        );
      }

      tl.to(
        imageMap,
        {
          scale: 1.0,
          transformOrigin: origin1,
          duration: 0.05,
          ease: "power2.inOut",
        },
        0.37
      );

      const wp2 = DESTINATION_AMENITIES[2];
      const origin2 = isDesktop ? wp2.desktop.origin : wp2.mobile.origin;
      const scale2 = isDesktop ? wp2.desktop.scale : wp2.mobile.scale;

      tl.to(
        imageMap,
        {
          scale: scale2,
          transformOrigin: origin2,
          duration: 0.05,
          ease: "power2.out",
        },
        0.42
      );

      if (cards[2]) {
        tl.to(
          cards[2],
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.03,
            ease: "power2.out",
          },
          0.44
        );
        tl.to(
          cards[2],
          {
            opacity: 0,
            y: -20,
            pointerEvents: "none",
            duration: 0.025,
            ease: "power2.in",
          },
          0.52
        );
      }

      tl.to(
        imageMap,
        {
          scale: 1.0,
          transformOrigin: origin2,
          duration: 0.05,
          ease: "power2.inOut",
        },
        0.53
      );

      const wp3 = DESTINATION_AMENITIES[3];
      const origin3 = isDesktop ? wp3.desktop.origin : wp3.mobile.origin;
      const scale3 = isDesktop ? wp3.desktop.scale : wp3.mobile.scale;

      tl.to(
        imageMap,
        {
          scale: scale3,
          transformOrigin: origin3,
          duration: 0.05,
          ease: "power2.out",
        },
        0.58
      );

      if (cards[3]) {
        tl.to(
          cards[3],
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.03,
            ease: "power2.out",
          },
          0.60
        );
        tl.to(
          cards[3],
          {
            opacity: 0,
            y: -20,
            pointerEvents: "none",
            duration: 0.025,
            ease: "power2.in",
          },
          0.68
        );
      }

      tl.to(
        imageMap,
        {
          scale: 1.0,
          transformOrigin: origin3,
          duration: 0.05,
          ease: "power2.inOut",
        },
        0.69
      );

      const wp4 = DESTINATION_AMENITIES[4];
      const origin4 = isDesktop ? wp4.desktop.origin : wp4.mobile.origin;
      const scale4 = isDesktop ? wp4.desktop.scale : wp4.mobile.scale;

      tl.to(
        imageMap,
        {
          scale: scale4,
          transformOrigin: origin4,
          duration: 0.05,
          ease: "power2.out",
        },
        0.74
      );

      if (cards[4]) {
        tl.to(
          cards[4],
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.03,
            ease: "power2.out",
          },
          0.76
        );
        tl.to(
          cards[4],
          {
            opacity: 0,
            y: -20,
            pointerEvents: "none",
            duration: 0.025,
            ease: "power2.in",
          },
          0.84
        );
      }

      tl.to(
        imageMap,
        {
          scale: 1.0,
          transformOrigin: origin4,
          duration: 0.05,
          ease: "power2.inOut",
        },
        0.85
      );

      tl.to(
        imageMap,
        {
          scale: 1.04,
          transformOrigin: "50% 50%",
          duration: 0.08,
          ease: "power2.inOut",
        },
        0.90
      );

      if (overviewBanner) {
        tl.to(
          overviewBanner,
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.04,
            ease: "power2.out",
          },
          0.92
        ).to(
          overviewBanner,
          {
            opacity: 0,
            y: -15,
            pointerEvents: "none",
            duration: 0.03,
            ease: "power2.in",
          },
          0.96
        );
      }

      if (hud) {
        tl.to(
          hud,
          {
            opacity: 0,
            y: -20,
            duration: 0.03,
            ease: "power2.in",
          },
          0.97
        );
      }

      return () => {
        scrollTriggerRef.current = null;
      };
    
    }, section);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Programmatic scroll-to waypoint using GSAP ScrollTrigger precise pixel offsets
  const handleWaypointClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    // Center of hold duration for each waypoint
    const waypointProgressMap = [0.18, 0.34, 0.50, 0.66, 0.82];
    const targetProgress = waypointProgressMap[index] ?? 0.18;
    const targetY = st.start + (st.end - st.start) * targetProgress;

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const handleOverviewClick = () => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const targetY = st.start + (st.end - st.start) * 0.94;

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Pinned Scrollytelling Aerial Map Section */}
      <section
        id="aerial-ecosystem"
        ref={sectionRef}
        className="relative w-full h-[100dvh] overflow-hidden bg-[#153D3D] text-[#EDE5DA] select-none flex flex-col justify-between"
      >
        {/* Section Editorial Header: Cleanly positioned ABOVE the frame in natural flex flow */}
        <div
          ref={headerRef}
          className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-20 sm:pt-24 lg:pt-12 pb-3 shrink-0 z-20 overflow-hidden"
        >
          <h2 className="font-serif-heading text-2xl sm:text-4xl lg:text-5xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Business Doesn&apos;t <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Operate in Isolation
            </span>
          </h2>
          <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed max-w-2xl mt-2">
            Orion One sits within a wider DHA Phase III environment that adds destinations,
            facilities, and movement around the development, supported by direct arterial
            connectivity across the twin cities.
          </p>
        </div>

        {/* Master Frame Wrapper: Positioned BELOW the header at scroll 0, expands to 100vw x 100vh */}
        <div
          ref={frameWrapperRef}
          className="w-full max-w-5xl mx-auto px-4 sm:px-8 pb-6 sm:pb-8 flex-1 min-h-0 flex items-center justify-center z-10 overflow-hidden"
        >
          {/* Framed Container */}
          <div
            ref={frameRef}
            className="relative w-full h-full rounded-2xl overflow-hidden bg-[#081a1a] border border-[#EDE5DA]/15 shadow-2xl will-change-transform flex items-center justify-center"
          >
            {/* Camera Zoomable Aerial Canvas */}
            <div
              ref={imageMapRef}
              className="relative w-full h-full will-change-transform"
              style={{ transformOrigin: "50% 50%" }}
            >
              <Image
                src="/images/commercial/location-masterplan.jpg"
                alt="Sector F DHA Phase III Aerial Masterplan"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center pointer-events-none select-none"
              />

              {/* Subtle Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/65 via-transparent to-[#081a1a]/35 pointer-events-none" />

              {/* Floating Radar Pins (Hidden during Phase 1 until tour starts) */}
              <div
                ref={pinsContainerRef}
                className="absolute inset-0 pointer-events-none opacity-0"
              >
                {DESTINATION_AMENITIES.map((amenity, idx) => {
                  const isActive = !isOverviewActive && activeWaypoint === idx;
                  return (
                    <div
                      key={amenity.id}
                      onClick={() => handleWaypointClick(idx)}
                      style={{ left: `${amenity.pin.x}%`, top: `${amenity.pin.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer pointer-events-auto group transition-transform duration-300 ${
                        isActive ? "scale-110" : "scale-90 hover:scale-105"
                      }`}
                    >
                      <div className="relative flex items-center justify-center">
                        <span
                          className={`absolute rounded-full transition-all duration-500 ${
                            isActive
                              ? "w-8 h-8 bg-[#62AA9E]/40 animate-ping"
                              : "w-4 h-4 bg-[#62AA9E]/15"
                          }`}
                        />
                        <span
                          className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 border-2 ${
                            isActive
                              ? "bg-[#62AA9E] border-[#EDE5DA] shadow-[0_0_14px_#62AA9E]"
                              : "bg-[#153D3D] border-[#62AA9E] shadow-[0_0_8px_rgba(98,170,158,0.5)]"
                          }`}
                        />

                        {/* Hover / Active Badge */}
                        <div
                          className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-sans-body tracking-wider transition-all duration-300 backdrop-blur-md shadow-xl flex items-center gap-1.5 ${
                            isActive
                              ? "bg-[#0d2828]/95 border border-[#62AA9E] text-[#EDE5DA] opacity-100 translate-x-0 shadow-[0_0_16px_rgba(98,170,158,0.35)]"
                              : "bg-[#0d2828]/80 border border-[#EDE5DA]/20 text-[#C9BFB1] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#62AA9E] animate-pulse" />
                          <span className="font-medium">{amenity.pin.label}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Waypoint Minimalist Cards — absolute overlays on md+; stacked below map via sibling on mobile */}
            {DESTINATION_AMENITIES.map((amenity, idx) => {
              const isRight = amenity.desktop.cardPlacement === "right";

              return (
                <div
                  key={amenity.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                className={`absolute z-30 pointer-events-none opacity-0
                    hidden md:block
                    md:bottom-12 md:max-w-md
                    ${isRight ? "md:right-12 lg:right-16" : "md:left-12 lg:left-16"}
                  `}
                >
                  <div className="bg-[#0a2020]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.55)] pointer-events-auto border border-[#EDE5DA]/15">
                    <h3 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA] font-light leading-snug tracking-tight mb-2.5">
                      {amenity.title}
                    </h3>
                    <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Mobile: stacked amenity cards in document flow */}
        <div className="md:hidden px-4 pb-10 space-y-4 shrink-0">
          {DESTINATION_AMENITIES.map((amenity) => (
            <div
              key={`mobile-${amenity.id}`}
              className="bg-[#0a2020]/90 rounded-2xl p-5 border border-[#EDE5DA]/15"
            >
              <h3 className="font-serif-heading text-xl text-[#EDE5DA] font-light leading-snug tracking-tight mb-2">
                {amenity.title}
              </h3>
              <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Connected To The City: Macro-Arterial Transit Ledger */}
      <section className="relative py-24 sm:py-32 bg-[#153D3D] text-[#EDE5DA] border-t border-[#EDE5DA]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 space-y-12">
          <div className="max-w-3xl space-y-3">
            <h3 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl text-[#EDE5DA] font-light">
              Connected To The City
            </h3>
            <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
              Rapid multilane highway access linking Orion One directly with DHA, Islamabad,
              Rawalpindi, and key civic infrastructure across the twin cities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 border-t border-[#EDE5DA]/20 pt-8 sm:pt-10">
            {/* Column 1: Primary Arteries Ledger */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE5DA]/20">
                <h4 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA] font-light">
                  Primary Arteries
                </h4>
                <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest">
                  Direct Corridor Links
                </span>
              </div>
              <div className="divide-y divide-[#EDE5DA]/10 font-sans-body">
                {ACCESS_ARTERIES.map((artery) => (
                  <div
                    key={artery}
                    className="py-3.5 flex items-center justify-between text-xs sm:text-sm text-[#EDE5DA]/90 font-light hover:text-[#EDE5DA] transition-colors"
                  >
                    <span>{artery}</span>
                    <span className="font-mono text-[11px] text-[#62AA9E]/80 tracking-wider">
                      Arterial
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Surrounding Strategic Nodes Ledger */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE5DA]/20">
                <h4 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA] font-light">
                  Surrounding Strategic Nodes
                </h4>
                <span className="font-mono text-[10px] text-[#EDE5DA]/50 uppercase tracking-widest">
                  Adjacent Demand Drivers
                </span>
              </div>
              <div className="divide-y divide-[#EDE5DA]/10 font-sans-body">
                {SURROUNDING_NODES.map((node) => (
                  <div
                    key={node}
                    className="py-3.5 flex items-center justify-between text-xs sm:text-sm text-[#EDE5DA]/90 font-light hover:text-[#EDE5DA] transition-colors"
                  >
                    <span>{node}</span>
                    <span className="font-mono text-[11px] text-[#EDE5DA]/45 tracking-wider">
                      Strategic Node
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
