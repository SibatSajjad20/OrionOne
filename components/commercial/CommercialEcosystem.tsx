"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  Building2,
  Waves,
  Utensils,
  Trees,
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
  icon: typeof Building2;
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
    id: "main-building",
    number: "01",
    category: "LANDMARK TOWER",
    title: "The Main Building (Orion One)",
    description:
      "A signature curvilinear lakefront landmark tower combining luxury residences, double-height retail arcades, executive commercial spaces, and panoramic water terraces.",
    highlights: ["Signature Curvilinear Tower", "Cascading Garden Terraces", "Luxury Residences & Retail"],
    icon: Building2,
    desktop: {
      scale: 2.3,
      origin: "62% 46%",
      cardPlacement: "left",
    },
    mobile: {
      scale: 1.6,
      origin: "62% 46%",
    },
    pin: {
      x: 62,
      y: 46,
      label: "The Main Building",
    },
  },
  {
    id: "lake",
    number: "02",
    category: "WATERFRONT DESTINATION",
    title: "The Lake",
    description:
      "The scenic centerpiece of the entire development, featuring choreographed dancing fountains, illuminated waterside walkways, and tranquil open water vistas.",
    highlights: ["Dancing Fountains Centerpiece", "Scenic Shoreline Boardwalk", "All-Day Waterfront Ambiance"],
    icon: Waves,
    desktop: {
      scale: 2.2,
      origin: "35% 64%",
      cardPlacement: "right",
    },
    mobile: {
      scale: 1.6,
      origin: "35% 64%",
    },
    pin: {
      x: 35,
      y: 64,
      label: "The Lake",
    },
  },
  {
    id: "restaurants",
    number: "03",
    category: "CULINARY & LEISURE",
    title: "The Restaurants",
    description:
      "A vibrant dining promenade featuring open-air overwater decks, artisanal bistros, and diverse culinary concepts with uninterrupted lake and fountain views.",
    highlights: ["Alfresco Overwater Decks", "Artisanal Cafes & Fine Dining", "Morning to Midnight Demand"],
    icon: Utensils,
    desktop: {
      scale: 2.4,
      origin: "25% 85%",
      cardPlacement: "right",
    },
    mobile: {
      scale: 1.7,
      origin: "25% 85%",
    },
    pin: {
      x: 25,
      y: 85,
      label: "The Restaurants",
    },
  },
  {
    id: "park",
    number: "04",
    category: "NATURE & RECREATION",
    title: "The Park",
    description:
      "Expansive green lawns, manicured botanical trails, and shaded leisure gardens flanking Orion One, seamlessly linking outdoor recreation with commercial vibrance.",
    highlights: ["Manicured Waterside Lawns", "Scenic Walking & Jogging Trails", "Restorative Open Space"],
    icon: Trees,
    desktop: {
      scale: 2.3,
      origin: "82% 72%",
      cardPlacement: "left",
    },
    mobile: {
      scale: 1.6,
      origin: "82% 72%",
    },
    pin: {
      x: 82,
      y: 72,
      label: "The Park",
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

      const isDesktop = typeof window !== "undefined" ? window.innerWidth >= 768 : true;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isDesktop ? "+=550%" : "+=420%",
          pin: true,
          pinSpacing: true,
          scrub: isDesktop ? 0.8 : 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            if (p < 0.10) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(0);
              setIsOverviewActive(false);
            } else if (p >= 0.10 && p < 0.24) {
              setActiveWaypoint(0);
              setCurrentAmenityIdx(0);
              setIsOverviewActive(false);
            } else if (p >= 0.24 && p < 0.29) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(0);
              setIsOverviewActive(false);
            } else if (p >= 0.29 && p < 0.43) {
              setActiveWaypoint(1);
              setCurrentAmenityIdx(1);
              setIsOverviewActive(false);
            } else if (p >= 0.43 && p < 0.48) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(1);
              setIsOverviewActive(false);
            } else if (p >= 0.48 && p < 0.62) {
              setActiveWaypoint(2);
              setCurrentAmenityIdx(2);
              setIsOverviewActive(false);
            } else if (p >= 0.62 && p < 0.67) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(2);
              setIsOverviewActive(false);
            } else if (p >= 0.67 && p < 0.81) {
              setActiveWaypoint(3);
              setCurrentAmenityIdx(3);
              setIsOverviewActive(false);
            } else if (p >= 0.81 && p < 0.86) {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(3);
              setIsOverviewActive(false);
            } else {
              setActiveWaypoint(-1);
              setCurrentAmenityIdx(3);
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

      // Waypoint 0: The Building
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
          0.23
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
        0.24
      );

      // Waypoint 1: Dancing Fountains
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
        0.29
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
          0.31
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
          0.42
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
        0.43
      );

      // Waypoint 2: Waterfront Restaurants
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
        0.48
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
          0.50
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
          0.61
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
        0.62
      );

      // Waypoint 3: Lakeside Park & Gardens
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
        0.67
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
          0.69
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
          0.80
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
        0.81
      );

      tl.to(
        imageMap,
        {
          scale: 1.04,
          transformOrigin: "50% 50%",
          duration: 0.08,
          ease: "power2.inOut",
        },
        0.86
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
          0.88
        ).to(
          overviewBanner,
          {
            opacity: 0,
            y: -15,
            pointerEvents: "none",
            duration: 0.03,
            ease: "power2.in",
          },
          0.94
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
          0.95
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
    const waypointProgressMap = [0.17, 0.36, 0.55, 0.74];
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
          <h2 className="type-section font-serif-heading font-luxia-display text-2xl sm:text-4xl lg:text-5xl text-[#EDE5DA] tracking-tight leading-[1.08]">
            Business Doesn&apos;t <br />
            <span className="type-display-accent font-normal text-sand-gradient">
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
                src="/images/commercial/lakeview-commercial-masterplan.jpg"
                alt="Orion One and Lakeview Commercial Aerial Masterplan"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center pointer-events-none select-none"
              />

              {/* Subtle Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/65 via-transparent to-[#081a1a]/35 pointer-events-none" />
            </div>

            {/* Floating Radar Pins (Placed outside zoomable canvas to preserve crisp, constant scale & prevent overflowing labels) */}
            <div
              ref={pinsContainerRef}
              className="absolute inset-0 pointer-events-none opacity-0 z-20"
            >
              {DESTINATION_AMENITIES.map((amenity, idx) => {
                const isFocused = !isOverviewActive && activeWaypoint === idx;
                const isOverview = isOverviewActive || activeWaypoint === -1;

                // When focused on a waypoint, only display the active pin to avoid unaligned out-of-focus pins
                if (!isFocused && !isOverview) {
                  return null;
                }

                const isRightHalf = amenity.pin.x >= 50;

                return (
                  <div
                    key={amenity.id}
                    onClick={() => handleWaypointClick(idx)}
                    style={{ left: `${amenity.pin.x}%`, top: `${amenity.pin.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer pointer-events-auto group transition-all duration-300 ${
                      isFocused ? "scale-100" : "scale-90 hover:scale-100"
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute rounded-full transition-all duration-500 ${
                          isFocused
                            ? "w-7 h-7 bg-[#62AA9E]/40 animate-ping"
                            : "w-4 h-4 bg-[#62AA9E]/20"
                        }`}
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 border-2 ${
                          isFocused
                            ? "bg-[#62AA9E] border-[#EDE5DA] shadow-[0_0_12px_#62AA9E]"
                            : "bg-[#153D3D] border-[#62AA9E] shadow-[0_0_8px_rgba(98,170,158,0.5)]"
                        }`}
                      />

                      {/* Directional Badge — always points inward towards center of screen so it never overflows */}
                      <div
                        className={`absolute ${
                          isRightHalf ? "right-5" : "left-5"
                        } top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-sans-body tracking-wider transition-all duration-300 backdrop-blur-md shadow-xl flex items-center gap-1.5 max-w-[200px] sm:max-w-none ${
                          isFocused
                            ? "bg-[#0d2828]/95 border border-[#62AA9E] text-[#EDE5DA] opacity-100 shadow-[0_0_16px_rgba(98,170,158,0.35)]"
                            : "bg-[#0d2828]/85 border border-[#EDE5DA]/20 text-[#C9BFB1] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#62AA9E] animate-pulse shrink-0" />
                        <span className="font-medium truncate">{amenity.pin.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Waypoint Minimalist Cards — responsive overlays on both mobile and desktop */}
            {DESTINATION_AMENITIES.map((amenity, idx) => {
              const isRight = amenity.desktop.cardPlacement === "right";

              return (
                <div
                  key={amenity.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`absolute z-30 pointer-events-none opacity-0
                    bottom-6 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-6
                    md:bottom-8 md:left-auto md:right-auto md:max-w-sm lg:max-w-md
                    ${isRight ? "md:right-8 lg:right-12" : "md:left-8 lg:left-12"}
                  `}
                >
                  <div className="bg-[#0a2020]/95 backdrop-blur-xl rounded-2xl p-4 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.65)] pointer-events-auto border border-[#EDE5DA]/20">
                    <h3 className="font-serif-heading text-lg sm:text-2xl text-[#EDE5DA] leading-snug tracking-tight mb-1.5 sm:mb-2.5">
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
      </section>

      {/* Connected To The City: Macro-Arterial Transit Ledger */}
      <section className="relative py-24 sm:py-32 bg-[#153D3D] text-[#EDE5DA] border-t border-[#EDE5DA]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 space-y-12">
          <div className="max-w-3xl space-y-3">
            <h3 className="type-section font-serif-heading font-luxia-display text-3xl sm:text-4xl lg:text-5xl text-[#EDE5DA]">
              Connected to the City
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
                <h4 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA]">
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
                <h4 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA]">
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
