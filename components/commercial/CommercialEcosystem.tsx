"use client";

import Image from "next/image";
import {
  Users2,
  Waves,
  Film,
  Hotel,
  Trees,
  Utensils,
  FerrisWheel,
} from "lucide-react";

const ECOSYSTEM_FACILITIES = [
  {
    icon: Users2,
    name: "DHA III Community Club",
    category: "Recreation & Social",
    description: "A premier community destination supporting sports, leisure, and executive social activity.",
    impact: "High daytime & weekend family footfall",
  },
  {
    icon: Waves,
    name: "Dancing Fountains",
    category: "Leisure Attraction",
    description: "A signature visual and aquatic attraction contributing directly to the vibrant evening promenade experience.",
    impact: "Prime evening visitor concentration",
  },
  {
    icon: Film,
    name: "Cinema",
    category: "Entertainment",
    description: "A state-of-the-art cinematic complex generating sustained evening and weekend foot traffic.",
    impact: "Consistent night-time commercial activity",
  },
  {
    icon: Hotel,
    name: "Five-Star Hotel",
    category: "Hospitality",
    description: "Luxury hospitality infrastructure drawing regional, national, and international executive travelers.",
    impact: "High-spending corporate & leisure patrons",
  },
  {
    icon: Trees,
    name: "Parks & Open Spaces",
    category: "Environment",
    description: "Expansive landscaped trails and botanical greenery enhancing the area's overall pedestrian appeal.",
    impact: "Daily fitness & wellness visitor cadence",
  },
  {
    icon: Utensils,
    name: "Food Court & Dining",
    category: "Culinary Hub",
    description: "Established dining cluster creating a powerful synergistic culinary ecosystem for complementary concepts.",
    impact: "Broad regional dining destination pull",
  },
  {
    icon: FerrisWheel,
    name: "Lakeside Amusements",
    category: "Family Leisure",
    description: "Family-oriented amusement and lakeside recreation reinforcing the destination character of Sector F.",
    impact: "Continuous weekend and holiday volume",
  },
];

export default function CommercialEcosystem() {
  return (
    <section className="relative py-28 sm:py-40 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-4xl mb-12 sm:mb-16 space-y-4">
        <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
          05 — The Surrounding Ecosystem
        </p>
        <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
          Business Doesn&apos;t <br />
          <span className="italic font-normal text-sand-gradient normal-case">Operate in Isolation.</span>
        </h2>
        <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
          Orion One sits within a wider DHA Phase III environment that adds destinations, facilities, and continuous movement around the development.
        </p>
      </div>

      {/* Pure Borderless Masterplan Exhibition View (NO OVERLAY LABELS) */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-[#0d2828] border border-[#EDE5DA]/10 mb-12 sm:mb-16">
        <Image
          src="/images/commercial/location-masterplan.jpg"
          alt="Sector F DHA Phase III Masterplan Ecosystem and Dancing Fountains"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Captions Ledger underneath the frame */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#EDE5DA]/15 text-xs text-[#808080] gap-2">
        <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest">
          Brochure-Verified Destination Context · DHA Phase III Lakeview Commercial
        </span>
        <span className="font-sans-body">
          7 Integrated Surrounding Amenities
        </span>
      </div>

      {/* 7 Surrounding Facilities Ledger */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
        {ECOSYSTEM_FACILITIES.map((facility, idx) => {
          const Icon = facility.icon;
          return (
            <div
              key={facility.name}
              className="bg-[#0d2828] border border-[#EDE5DA]/15 p-6 rounded-xl space-y-4 hover:border-[#62AA9E]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#153D3D] border border-[#EDE5DA]/15 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#62AA9E]" />
                </div>
                <span className="font-mono text-[10px] text-[#808080]">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#62AA9E] block">
                  {facility.category}
                </span>
                <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
                  {facility.name}
                </h3>
                <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed">
                  {facility.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EDE5DA]/10">
                <span className="font-sans-body text-[11px] text-[#808080]">
                  Impact: <span className="text-[#EDE5DA]/80">{facility.impact}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
