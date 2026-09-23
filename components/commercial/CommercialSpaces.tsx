"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, X, Check, ArrowUpRight } from "lucide-react";

interface CommercialUnit {
  id: string;
  code: string;
  category: string;
  sizeSqFt: number;
  floor: string;
  frontage: string;
  layout: string;
  availability: "Available" | "Reserved" | "In Negotiation";
  features: string;
}

const UNITS_DATA: CommercialUnit[] = [
  {
    id: "kiosk-01",
    code: "FOOD KIOSK 01",
    category: "Gourmet / Beverage Kiosk",
    sizeSqFt: 121,
    floor: "Ground Floor",
    frontage: "Waterfront Terrace Facing",
    layout: "Open Counter / Express Service",
    availability: "Available",
    features: "Direct proximity to 1,484 sq ft covered dining promenade",
  },
  {
    id: "kiosk-02",
    code: "FOOD KIOSK 02",
    category: "Artisanal Food Concept",
    sizeSqFt: 147,
    floor: "Ground Floor",
    frontage: "Waterfront Terrace Facing",
    layout: "Open Counter / Kitchen Setup",
    availability: "Available",
    features: "High pedestrian visibility with outdoor lake seating access",
  },
  {
    id: "kiosk-03",
    code: "FOOD KIOSK 03",
    category: "Dessert & Coffee Bar",
    sizeSqFt: 139,
    floor: "Ground Floor",
    frontage: "Waterfront Terrace Facing",
    layout: "Counter & Display Vitrine",
    availability: "Available",
    features: "Corner position adjacent to open-air lake sitting deck",
  },
  {
    id: "kiosk-04",
    code: "FOOD KIOSK 04",
    category: "Signature Quick-Bite",
    sizeSqFt: 156,
    floor: "Ground Floor",
    frontage: "Waterfront Terrace Facing",
    layout: "Expanded Counter Layout",
    availability: "Available",
    features: "Closest to spiral architectural stairway and promenade link",
  },
  {
    id: "shop-1g-01",
    code: "SHOP 1G-1",
    category: "Boutique Retail",
    sizeSqFt: 113,
    floor: "Ground Floor",
    frontage: "Central Galleria Arcade",
    layout: "Retail Showroom & Vitrine",
    availability: "Available",
    features: "Flanked by restroom concourse & main lobby thoroughfare",
  },
  {
    id: "shop-1g-02",
    code: "SHOP 1G-2",
    category: "Specialty Retail",
    sizeSqFt: 136,
    floor: "Ground Floor",
    frontage: "10'-0\" Wide Central Corridor",
    layout: "Linear Boutique Display",
    availability: "Available",
    features: "High-frequency central arcade pedestrian corridor",
  },
  {
    id: "shop-1g-03",
    code: "SHOP 1G-3",
    category: "Fashion / Accessories",
    sizeSqFt: 134,
    floor: "Ground Floor",
    frontage: "10'-0\" Wide Central Corridor",
    layout: "Linear Boutique Display",
    availability: "Available",
    features: "Direct line of sight from primary commercial entrance",
  },
  {
    id: "shop-1g-04",
    code: "SHOP 1G-4",
    category: "Perfumery / Eyewear",
    sizeSqFt: 125,
    floor: "Ground Floor",
    frontage: "10'-0\" Wide Central Corridor",
    layout: "Compact Luxury Vitrine",
    availability: "Available",
    features: "Adjoins North corridor junction towards escalators",
  },
  {
    id: "shop-1g-05",
    code: "SHOP 1G-5",
    category: "Flagship Restaurant / Retail",
    sizeSqFt: 448,
    floor: "Ground Floor",
    frontage: "Lakeview Corner Facing",
    layout: "Wide Angular Showroom / Dining",
    availability: "Available",
    features: "Expansive glass frontage overlooking covered sitting terrace",
  },
  {
    id: "shop-1g-06",
    code: "SHOP 1G-6",
    category: "Premium Dining / Lounge",
    sizeSqFt: 400,
    floor: "Ground Floor",
    frontage: "Waterfront Sitting Deck",
    layout: "Deep Dining Hall & Service Area",
    availability: "Available",
    features: "Direct access to 1,763 sq ft open sitting garden area",
  },
  {
    id: "shop-1g-07",
    code: "SHOP 1G-7",
    category: "Signature Retail / Café",
    sizeSqFt: 480,
    floor: "Ground Floor",
    frontage: "Eastern Lakefront Promenade",
    layout: "Curved Panoramic Showroom",
    availability: "Available",
    features: "Architectural curved glass perimeter with maximum lake exposure",
  },
  {
    id: "shop-1g-08",
    code: "SHOP 1G-8",
    category: "Lifestyle / Showroom",
    sizeSqFt: 362,
    floor: "Ground Floor",
    frontage: "Eastern Curved Corridor",
    layout: "Deep Curved Showroom",
    availability: "Available",
    features: "Generous 8'-0\" corridor frontage with expansive ceiling height",
  },
  {
    id: "shop-1g-09",
    code: "SHOP 1G-9",
    category: "Design / Electronics Atelier",
    sizeSqFt: 270,
    floor: "Ground Floor",
    frontage: "Eastern Curved Corridor",
    layout: "Open Studio Floorplan",
    availability: "Available",
    features: "Optimal proportions for boutique tech or design studio",
  },
  {
    id: "shop-1g-10",
    code: "SHOP 1G-10",
    category: "Anchor Retail",
    sizeSqFt: 435,
    floor: "Ground Floor",
    frontage: "South-East Corner Promenade",
    layout: "Corner Flagship Layout",
    availability: "Available",
    features: "Double-aspect visibility facing parking concourse & lakeside trail",
  },
  {
    id: "shop-1g-11",
    code: "SHOP 1G-11",
    category: "Service / Convenience",
    sizeSqFt: 148,
    floor: "Ground Floor",
    frontage: "Southern Entrance Concourse",
    layout: "Street-Level Frontage",
    availability: "Available",
    features: "Direct access to outdoor vehicular drop-off & parking bays",
  },
  {
    id: "shop-1g-12",
    code: "SHOP 1G-12",
    category: "Apparel / Gift Concept",
    sizeSqFt: 193,
    floor: "Ground Floor",
    frontage: "Southern Entrance Concourse",
    layout: "Street-Level Frontage",
    availability: "Available",
    features: "Adjacent to double-height main architectural portal",
  },
  {
    id: "shop-1g-13",
    code: "SHOP 1G-13",
    category: "Flagship Anchor Store",
    sizeSqFt: 519,
    floor: "Ground Floor",
    frontage: "Main Double-Height Plaza",
    layout: "Grand Open Flagship Floor",
    availability: "Available",
    features: "Premier unit beside main building double-height entryway",
  },
  {
    id: "shop-1g-14",
    code: "SHOP 1G-14",
    category: "Premium Commercial / Bank",
    sizeSqFt: 431,
    floor: "Ground Floor",
    frontage: "Main Plaza & Corridor",
    layout: "Executive Floorplan",
    availability: "Available",
    features: "Direct adjacency to dedicated apartment reception lobby",
  },
  {
    id: "shop-1g-15",
    code: "SHOP 1G-15",
    category: "Boutique Service",
    sizeSqFt: 153.6,
    floor: "Ground Floor",
    frontage: "Central Escalator Concourse",
    layout: "Galleria Vitrine",
    availability: "Available",
    features: "Facing central escalator atrium and passenger lifts",
  },
  {
    id: "shop-1g-16",
    code: "SHOP 1G-16",
    category: "Optics / Jewelry",
    sizeSqFt: 155,
    floor: "Ground Floor",
    frontage: "Central Escalator Concourse",
    layout: "High-Security Luxury Vitrine",
    availability: "Available",
    features: "Heavy-traffic junction beside central escalator banks",
  },
  {
    id: "shop-1g-17",
    code: "SHOP 1G-17",
    category: "Specialty Showroom",
    sizeSqFt: 235,
    floor: "Ground Floor",
    frontage: "Central Island Pavilion",
    layout: "360-Degree Corridor Exposure",
    availability: "Available",
    features: "Prominent island placement surrounded by 8'-0\" circulation",
  },
];

