"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";

interface ContactCtaBannerProps {
  onOpenInquiry?: () => void;
}

export default function ContactCtaBanner({ onOpenInquiry }: ContactCtaBannerProps) {
  return (
    <section className="relative py-16 sm:py-36 bg-[#081a1a] border-t border-[#EDE5DA]/15 overflow-hidden text-center">
      {/* Subtle glowing ambient background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#62AA9E]/6 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Section Headline */}
        <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.12]">
          Let&apos;s Build Something <br className="hidden sm:inline" />
          <span className="italic font-normal text-sand-gradient">Remarkable</span>
        </h2>

        {/* Subtitle */}
        <p className="font-sans-body text-xs sm:text-sm lg:text-base text-[#C9BFB1] font-light max-w-2xl mx-auto leading-relaxed">
          A landmark mixed-use development that brings together modern living, commercial opportunities, and smart urban planning in one destination.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onOpenInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#EDE5DA] hover:bg-white text-[#0d2828] font-sans-body font-bold text-[11px] uppercase tracking-[0.2em] px-8 sm:px-10 py-4 rounded-full transition-all duration-300 shadow-xl shadow-black/30 hover:scale-[1.02] cursor-pointer"
          >
            <span>Schedule A Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-[#0d2828]" />
          </button>

          <a
            href="https://wa.me/923336660722?text=Hello,%20I%20would%20like%20to%20schedule%20a%20consultation%20with%20SP%20Builders"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0d2828] hover:bg-[#153D3D] text-[#EDE5DA] border border-[#EDE5DA]/20 font-sans-body font-semibold text-[11px] uppercase tracking-[0.15em] px-7 py-4 rounded-full transition-all duration-300 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 text-[#62AA9E]" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </section>
  );
}
