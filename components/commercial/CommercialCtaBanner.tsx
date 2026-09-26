"use client";

import { ArrowUpRight, Compass } from "lucide-react";

interface CommercialCtaBannerProps {
  onOpenInquiry?: () => void;
}

export default function CommercialCtaBanner({ onOpenInquiry }: CommercialCtaBannerProps) {
  return (
    <section className="relative py-16 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-t border-[#EDE5DA]/15">
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#62AA9E]/6 rounded-full blur-[180px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-16 text-center space-y-8">
        <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.05] uppercase max-w-4xl mx-auto">
          Build Your <br />
          <span className="italic font-normal text-sand-gradient normal-case">
            Next Business Destination
          </span>
        </h2>

        <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light max-w-xl mx-auto leading-relaxed">
          Explore commercial opportunities at Orion One. Secure a rare position along Islamabad&apos;s most anticipated shoreline promenade.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={onOpenInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-xl cursor-pointer"
          >
            <span>Enquire Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] border border-[#EDE5DA]/15 hover:border-[#62AA9E]/40 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#62AA9E]" />
            <span>Book A Private Tour</span>
          </button>
        </div>

        <div className="pt-8 border-t border-[#EDE5DA]/10 flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs text-[#808080] font-sans-body">
          <span>Show Suite Open Daily</span>
          <span className="hidden sm:inline">·</span>
          <span>District 101, Bahria Phase VIII</span>
          <span className="hidden sm:inline">·</span>
          <span>0333 6660722</span>
        </div>
      </div>
    </section>
  );
}
