"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import CommercialHero from "@/components/commercial/CommercialHero";
import CommercialTaglineTicker from "@/components/commercial/CommercialTaglineTicker";
import CommercialOpportunities from "@/components/commercial/CommercialOpportunities";
import CommercialAdvantage from "@/components/commercial/CommercialAdvantage";
import CommercialEcosystem from "@/components/commercial/CommercialEcosystem";
import CommercialSpaces from "@/components/commercial/CommercialSpaces";
import CommercialCtaBanner from "@/components/commercial/CommercialCtaBanner";

export default function CommercialPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Universal Fixed Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Commercial Architectural Journey */}
      <main className="relative">
        {/* Section 01: Hero with Cinematic Slideshow */}
        <CommercialHero onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 02: Moving Commercial Tagline Strip */}
        <CommercialTaglineTicker />

        {/* Section 03: Full-Screen Scroll Stacking Opportunities Showcase */}
        <CommercialOpportunities />

        {/* Section 04: The Commercial Advantage Quad */}
        <CommercialAdvantage />

        {/* Section 05: Merged Surrounding Ecosystem & City Connectivity */}
        <CommercialEcosystem />

        {/* Section 06: Commercial Spaces & Approved Ground-Floor Plan */}
        <CommercialSpaces onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 07: Destination Closing Invitation */}
        <CommercialCtaBanner onOpenInquiry={() => setIsInquiryOpen(true)} />
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
