"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import CommercialHero from "@/components/commercial/CommercialHero";
import CommercialIntro from "@/components/commercial/CommercialIntro";
import CommercialOpportunities from "@/components/commercial/CommercialOpportunities";
import CommercialAdvantage from "@/components/commercial/CommercialAdvantage";
import CommercialEcosystem from "@/components/commercial/CommercialEcosystem";
import CommercialConnectivity from "@/components/commercial/CommercialConnectivity";
import CommercialSpaces from "@/components/commercial/CommercialSpaces";
import CommercialEcosystemFlow from "@/components/commercial/CommercialEcosystemFlow";
import CommercialInquirySection from "@/components/commercial/CommercialInquirySection";
import CommercialCtaBanner from "@/components/commercial/CommercialCtaBanner";

export default function CommercialPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-hidden selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Universal Fixed Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Commercial Architectural Journey */}
      <main className="relative">
        {/* Section 01: Hero Canopy */}
        <CommercialHero onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 02: The Vision & Commercial Intro */}
        <CommercialIntro />

        {/* Section 03: Curated Commercial Opportunities (Restaurants, Cafés, Retail, Offices, Lifestyle) */}
        <CommercialOpportunities onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 04: The Commercial Advantage (Visibility, Community, Levels, Waterfront Dining) */}
        <CommercialAdvantage />

        {/* Section 05: The Surrounding Ecosystem (DHA Club, Fountains, Cinema, Hotel, Parks, Dining, Amusements) */}
        <CommercialEcosystem />

        {/* Section 06: Connected To The City (Transit Arteries & Surrounding Nodes) */}
        <CommercialConnectivity />

        {/* Section 07: Commercial Spaces & Approved Ground-Floor Floor Plan */}
        <CommercialSpaces onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 08: Why This Ecosystem Matters (Orion One → Amenities → Roads → Ecosystem Flow) */}
        <CommercialEcosystemFlow />

        {/* Section 09: Dedicated Commercial Inquiry Salon */}
        <CommercialInquirySection />

        {/* Section 10: Final Destination CTA & Private Tour Invitation */}
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
