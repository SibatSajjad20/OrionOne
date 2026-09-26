"use client";

import { useState } from "react";
import Image from "next/image";

interface Realm {
  id: string;
  number: string;
  name: string;
  elevation: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  specs: { label: string; detail: string }[];
}

const realms: Realm[] = [
  {
    id: "residences",
    number: "01",
    name: "Residences",
    elevation: "FLOORS 03 TO 09 // LAKEFRONT SANCTUARY",
    tagline: "Prestige Lakefront Sanctuary",
    description:
      "Elevated one and two bedroom residences conceived around light, quiet, and expansive water horizons. Balconies are engineered as true outdoor living rooms hovering directly above the lake.",
    image: "/images/about/lakefront-balcony.jpg",
    alt: "Orion One Private Balcony with Uninterrupted Lake Views",
    specs: [
      { label: "Orientation", detail: "Uninterrupted 180 degree panoramic lake horizon" },
      { label: "Architecture", detail: "Floor to ceiling acoustic double glazing" },
      { label: "Living Edge", detail: "Deep outdoor terrace with frameless glass" },
    ],
  },
  {
    id: "commercial",
    number: "02",
    name: "Commercial",
    elevation: "GROUND AND FIRST FLOOR // LAKEFRONT ARCADE",
    tagline: "Lakeview Commercial Promenade",
    description:
      "Ground and first floor spaces tailored for flagship luxury showrooms, boutique retailers, and corporate offices seeking premier visibility along the most anticipated shoreline in DHA Phase III.",
    image: "/images/about/commercial-arcade.png",
    alt: "Orion One Commercial Promenade and Retail Frontage",
    specs: [
      { label: "Position", detail: "Direct lakefront promenade frontage" },
      { label: "Ceiling Heights", detail: "Double height grand retail volumes" },
      { label: "Access", detail: "Dedicated commercial valet and drop off concourses" },
    ],
  },
  {
    id: "dining",
    number: "03",
    name: "Dining",
    elevation: "WATERFRONT DECK // CULINARY PROMENADE",
    tagline: "Open Air Terraces by the Water",
    description:
      "Lakeside fine dining terraces and sunset coffee lounges positioned beside the illuminated dancing fountains. An atmospheric setting where every evening becomes a sensory occasion.",
    image: "/images/about/dining-terrace.jpg",
    alt: "Orion One Lakeside Dining Terraces at Dusk",
    specs: [
      { label: "Ambiance", detail: "Waterfront alfresco dining beside dancing fountains" },
      { label: "Culinary", detail: "Curated artisanal bistros and signature restaurants" },
      { label: "Atmosphere", detail: "Open air sunset decks with reflected evening lights" },
    ],
  },
  {
    id: "wellness",
    number: "04",
    name: "Wellness",
    elevation: "MEZZANINE LEVEL // MOVEMENT AND RECOVERY",
    tagline: "Movement, Stillness and Recovery",
    description:
      "A holistic health sanctuary featuring a cantilevered horizon infinity pool, double height fitness club, dedicated steam and sauna suites, and tranquil private treatment rooms.",
    image: "/images/about/wellness-pool.png",
    alt: "Orion One Cantilevered Infinity Pool and Spa Suite",
    specs: [
      { label: "Aquatics", detail: "Cantilevered infinity pool overlooking open water" },
      { label: "Fitness", detail: "Double height cardio and strength training club" },
      { label: "Restoration", detail: "Private thermal suites, Finnish sauna and spa" },
    ],
  },
  {
    id: "community",
    number: "05",
    name: "Community",
    elevation: "SHORELINE LEVEL // BOARDWALK AND PLAZA",
    tagline: "Where Waterfront Life Gathers",
    description:
      "A continuous shoreline promenade connecting landscaped botanical trails, social courtyards, and the tranquil Orion Mosque, masterplanned to foster genuine human connection.",
    image: "/images/about/lake-side-view.jpg",
    alt: "Shoreline Promenade and Surrounding Landscape",
    specs: [
      { label: "Connectivity", detail: "Continuous pedestrian shoreline walking and jogging trail" },
      { label: "Sanctuary", detail: "The bespoke architectural Orion Mosque" },
      { label: "Landscape", detail: "Botanical courtyards with native water edge flora" },
    ],
  },
];

export default function AboutEcosystem() {
  const [activeRealm, setActiveRealm] = useState<Realm>(realms[0]);

  return (
    <section id="ecosystem" className="relative py-28 sm:py-40 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Section Canopy - Centered */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
        <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
          Prestige Lakefront Living <br />
          <span className="italic font-normal text-sand-gradient normal-case">Five Connected Realms</span>
        </h2>
        <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl mx-auto">
          Designed around the lake, shaped by contemporary architecture, and created for a more considered way of living. At Orion One, every dimension of daily life exists in natural balance.
        </p>
      </div>

      {/* Architectural Realm Selector Tabs */}
      <div className="border-b border-[#EDE5DA]/15 mb-10 sm:mb-14 overflow-x-auto no-scrollbar scroll-smooth overscroll-contain">
        <div className="flex items-center justify-center space-x-6 sm:space-x-10 min-w-max pb-4 mx-auto">
          {realms.map((realm) => {
            const isActive = activeRealm.id === realm.id;
            return (
              <button
                key={realm.id}
                onClick={() => setActiveRealm(realm)}
                className={`group flex items-baseline gap-3 text-left transition-all duration-300 cursor-pointer pb-2 relative ${
                  isActive ? "text-[#EDE5DA]" : "text-[#EDE5DA]/40 hover:text-[#EDE5DA]/70"
                }`}
              >
                <span className="font-serif-heading text-base sm:text-xl font-light tracking-wide uppercase">
                  {realm.name}
                </span>

                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#62AA9E]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Architectural Exhibition Viewport Spread */}
      <div className="space-y-10">
        {/* Pure Borderless Panoramic Visual Frame */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-[#0d2828]">
          <Image
            key={activeRealm.id}
            src={activeRealm.image}
            alt={activeRealm.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-all duration-700 ease-out"
          />
        </div>

        {/* Integrated Editorial & Technical Specification Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start border-t border-[#EDE5DA]/15 pt-8">
          {/* Left: Narrative */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
              {activeRealm.tagline}
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
              {activeRealm.description}
            </p>
          </div>

          {/* Right: Technical Specifications Ledger */}
          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[#EDE5DA]/15 pt-6 lg:pt-0 lg:pl-10 space-y-4">
            <div className="divide-y divide-[#EDE5DA]/10">
              {activeRealm.specs.map((spec, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 text-xs">
                  <span className="font-sans-body text-[#62AA9E] font-medium tracking-wider uppercase text-[10px]">
                    {spec.label}
                  </span>
                  <span className="font-sans-body text-[#EDE5DA]/90 font-light text-left sm:text-right">
                    {spec.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
