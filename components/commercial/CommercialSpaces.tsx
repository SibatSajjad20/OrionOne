"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CommercialSpacesProps {
  onOpenInquiry?: () => void;
}

export default function CommercialSpaces({ onOpenInquiry }: CommercialSpacesProps) {

  return (
    <section id="spaces" className="relative py-16 sm:py-36 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mb-12 sm:mb-16 space-y-4">
        <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
          Your Business <br />
          <span className="italic font-normal text-sand-gradient normal-case">
            Your Space
          </span>
        </h2>
        <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
          Engineered across two dedicated commercial levels to support dining, retail, corporate offices, and lifestyle businesses with distinctive visibility.
        </p>
      </div>

      {/* Ground & First Floor Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 sm:gap-y-12 mb-16 sm:mb-20">
        <div className="group border-t border-[#EDE5DA]/20 pt-6 sm:pt-8 flex flex-col justify-start transition-colors duration-300">
          <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light tracking-tight mb-3 group-hover:text-[#62AA9E] transition-colors">
            Ground Floor
          </h3>
          <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
            Retail and customer-facing commercial opportunities with grand double-height frontage, direct lakefront dining terraces, and integrated parking access.
          </p>
        </div>

        <div className="group border-t border-[#EDE5DA]/20 pt-6 sm:pt-8 flex flex-col justify-start transition-colors duration-300">
          <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light tracking-tight mb-3 group-hover:text-[#62AA9E] transition-colors">
            First Floor
          </h3>
          <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
            Additional spaces for retail, dining, offices, and lifestyle businesses with elevated lake horizon views and dedicated executive lift access.
          </p>
        </div>
      </div>

      {/* The Approved Commercial Floor Plan Exhibition Frame */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EDE5DA]/15">
          <h3 className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA] font-light">
            Commercial Floor Plan
          </h3>
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

        {/* Action Callout */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#EDE5DA]/10">
          <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light max-w-xl">
            Detailed unit allocations, customized spatial sizing, and commercial lease terms are reviewed directly with the SP Builders commercial leasing desk.
          </p>

          <button
            onClick={onOpenInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-7 py-3.5 rounded-full transition-all duration-300 shadow-md cursor-pointer shrink-0"
          >
            <span>Enquire About Available Spaces</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
