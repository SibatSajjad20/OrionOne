"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import LocationHero from "@/components/location/LocationHero";
import LocationAddressConnectivity from "@/components/location/LocationAddressConnectivity";
import LocationConnects from "@/components/location/LocationConnects";
import LocationCtaBanner from "@/components/location/LocationCtaBanner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LocationPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    // Refresh GSAP ScrollTrigger coordinates after mount to synchronize with smooth scroll
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0F3D3C] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#0F3D3C]">
      {/* Universal Fixed Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Location Architectural Narrative */}
      <main className="relative">
        {/* Section 01: Asymmetric Cartographic Hero with Horizon Beacon Viewport */}
        <LocationHero onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Sections 02, 03 & 04: Lakefront Address Split -> Connected to DHA -> Everything Around Us Continuous Master Visual Scroll */}
        <LocationAddressConnectivity />

        {/* Section 06: Location That Connects (4-Part Architectural Blueprint Matrix) */}
        <LocationConnects />

        {/* Section 07: Closing Destination Invitation */}
        <LocationCtaBanner onOpenInquiry={() => setIsInquiryOpen(true)} />
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
