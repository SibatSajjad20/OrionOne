"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import OrionOneHeroOverview from "@/components/orion-one/OrionOneHeroOverview";
import OrionOneArchitecture from "@/components/orion-one/OrionOneArchitecture";
import OrionOneMasterplan from "@/components/orion-one/OrionOneMasterplan";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OrionOnePage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    // Refresh and sort GSAP ScrollTrigger coordinates after mount to synchronize pinned sections
    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 400);

    const handleLoad = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Universal Fixed Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Orion One Narrative Journey */}
      <main className="relative">
        {/* Hero Section: "Life, By The Water" Video Hero -> "A Destination" Transition -> 3 Destination Pillars (Residences, Commercial, Wellness) */}
        <OrionOneHeroOverview onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 02: Architecture ("Curated Perspectives" - 3 Facets & Interactive Elevation) */}
        <OrionOneArchitecture onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 03: Cinematic Lakefront Split -> Merge -> Full-Bleed Destination CTA */}
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
