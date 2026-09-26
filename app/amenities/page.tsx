"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import AmenitiesHeroShowcase from "@/components/amenities/AmenitiesHeroShowcase";
import AmenitiesIndex from "@/components/amenities/AmenitiesIndex";
import AmenitiesCtaBanner from "@/components/amenities/AmenitiesCtaBanner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AmenitiesPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    // Refresh GSAP ScrollTrigger coordinates after mount to synchronize with smooth scroll
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-hidden selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Universal Fixed Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Amenities Architectural Journey */}
      <main className="relative">
        {/* Sections 01 & 02: Editorial Hero -> Bottom-Up Transition (Signature Environments) -> Full-Screen Tabs */}
        <AmenitiesHeroShowcase onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 05: Amenities At A Glance — Minimalist Architectural Ledger Table */}
        <AmenitiesIndex />

        {/* Section 06: Closing Destination Invitation CTA */}
        <AmenitiesCtaBanner onOpenInquiry={() => setIsInquiryOpen(true)} />
      </main>

      {/* Grounded Dark Moss Footer */}
      <Footer />

      {/* Slide-over Private Tour & Concierge Drawer */}
      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
