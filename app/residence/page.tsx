"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import OrionTowerExplorer from "@/components/residence/OrionTowerExplorer";
import ResidenceHero from "@/components/residence/ResidenceHero";
import ResidencePerspective from "@/components/residence/ResidencePerspective";
import ResidencePhilosophy from "@/components/residence/ResidencePhilosophy";
import ResidenceLifestyle from "@/components/residence/ResidenceLifestyle";
import ResidenceWaterfront from "@/components/residence/ResidenceWaterfront";
import ResidenceCtaBanner from "@/components/residence/ResidenceCtaBanner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ResidencePage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#153D3D]">
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      <main className="relative">
        {/* Interactive 14-Floor Orion One Building Explorer */}
        <OrionTowerExplorer onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Residence Typologies & Floor Plans Catalog */}
        <ResidenceHero onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Editorial Perspective & Sunlit Living Room Frame Reveal */}
        <ResidencePerspective />

        {/* Design Philosophy 4-Pillar Architectural Split */}
        <ResidencePhilosophy />

        {/* Life Beyond Your Door (Resort Amenities & Promenade) */}
        <ResidenceLifestyle />

        {/* Lakefront Living (Panoramic Shoreline Frame) */}
        <ResidenceWaterfront />

        {/* Closing Concierge Banner */}
        <ResidenceCtaBanner onOpenInquiry={() => setIsInquiryOpen(true)} />
      </main>

      <Footer />

      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
