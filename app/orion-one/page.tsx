"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import OrionOneHeroOverview from "@/components/orion-one/OrionOneHeroOverview";
import OrionOneArchitecture from "@/components/orion-one/OrionOneArchitecture";
import OrionOneWaterfrontDestination from "@/components/orion-one/OrionOneWaterfrontDestination";
import OrionOneMasterplan from "@/components/orion-one/OrionOneMasterplan";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OrionOnePage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    // Refresh GSAP ScrollTrigger coordinates after mount to synchronize with smooth scroll
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Universal Fixed Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Orion One Narrative Journey */}
      <main className="relative">
        {/* Sections 01 & 02: Hero -> Split-Door Curtain Transition ("A Destination") -> Overview & 4 Pillars Deck */}
        <OrionOneHeroOverview onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 03: Architecture Transition ("Flows Like Water") -> Aperture Scale Reveal -> 4 Facets & Interactive Elevation */}
        <OrionOneArchitecture onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Sections 04 & 06: Destination Transition ("Life, By The Water") -> Horizontal Waterfront Slide Deck -> Connected Matrix */}
        <OrionOneWaterfrontDestination />

        {/* Section 05: Cinematic Lakefront Split -> Merge -> Full-Bleed Destination CTA */}
        <OrionOneMasterplan onOpenInquiry={() => setIsInquiryOpen(true)} />
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
