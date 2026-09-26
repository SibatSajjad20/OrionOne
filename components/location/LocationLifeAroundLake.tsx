"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MapPin, Navigation } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Landmark {
  id: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  proximity: string;
  image: string;
  x: number; // percentage on map
  y: number; // percentage on map
}

const LANDMARKS: Landmark[] = [
  {
    id: "fountains",
    number: "01",
    name: "Dancing Fountains",
    category: "Civic Landmark",
    summary: "Illuminated water and sound choreography acting as the central evening gathering point.",
    proximity: "Direct Waterfront Edge",
    image: "/images/location/dancing-fountains.jpg",
    x: 48,
    y: 54,
  },
  {
    id: "club",
    number: "02",
    name: "DHA III Community Club",
    category: "Athletic & Banquets",
    summary: "Championship tennis courts, fitness facilities, banquet lawns, and social lounges.",
    proximity: "Adjacent Shoreline",
    image: "/images/location/dha-community-club.jpg",
    x: 28,
    y: 35,
  },
  {
    id: "hotel",
    number: "03",
    name: "Five-Star Hotel",
    category: "Hospitality",
    summary: "Skyline hospitality suites, fine dining, and international executive accommodations.",
    proximity: "300m North",
    image: "/images/location/five-star-hotel.jpg",
    x: 65,
    y: 32,
  },
  {
    id: "food-court",
    number: "04",
    name: "Food Court & Dining",
    category: "Culinary Terraces",
    summary: "Lakeside dining promenade with open-air cafes, international brands, and sunset decks.",
    proximity: "Direct Promenade Walk",
    image: "/images/location/food-court-dining.jpg",
    x: 35,
    y: 65,
  },
  {
    id: "cinema",
    number: "05",
    name: "Cinema",
    category: "Cultural Leisure",
    summary: "Modern multi-screen cinema complex offering immersive film auditoriums and VIP lounges.",
    proximity: "Sector F Commercial",
    image: "/images/location/cinema-entertainment.jpg",
    x: 72,
    y: 52,
  },
  {
    id: "parks",
    number: "06",
    name: "Parks and Open Spaces",
    category: "Botanical Trails",
    summary: "Lush botanical gardens, green lawns, and peaceful shaded running trails buffering the water.",
    proximity: "Immediate Perimeter",
    image: "/images/location/parks-open-spaces.jpg",
    x: 58,
    y: 72,
  },
  {
    id: "amusements",
    number: "07",
    name: "Lakeside Amusements",
    category: "Family Recreation",
    summary: "Water activities, family entertainment zones, and recreational docks along the promenade.",
    proximity: "Waterfront Basin",
    image: "/images/location/lakeside-amusements.jpg",
    x: 42,
    y: 78,
  },
];

export default function LocationLifeAroundLake() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const explorerRef = useRef<HTMLDivElement>(null);

  const activeLandmark = LANDMARKS[activeIdx];

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const explorer = explorerRef.current;
    if (!section || !header || !explorer) return;

    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        explorer,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: explorer,
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
      id="masterplan"
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="Life Around the Lake"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-[#62AA9E]/4 rounded-full blur-[260px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl space-y-4 will-change-transform">
          <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Life Around <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              the Lake
            </span>
          </h2>

          <p className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA]/90 font-light leading-snug">
            A Wider Destination Beyond Orion One
          </p>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
            The surrounding DHA Phase III environment adds another layer to the Orion One experience. These destinations contribute to the wider recreational, social, and lifestyle environment around Orion One.
          </p>
        </div>

        {/* Interactive Masterplan Landmark Map & Spotlight Component */}
        <div ref={explorerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch will-change-transform">
          
          {/* Left Column: Masterplan Satellite Map with Pure Image (No pins on top of image) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0d2828] border border-[#EDE5DA]/15 p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE5DA]/10 text-xs font-mono">
              <span className="text-[#62AA9E] uppercase tracking-wider">Sector F Masterplan Map</span>
              <span className="text-[#808080]">Direct Waterfront Enclave</span>
            </div>

            {/* Pure Map Canvas (Zero text or pins over image) */}
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#081a1a] my-4 border border-[#EDE5DA]/10 group">
              <Image
                src="/images/location/dha-phase3-map.jpg"
                alt="Sector F DHA Phase III Masterplan Map with Landmark Positions"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>

            {/* Clean Horizontal Landmark Switcher Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2">
              {LANDMARKS.map((lm, idx) => (
                <button
                  key={lm.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    activeIdx === idx
                      ? "bg-[#62AA9E] text-[#0d2828] font-bold shadow"
                      : "bg-[#153D3D] text-[#EDE5DA]/70 border border-[#EDE5DA]/15 hover:text-[#EDE5DA]"
                  }`}
                >
                  {idx + 1}. {lm.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Landmark Profile Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0d2828] border border-[#EDE5DA]/15 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Landmark Photo Frame */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#081a1a] border border-[#EDE5DA]/10 shadow-inner">
                <Image
                  key={activeLandmark.image}
                  src={activeLandmark.image}
                  alt={activeLandmark.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-all duration-700 hover:scale-105"
                />
              </div>

              {/* Landmark Description & Proximity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#EDE5DA]/10">
                  <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest font-semibold">
                    {activeLandmark.category}
                  </span>
                  <span className="font-mono text-xs text-[#808080]">
                    {activeLandmark.number} of 07
                  </span>
                </div>

                <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light leading-snug">
                  {activeLandmark.name}
                </h3>

                <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                  {activeLandmark.summary}
                </p>
              </div>

            </div>

            {/* Proximity / Connection Footer */}
            <div className="pt-6 mt-6 border-t border-[#EDE5DA]/10 flex items-center justify-between text-xs font-sans-body">
              <div className="flex items-center gap-1.5 text-[#62AA9E]">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-medium tracking-wide">{activeLandmark.proximity}</span>
              </div>
              <div className="flex items-center gap-1 text-[#808080]">
                <Navigation className="w-3 h-3 text-[#62AA9E]" />
                <span>Beside Orion One</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