interface CommercialSpacesProps {
  onOpenInquiry?: () => void;
}

export default function CommercialSpaces({ onOpenInquiry }: CommercialSpacesProps) {
  const [selectedFloor, setSelectedFloor] = useState<"ground" | "first">("ground");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUnit, setActiveUnit] = useState<CommercialUnit>(UNITS_DATA[0]);

  const filteredUnits = UNITS_DATA.filter((unit) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "kiosks") return unit.code.includes("KIOSK");
    if (selectedFilter === "prime") return unit.sizeSqFt >= 350;
    if (selectedFilter === "boutique") return unit.sizeSqFt < 350 && !unit.code.includes("KIOSK");
    return true;
  });

  return (
    <section id="spaces" className="relative py-28 sm:py-40 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-4xl mb-12 sm:mb-16 space-y-4">
        <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
          07 — Commercial Spaces
        </p>
        <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
          Your Business. <br />
          <span className="italic font-normal text-sand-gradient normal-case">Your Space.</span>
        </h2>
        <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
          Engineered across two dedicated commercial levels to support dining, retail, corporate offices, and lifestyle businesses with distinctive visibility.
        </p>
      </div>

      {/* Levels Architectural Ledger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        <div
          onClick={() => setSelectedFloor("ground")}
          className={`p-6 sm:p-8 rounded-xl border transition-all cursor-pointer ${
            selectedFloor === "ground"
              ? "bg-[#0d2828] border-[#62AA9E]"
              : "bg-[#0d2828]/40 border-[#EDE5DA]/15 hover:border-[#EDE5DA]/30"
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DA]/10">
            <span className="font-mono text-xs text-[#62AA9E] uppercase tracking-widest font-medium">
              Level 01
            </span>
            <span className="font-sans-body text-[11px] text-[#EDE5DA]/60 uppercase tracking-wider">
              Approved Masterplan
            </span>
          </div>
          <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light mt-4 mb-2">
            Ground Floor
          </h3>
          <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
            Retail and customer-facing commercial opportunities with grand double-height frontage, direct lakefront dining terraces, and integrated parking access.
          </p>
          <div className="mt-4 pt-4 border-t border-[#EDE5DA]/10 flex items-center justify-between text-xs text-[#62AA9E]">
            <span>17 Retail Suites · 4 Kiosks · 3,247 sq ft Terraces</span>
            {selectedFloor === "ground" && <Check className="w-4 h-4" />}
          </div>
        </div>

        <div
          onClick={() => setSelectedFloor("first")}
          className={`p-6 sm:p-8 rounded-xl border transition-all cursor-pointer ${
            selectedFloor === "first"
              ? "bg-[#0d2828] border-[#62AA9E]"
              : "bg-[#0d2828]/40 border-[#EDE5DA]/15 hover:border-[#EDE5DA]/30"
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DA]/10">
            <span className="font-mono text-xs text-[#62AA9E] uppercase tracking-widest font-medium">
              Level 02
            </span>
            <span className="font-sans-body text-[11px] text-[#EDE5DA]/60 uppercase tracking-wider">
              Podium Level
            </span>
          </div>
          <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light mt-4 mb-2">
            First Floor
          </h3>
          <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
            Additional spaces for retail, dining, corporate offices, and lifestyle businesses with elevated lake horizon views and dedicated executive lift banks.
          </p>
          <div className="mt-4 pt-4 border-t border-[#EDE5DA]/10 flex items-center justify-between text-xs text-[#62AA9E]">
            <span>Corporate Suites · Elevated Boutiques · Specialty Clinics</span>
            {selectedFloor === "first" && <Check className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* The Approved Commercial Floor Plan Exhibition Frame (NO OVERLAY LABELS) */}
      <div className="space-y-6 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EDE5DA]/15">
          <div>
            <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest block font-medium">
              Official Architectural Drawing · Ground Floor
            </span>
            <h3 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA] font-light">
              Approved Commercial Ground-Floor Layout
            </h3>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans-body text-[#EDE5DA] hover:text-[#62AA9E] transition-colors py-1 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#62AA9E]" />
            <span>Enlarge Floor Plan</span>
          </button>
        </div>

        {/* Clean, Framed Floor Plan View */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#081a1a] border border-[#EDE5DA]/15">
          <Image
            src="/images/commercial/floor-plan-ground.png"
            alt="Approved Orion One Ground Floor Commercial Architectural Plan"
            fill
            sizes="100vw"
            className="object-contain p-2 sm:p-6"
          />
        </div>

        {/* Floor Plan Descriptive Ledger */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-[#EDE5DA]/10 text-xs text-[#808080]">
          <div>
            <span className="font-mono text-[10px] text-[#62AA9E] uppercase block">Open Sitting Area</span>
            <span className="text-[#EDE5DA]">1,763.00 Sq Ft</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-[#62AA9E] uppercase block">Covered Sitting Area</span>
            <span className="text-[#EDE5DA]">1,484.00 Sq Ft</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-[#62AA9E] uppercase block">Corridor Circulation</span>
            <span className="text-[#EDE5DA]">8&apos;-0&quot; to 10&apos;-0&quot; Wide</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-[#62AA9E] uppercase block">Podium Elevation</span>
            <span className="text-[#EDE5DA]">Double-Height Atrium</span>
          </div>
        </div>
      </div>

      {/* Units Directory Matrix */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EDE5DA]/15">
          <div>
            <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest block font-medium">
              Inventory Ledger
            </span>
            <h3 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA] font-light">
              Available Units & Dimensions
            </h3>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Units" },
              { id: "prime", label: "Prime (350+ sq ft)" },
              { id: "boutique", label: "Boutique (100–350 sq ft)" },
              { id: "kiosks", label: "Food Kiosks" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? "bg-[#62AA9E] text-[#0d2828] font-semibold"
                    : "bg-[#0d2828] text-[#EDE5DA]/70 hover:text-[#EDE5DA] border border-[#EDE5DA]/15"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Units Table */}
        <div className="bg-[#0d2828] border border-[#EDE5DA]/15 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs font-sans-body divide-y divide-[#EDE5DA]/10 min-w-[700px]">
            <thead className="bg-[#153D3D]/60 text-[10px] uppercase tracking-[0.2em] text-[#62AA9E]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Unit Code</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Size (Sq Ft)</th>
                <th className="py-3.5 px-4">Frontage</th>
                <th className="py-3.5 px-4">Floor</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Inquire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE5DA]/10 text-[#EDE5DA]/85 font-light">
              {filteredUnits.map((unit) => (
                <tr
                  key={unit.id}
                  onClick={() => setActiveUnit(unit)}
                  className={`hover:bg-[#153D3D]/40 transition-colors cursor-pointer ${
                    activeUnit.id === unit.id ? "bg-[#153D3D]/30" : ""
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-[11px] font-medium text-[#EDE5DA]">
                    {unit.code}
                  </td>
                  <td className="py-3.5 px-4 text-xs">{unit.category}</td>
                  <td className="py-3.5 px-4 font-mono text-[#62AA9E]">
                    {unit.sizeSqFt.toLocaleString()} sq ft
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-[#C9BFB1]">{unit.frontage}</td>
                  <td className="py-3.5 px-4 text-[11px] text-[#808080]">{unit.floor}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#62AA9E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#62AA9E]" />
                      {unit.availability}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenInquiry) onOpenInquiry();
                      }}
                      className="text-[10px] uppercase tracking-widest text-[#62AA9E] hover:text-[#EDE5DA] transition-colors font-semibold cursor-pointer"
                    >
                      Reserve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Unit Details Panel */}
        <div className="bg-[#081a1a] border border-[#EDE5DA]/15 p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#62AA9E] font-medium">
                {activeUnit.code}
              </span>
              <span className="font-sans-body text-xs text-[#EDE5DA]/60">·</span>
              <span className="font-mono text-xs text-[#EDE5DA]">
                {activeUnit.sizeSqFt} SQ FT
              </span>
            </div>
            <h4 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
              {activeUnit.category} — {activeUnit.layout}
            </h4>
            <p className="font-sans-body text-xs text-[#C9BFB1] font-light">
              {activeUnit.features}
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-6 py-3 rounded-full transition-all duration-300 shadow-md cursor-pointer shrink-0"
          >
            <span>Discuss Space Requirement</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Full-Screen Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#081a1a]/95 backdrop-blur-md flex flex-col p-4 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DA]/15">
            <div>
              <h3 className="font-serif-heading text-xl text-[#EDE5DA]">
                Approved Ground Floor Commercial Architectural Layout
              </h3>
              <p className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest">
                Orion One · DHA Phase III Sector F
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 rounded-full hover:bg-[#153D3D] text-[#EDE5DA] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 w-full my-4 overflow-auto bg-[#0d2828] rounded-xl flex items-center justify-center p-4">
            <div className="relative w-full h-full max-h-[85vh]">
              <Image
                src="/images/commercial/floor-plan-ground.png"
                alt="Approved Commercial Ground Floor Architectural Plan"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
