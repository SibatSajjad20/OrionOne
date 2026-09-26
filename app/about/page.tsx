"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import AboutHero from "@/components/about/AboutHero";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutEcosystem from "@/components/about/AboutEcosystem";
import AboutStewardship from "@/components/about/AboutStewardship";

export default function AboutPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Fixed Glass Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative">
        {/* Section 01: Hero & Developer Heritage */}
        <AboutHero onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 02: Core Philosophy Spread */}
        <AboutPhilosophy />

        {/* Section 03: The 5 Integrated Realms Masterplan */}
        <AboutEcosystem />

        {/* Section 04: Stewardship & Executive Show Suite CTA */}
        <AboutStewardship onOpenInquiry={() => setIsInquiryOpen(true)} />
      </main>

      {/* Grounded Dark Moss Footer */}
      <Footer />

      {/* Interactive Concierge / Private Tour Drawer */}
      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
