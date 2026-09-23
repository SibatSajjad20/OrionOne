"use client";

import { Eye, Users, Layers, UtensilsCrossed } from "lucide-react";

const ADVANTAGES = [
  {
    icon: Eye,
    number: "01",
    title: "Premium Visibility",
    headline: "Distinctive Architectural Landmark",
    description:
      "Commercial spaces engineered with prominent frontage along the main sector boulevard and lakefront promenade, ensuring continuous visual prominence from pedestrian and vehicular approaches.",
  },
  {
    icon: Users,
    number: "02",
    title: "Built-in Community",
    headline: "Immediate Captive Resident Base",
    description:
      "An integrated residential population of luxury apartments and penthouses right above provides an affluent, discerning customer ecosystem for daily dining, retail, and lifestyle services.",
  },
  {
    icon: Layers,
    number: "03",
    title: "Ground & First Floor",
    headline: "Dedicated Multi-Level Commercial Zone",
    description:
      "Purpose-built commercial podium across ground and first floors, offering double-height ceiling volumes, generous frontage, and intuitive pedestrian circulation separated from residential lobbies.",
  },
  {
    icon: UtensilsCrossed,
    number: "04",
    title: "Waterfront Dining",
    headline: "Lake-Facing Alfresco Terraces",
    description:
      "Open-air dining decks directly fronting the lake and dancing fountains, creating an atmospheric culinary destination that naturally draws patrons from across Islamabad and Rawalpindi.",
  },
];

export default function CommercialAdvantage() {
  return (
    <section className="relative py-24 sm:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden">
      {/* Ambient glow vignette */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#62AA9E]/4 rounded-full blur-[200px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 sm:mb-20 space-y-4">
          <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
            04 — The Commercial Advantage
          </p>
          <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Designed For <br />
            <span className="italic font-normal text-sand-gradient normal-case">Visibility & Activity.</span>
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            The commercial proposition at Orion One unites high footfall, architectural distinction, and built-in demand to secure long-term business vitality.
          </p>
        </div>

        {/* 4 Architectural Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.number}
                className="relative bg-[#0d2828] border border-[#EDE5DA]/15 p-8 sm:p-10 rounded-xl transition-all duration-300 hover:border-[#62AA9E]/40 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#EDE5DA]/10">
                    <div className="w-10 h-10 rounded-lg bg-[#153D3D] border border-[#EDE5DA]/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#62AA9E]" />
                    </div>
                    <span className="font-mono text-xs text-[#62AA9E] tracking-widest font-medium">
                      {adv.number}
                    </span>
                  </div>

                  <div className="pt-6 space-y-2.5">
                    <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest block font-medium">
                      {adv.title}
                    </span>
                    <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
                      {adv.headline}
                    </h3>
                    <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed pt-2">
                      {adv.description}
                    </p>
                  </div>
                </div>

                <div className="pt-8 mt-4 border-t border-[#EDE5DA]/10 flex items-center justify-between text-[11px] text-[#808080]">
                  <span className="font-sans-body uppercase tracking-wider">
                    Orion One Masterplan
                  </span>
                  <span className="text-[#62AA9E]/80">Verified Pillar</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brochure Reference Note */}
        <div className="mt-12 pt-8 border-t border-[#EDE5DA]/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#808080]">
          <p className="font-sans-body font-light">
            Identified in the official Orion One Development Specifications: premium visibility, waterfront positioning, built-in residential community, and dedicated two-floor commercial zone.
          </p>
          <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest shrink-0">
            DHA Phase III · Sector F
          </span>
        </div>
      </div>
    </section>
  );
}
