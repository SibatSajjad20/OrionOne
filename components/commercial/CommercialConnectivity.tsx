"use client";

import { Navigation2, Landmark, Compass, Route } from "lucide-react";

const PRIMARY_ARTERIES = [
  {
    name: "DHA Main Boulevards",
    type: "Direct Sector Access",
    detail: "Immediate wide-artery vehicular ingress and egress facilitating uninterrupted customer circulation.",
  },
  {
    name: "GT Road Islamabad",
    type: "National Highway Link",
    detail: "Rapid regional connection bridging the twin cities of Islamabad and Rawalpindi.",
  },
  {
    name: "Rawalpindi Ring Road",
    type: "Strategic Bypass Corridor",
    detail: "Seamless high-capacity bypass connecting suburban growth sectors and commercial freight.",
  },
  {
    name: "Islamabad Expressway",
    type: "Primary Civic Artery",
    detail: "Direct high-speed corridor into downtown Islamabad, Blue Area, and government ministries.",
  },
  {
    name: "Islamabad International Airport",
    type: "Global Gateway Access",
    detail: "Streamlined highway route connecting Orion One directly to international flight terminals.",
  },
];

const SURROUNDING_DESTINATIONS = [
  {
    title: "Schools & Universities",
    desc: "Renowned academic campuses in DHA and surrounding sectors driving daily family commuting.",
  },
  {
    title: "Healthcare Facilities",
    desc: "Tertiary medical centers, specialized clinics, and wellness institutions within rapid radius.",
  },
  {
    title: "Retail & Dining Destinations",
    desc: "Established Bahria and DHA shopping districts complementing Orion One's waterfront promenade.",
  },
  {
    title: "Business Districts",
    desc: "Immediate adjacency to DHA commercial centers, corporate regional offices, and banking hubs.",
  },
  {
    title: "Future Growth Corridors",
    desc: "Positioned right along the prime trajectory of Islamabad's southward infrastructural expansion.",
  },
];

export default function CommercialConnectivity() {
  return (
    <section className="relative py-24 sm:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden">
      {/* Subtle atmospheric vignette */}
      <div
        className="absolute top-1/2 left-10 -translate-y-1/2 w-[500px] h-[500px] bg-[#62AA9E]/4 rounded-full blur-[180px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 sm:mb-20 space-y-4">
          <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
            06 — Connected To The City
          </p>
          <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            A Location Built <br />
            <span className="italic font-normal text-sand-gradient normal-case">Around Access.</span>
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            Orion One&apos;s commercial proposition is supported by direct access to the wider DHA, Islamabad, and Rawalpindi road network.
          </p>
        </div>

        {/* Two-Column Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Primary Transit Arteries */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#EDE5DA]/15">
              <Route className="w-4 h-4 text-[#62AA9E]" />
              <h3 className="font-sans-body text-xs font-semibold uppercase tracking-[0.25em] text-[#EDE5DA]">
                Major Transit Arteries
              </h3>
            </div>

            <div className="divide-y divide-[#EDE5DA]/10">
              {PRIMARY_ARTERIES.map((artery, idx) => (
                <div key={artery.name} className="py-5 space-y-1.5 group">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light group-hover:text-[#62AA9E] transition-colors">
                      {artery.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#808080] block">
                    {artery.type}
                  </span>
                  <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed">
                    {artery.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Surrounding Network Nodes */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#EDE5DA]/15">
              <Compass className="w-4 h-4 text-[#62AA9E]" />
              <h3 className="font-sans-body text-xs font-semibold uppercase tracking-[0.25em] text-[#EDE5DA]">
                Surrounding Strategic Nodes
              </h3>
            </div>

            <div className="divide-y divide-[#EDE5DA]/10">
              {SURROUNDING_DESTINATIONS.map((dest, idx) => (
                <div key={dest.title} className="py-5 space-y-1.5 group">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light group-hover:text-[#62AA9E] transition-colors">
                      {dest.title}
                    </span>
                    <span className="font-mono text-[10px] text-[#808080]">
                      Node 0{idx + 1}
                    </span>
                  </div>
                  <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed">
                    {dest.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Verification Marker */}
            <div className="pt-4 border-t border-[#EDE5DA]/10">
              <p className="font-mono text-[10px] text-[#808080] uppercase tracking-wider">
                Documented in the official Orion One brochure location infrastructure register
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
