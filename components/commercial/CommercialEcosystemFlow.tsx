"use client";

import { useState } from "react";
import { ArrowRight, Building, Sparkles, Route, Store, Users, Coffee, Compass } from "lucide-react";

interface FlowStep {
  step: string;
  title: string;
  subtitle: string;
  icon: typeof Building;
  description: string;
  points: string[];
}

const FLOW_STEPS: FlowStep[] = [
  {
    step: "01",
    title: "Orion One",
    subtitle: "The Architectural Core",
    icon: Building,
    description: "A luxury lakefront development providing an affluent, permanent residential population directly overhead.",
    points: ["Lakefront Penthouses & Residences", "High Net-Worth Resident Base", "Ground & First Floor Commercial Arcade"],
  },
  {
    step: "02",
    title: "Surrounding Amenities",
    subtitle: "Destination Magnets",
    icon: Sparkles,
    description: "Seven regional leisure attractions continuously drawing families, tourists, and dining enthusiasts.",
    points: ["Dancing Fountains & Lake Promenade", "DHA III Community Club", "Cinema, 5-Star Hotel & Amusements"],
  },
  {
    step: "03",
    title: "Road Network",
    subtitle: "Twin Cities Arteries",
    icon: Route,
    description: "Direct multilane access bringing affluent visitors from Islamabad, Rawalpindi, and DHA sectors.",
    points: ["DHA Main Boulevards & GT Road", "Islamabad Expressway Link", "Rawalpindi Ring Road Connectivity"],
  },
  {
    step: "04",
    title: "Commercial Ecosystem",
    subtitle: "Enduring Business Vitality",
    icon: Store,
    description: "The synthesis of captive residents and regional destination footfall driving sustained commercial revenue.",
    points: ["Day-to-Night Customer Cadence", "Finite Shoreline Scarcity", "High-Retention Commercial Address"],
  },
];

const DEMAND_DRIVERS = [
  {
    code: "RESIDENTS",
    label: "Built-In Residential Activity",
    desc: "Hundreds of permanent residents utilizing daily dining, boutique retail, and wellness services without leaving the premises.",
    icon: Users,
  },
  {
    code: "VISITORS",
    label: "Destination-Driven Leisure Traffic",
    desc: "Weekend and evening visitors drawn by the Dancing Fountains, sunset promenade, and scenic lakefront.",
    icon: Coffee,
  },
  {
    code: "COMMUNITY",
    label: "Nearby Social & Sports Infrastructure",
    desc: "Regular patronage from DHA Phase III Community Club members, sports facilities, and surrounding residential sectors.",
    icon: Sparkles,
  },
  {
    code: "BUSINESS",
    label: "Corporate & Commercial Hubs",
    desc: "Executive footfall from adjacent corporate offices, banking branches, and professional service firms.",
    icon: Building,
  },
  {
    code: "CONNECTIVITY",
    label: "Regional Road Access",
    desc: "Effortless highway ingress enabling patrons across Rawalpindi and Islamabad to visit seamlessly.",
    icon: Compass,
  },
];

export default function CommercialEcosystemFlow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-24 sm:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#62AA9E]/4 rounded-full blur-[200px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 sm:mb-20 space-y-4">
          <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
            08 — Why This Ecosystem Matters
          </p>
          <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            A Business Address <br />
            <span className="italic font-normal text-sand-gradient normal-case">With Activity Around It.</span>
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            The commercial opportunity at Orion One extends far beyond any individual unit — it is an active participant in an integrated regional ecosystem.
          </p>
        </div>

        {/* Visual Architectural Ecosystem Pipeline (Orion One → Surrounding Amenities → Road Network → Commercial Ecosystem) */}
        <div className="mb-16 sm:mb-20 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DA]/15">
            <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest font-medium">
              Ecosystem Connectivity Pathway
            </span>
            <span className="text-xs text-[#808080]">
              Interactive Sequence
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-[#0d2828] border-[#62AA9E] shadow-xl"
                      : "bg-[#0d2828]/40 border-[#EDE5DA]/15 hover:border-[#EDE5DA]/30"
                  }`}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DA]/10">
                    <span className="font-mono text-xs text-[#62AA9E] font-medium">
                      {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#153D3D] border border-[#EDE5DA]/15 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#62AA9E]" />
                    </div>
                  </div>

                  <div className="pt-4 space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#808080] block">
                      {step.subtitle}
                    </span>
                    <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
                      {step.title}
                    </h3>
                  </div>

                  <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed pt-3">
                    {step.description}
                  </p>

                  <div className="pt-4 mt-3 border-t border-[#EDE5DA]/10 space-y-1">
                    {step.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-[11px] text-[#EDE5DA]/75">
                        <span className="w-1 h-1 rounded-full bg-[#62AA9E]" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {idx < FLOW_STESTEPS_LENGTH_MINUS_ONE && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#153D3D] border border-[#EDE5DA]/20 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-[#62AA9E]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* The 5 Demand Engines Ledger */}
        <div className="space-y-6">
          <div className="pb-4 border-b border-[#EDE5DA]/15">
            <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest block font-medium">
              Demand Pillars Ledger
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
              Five Interlocking Demand Drivers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {DEMAND_DRIVERS.map((driver) => {
              const Icon = driver.icon;
              return (
                <div
                  key={driver.code}
                  className="bg-[#0d2828] border border-[#EDE5DA]/15 p-6 rounded-xl space-y-3 hover:border-[#62AA9E]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#153D3D] border border-[#EDE5DA]/15 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#62AA9E]" />
                    </div>
                    <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest font-medium">
                      {driver.code}
                    </span>
                  </div>

                  <h4 className="font-serif-heading text-lg text-[#EDE5DA] font-light">
                    {driver.label}
                  </h4>

                  <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed">
                    {driver.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const FLOW_STESTEPS_LENGTH_MINUS_ONE = 3;
