"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

interface CommercialHeroProps {
  onOpenInquiry?: () => void;
}

export default function CommercialHero({ onOpenInquiry }: CommercialHeroProps) {
  const scrollToSpaces = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("spaces");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-32 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto overflow-hidden">
      {/* Subtle ambient lighting vignette */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] bg-[#62AA9E]/6 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Massive Editorial Display Canopy */}
      <div className="pb-12 sm:pb-20 max-w-5xl">
        <p className="font-sans-body text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#62AA9E] mb-6">
          01 — Commercial Destination · DHA Phase III Islamabad
        </p>
        <h1 className="font-serif-heading text-5xl sm:text-7xl lg:text-8xl xl:text-[5.5rem] font-light text-[#EDE5DA] tracking-tight leading-[0.98] uppercase">
          Where Business <br />
          <span className="italic font-normal text-sand-gradient normal-case">Meets Destination Living.</span>
        </h1>
        <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light leading-relaxed max-w-2xl pt-6">
          Commercial spaces for brands, businesses, and entrepreneurs looking for a distinctive address at Orion One.
        </p>

        {/* Action Controls */}
        <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="#spaces"
            onClick={scrollToSpaces}
            className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
          >
            <span>Explore Commercial</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] hover:border-[#62AA9E]/50 border border-[#EDE5DA]/15 px-7 py-3.5 rounded-full transition-all duration-300 shadow-md uppercase cursor-pointer"
          >
            <span>Enquire Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
          </button>
        </div>
      </div>

      {/* Pure Borderless Architectural Photography Frame */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-[#0d2828] border border-[#EDE5DA]/10">
        <Image
          src="/images/commercial/podium-exterior.jpg"
          alt="Orion One Commercial Promenade and Waterfront Podium"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Orientation Attributes Ledger */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 border-t border-[#EDE5DA]/15 pt-8 sm:pt-10 mt-8 sm:mt-10">
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest block font-medium">
            Location
          </span>
          <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA] font-light">
            Sector F, DHA Phase III, Islamabad
          </p>
          <p className="font-sans-body text-[11px] text-[#808080]">
            Beside Lakeview Commercial & Dancing Fountains
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest block font-medium">
            Commercial Levels
          </span>
          <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA] font-light">
            Ground Floor & First Floor Podium
          </p>
          <p className="font-sans-body text-[11px] text-[#808080]">
            Grand Double-Height Retail & Dining Terraces
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest block font-medium">
            Integration
          </span>
          <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA] font-light">
            Mixed-Use Lakefront Destination
          </p>
          <p className="font-sans-body text-[11px] text-[#808080]">
            Built-In Residential & Regional Visitor Flow
          </p>
        </div>
      </div>
    </section>
  );
}
