"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";

export default function EventsPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#153D3D]">
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      <main className="relative min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-36 pb-24 text-center">
        {/* Ambient background glow vignette */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#62AA9E]/10 rounded-full blur-[160px] pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] sm:text-[11px] font-sans-body uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#62AA9E] font-semibold block">
            Orion One
          </span>
          <h1 className="font-serif-heading font-luxia-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08]">
            Events
          </h1>
          <p className="font-sans-body text-sm sm:text-base text-[#EDE5DA]/80 font-light leading-relaxed max-w-xl mx-auto pt-2">
            Private showcases, cultural gatherings, and waterfront exhibitions.
          </p>
        </div>
      </main>

      <Footer />

      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
