"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Category {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  alt: string;
  specs: { label: string; detail: string }[];
}

const CATEGORIES: Category[] = [
  {
    id: "restaurants",
    number: "01",
    title: "Signature Restaurants",
    shortDesc: "Destination dining concepts with a strong visual and experiential identity.",
    longDesc:
      "Lakeside fine dining and artisanal culinary concepts positioned along the open-air water terrace. Generous alfresco seating takes full advantage of the dancing fountains and sunset horizon.",
    image: "/images/commercial/dining-terrace.jpg",
    alt: "Orion One Waterfront Dining Terrace at Dusk",
    specs: [
      { label: "Optimal Location", detail: "Lakefront deck with dedicated open & covered sitting terraces" },
      { label: "Alfresco Capacity", detail: "Access to 3,247 sq ft combined outdoor dining areas" },
      { label: "Atmosphere", detail: "Illuminated dancing fountains and uninterrupted water horizon" },
      { label: "Kitchen & Venting", detail: "Dedicated exhaust ducts, 3-phase power & commercial gas provision" },
    ],
  },
  {
    id: "cafes",
    number: "02",
    title: "Premium Cafés",
    shortDesc: "Contemporary café concepts designed for everyday visits and social occasions.",
    longDesc:
      "Specialty coffee roasters, pastry bistros, and daytime work lounges that serve as the daily social heartbeat of Orion One. Designed with deep streetfront glazing and seamless indoor-outdoor transition.",
    image: "/images/commercial/retail-arcade.jpg",
    alt: "Contemporary Café and Retail Volume",
    specs: [
      { label: "Optimal Location", detail: "Ground floor pedestrian promenade and central arcade entrance" },
      { label: "Customer Cadence", detail: "Morning coffee rituals, business meetings, and sunset gathering" },
      { label: "Outdoor Seating", detail: "Canopied terrace frontage with natural breeze and lake view" },
      { label: "Infrastructure", detail: "Dedicated water filtration conduits and high-speed fiber backbone" },
    ],
  },
  {
    id: "retail",
    number: "03",
    title: "Boutique Retail",
    shortDesc: "Curated brands and retail experiences that complement the development.",
    longDesc:
      "Curated fashion ateliers, luxury jewelry boutiques, beauty concept stores, and artisanal retail showrooms along the high-visibility ground-floor galleria.",
    image: "/images/commercial/retail-arcade.jpg",
    alt: "Luxury Boutique Retail Galleria",
    specs: [
      { label: "Optimal Location", detail: "Grand central corridor and double-height entrance galleria" },
      { label: "Ceiling Clearance", detail: "Expansive double-height volumes up to 18 ft clear" },
      { label: "Display Frontage", detail: "Frameless acoustic floor-to-ceiling tempered glass display" },
      { label: "Logistics", detail: "Dedicated subterranean loading bay and freight lift connection" },
    ],
  },
  {
    id: "offices",
    number: "04",
    title: "Corporate Offices",
    shortDesc: "A premium setting for businesses seeking a distinctive commercial address.",
    longDesc:
      "Prestigious boutique corporate suites, private equity desks, architectural studios, and executive family offices that demand high-spec acoustics, private elevator access, and inspiring lake views.",
    image: "/images/commercial/podium-exterior.jpg",
    alt: "Corporate Office Podium Elevation",
    specs: [
      { label: "Optimal Location", detail: "First floor commercial wing with private executive entrance" },
      { label: "Access Control", detail: "Biometric and RFID smart elevator integration" },
      { label: "Parking Provision", detail: "Dedicated VIP and executive parking bays with valet desk" },
      { label: "Connectivity", detail: "Dual redundant gigabit fiber lines and backup generators" },
    ],
  },
  {
    id: "lifestyle",
    number: "05",
    title: "Lifestyle Businesses",
    shortDesc: "Concepts serving contemporary living, wellness, leisure, and everyday needs.",
    longDesc:
      "Boutique fitness studios, aesthetic wellness clinics, organic gourmet grocers, and design showrooms catering directly to Orion One residents and the affluent DHA Phase III neighborhood.",
    image: "/images/commercial/location-masterplan.jpg",
    alt: "Lifestyle & Wellness Destination Masterplan",
    specs: [
      { label: "Optimal Location", detail: "Ground & first floor perimeter suites with direct parking approach" },
      { label: "Client Base", detail: "Immediate captive resident demographic + broader DHA footfall" },
      { label: "Service Access", detail: "Secondary rear service corridors for inventory and staff" },
      { label: "Acoustics", detail: "Heavy-duty slab insulation and vibration dampening" },
    ],
  },
];

