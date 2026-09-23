"use client";

import { ArrowUpRight, Compass } from "lucide-react";

interface CommercialCtaBannerProps {
  onOpenInquiry?: () => void;
}

export default function CommercialCtaBanner({ onOpenInquiry }: CommercialCtaBannerProps) {
  const scrollToInquiry = () => {
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-28 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-t border-[#EDE5DA]/15">
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#62AA9E]/6 rounded-full blur-[180px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-16 text-center space-y-8">
        <p className="font-sans-body text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#62AA9E]">
          10 — Final Invitation · Sector F, DHA Phase III
        </p>

        <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.05] uppercase max-w-4xl mx-auto">
          Build Your <br />
          <span className="italic font-normal text-sand-gradient normal-case">
            Next Business Destination.
          </span>
        </h2>

        <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light max-w-xl mx-auto leading-relaxed">
          Explore commercial opportunities at Orion One. Secure a rare, finite position along Islamabad&apos;s most anticipated shoreline promenade.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={scrollToInquiry}
            className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-8 py-4 rounded-full transition-all duration-300 shadow-xl cursor-pointer"
          >
            <span>Enquire Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] border border-[#EDE5DA]/15 hover:border-[#62AA9E]/40 px-8 py-4 rounded-full transition-all duration-300 shadow-md cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#62AA9E]" />
            <span>Book A Private Tour</span>
          </button>
        </div>

        <div className="pt-8 border-t border-[#EDE5DA]/10 flex items-center justify-center gap-6 text-[11px] text-[#808080] font-sans-body">
          <span>Show Suite Open Daily 10AM – 7PM</span>
          <span>·</span>
          <span>District 101, Bahria Phase VIII</span>
          <span>·</span>
          <span>Direct Concierge: 0333 6660722</span>
        </div>
      </div>
    </section>
  );
}
