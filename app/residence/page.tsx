"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
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

      {/* Main Residence Journey */}
      <main className="relative">
        {/* Section 01: Hero — Rotating Logo Badge + Gap + Monumental RESIDENCES Title & 04 + Filter Bar + Floor Plans Grid */}
        <ResidenceHero onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 02: Editorial Perspective & Sunlit Living Room Frame Reveal */}
        <ResidencePerspective />

        {/* Section 03: Design Philosophy Interactive 4-Pillar Architectural Split */}
        <ResidencePhilosophy />

        {/* Section 04: Life Beyond Your Door (Resort Amenities & Promenade) */}
        <ResidenceLifestyle />

        {/* Section 05: Lakefront Living (Panoramic Shoreline Frame) */}
        <ResidenceWaterfront />

        {/* Section 06: Closing Concierge Banner */}
        <ResidenceCtaBanner onOpenInquiry={() => setIsInquiryOpen(true)} />
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