interface CommercialOpportunitiesProps {
  onOpenInquiry?: () => void;
}

export default function CommercialOpportunities({ onOpenInquiry }: CommercialOpportunitiesProps) {
  const [activeTab, setActiveTab] = useState<Category>(CATEGORIES[0]);

  return (
    <section id="opportunities" className="relative py-28 sm:py-40 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-4xl mb-12 sm:mb-16 space-y-4">
        <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
          03 — Commercial Opportunities
        </p>
        <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
          Find Your <br />
          <span className="italic font-normal text-sand-gradient normal-case">Business Space.</span>
        </h2>
        <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
          Curated commercial categories tailored to businesses that value architectural distinction, affluent demographics, and a premier lakefront address.
        </p>
      </div>

      {/* Category Tab Bar */}
      <div className="border-b border-[#EDE5DA]/15 mb-10 sm:mb-14 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-6 sm:space-x-10 min-w-max pb-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat)}
                className={`group flex items-baseline gap-3 text-left transition-all duration-300 cursor-pointer pb-2 relative ${
                  isActive ? "text-[#EDE5DA]" : "text-[#EDE5DA]/40 hover:text-[#EDE5DA]/70"
                }`}
              >
                <span
                  className={`font-mono text-[10px] sm:text-xs transition-colors ${
                    isActive ? "text-[#62AA9E]" : "text-[#EDE5DA]/30 group-hover:text-[#62AA9E]/60"
                  }`}
                >
                  {cat.number}
                </span>
                <span className="font-serif-heading text-base sm:text-xl font-light tracking-wide uppercase">
                  {cat.title}
                </span>

                {isActive && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#62AA9E]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Exhibition Spread */}
      <div className="space-y-10">
        {/* Pure Borderless Photography Frame (NO OVERLAY LABELS) */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-[#0d2828] border border-[#EDE5DA]/10">
          <Image
            key={activeTab.id}
            src={activeTab.image}
            alt={activeTab.alt}
            fill
            sizes="100vw"
            className="object-cover object-center transition-all duration-700 ease-out"
          />
        </div>

        {/* Narrative & Specifications Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start border-t border-[#EDE5DA]/15 pt-8">
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-[10px] text-[#62AA9E] tracking-widest uppercase block font-medium">
              Category {activeTab.number} // {activeTab.title}
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
              {activeTab.shortDesc}
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
              {activeTab.longDesc}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#62AA9E] hover:text-[#7ec1b6] transition-colors cursor-pointer group"
              >
                <span>Discuss {activeTab.title} Opportunity</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Specifications Ledger */}
          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[#EDE5DA]/15 pt-6 lg:pt-0 lg:pl-10 space-y-4">
            <span className="font-mono text-[10px] text-[#EDE5DA]/50 tracking-widest uppercase block">
              Architectural & Operational Attributes
            </span>
            <div className="divide-y divide-[#EDE5DA]/10">
              {activeTab.specs.map((spec, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 text-xs">
                  <span className="font-sans-body text-[#62AA9E] font-medium tracking-wider uppercase text-[10px]">
                    {spec.label}
                  </span>
                  <span className="font-sans-body text-[#EDE5DA]/90 font-light text-right">
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
