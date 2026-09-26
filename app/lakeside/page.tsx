"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";
import LakesideHero from "@/components/lakeside/LakesideHero";
import LakesideTicker from "@/components/lakeside/LakesideTicker";
import LakesideHeart from "@/components/lakeside/LakesideHeart";
import LakesidePromenade from "@/components/lakeside/LakesidePromenade";
import LakesideDailyRhythm from "@/components/lakeside/LakesideDailyRhythm";
import LakesideDining from "@/components/lakeside/LakesideDining";
import LakesideWellness from "@/components/lakeside/LakesideWellness";
import LakesideDestination from "@/components/lakeside/LakesideDestination";
import LakesideCtaBanner from "@/components/lakeside/LakesideCtaBanner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LakesidePage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    // Refresh GSAP ScrollTrigger coordinates after mount to synchronize perfectly with Lenis smooth scroll
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-hidden selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Universal Fixed Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Lakeside Storytelling & Scroll Journey */}
      <main className="relative">
        {/* Chapter 01: Hero with Cinematic Waterfront Video & Parallax Depth */}
        <LakesideHero onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Chapter 02: Unhurried Moving Lakeside Strip */}
        <LakesideTicker />

        {/* Chapter 03: The Lake at the Heart of Orion One (Shoreline & Terrace Horizons) */}
        <LakesideHeart />

        {/* Chapter 04: Flagship Scroll Experience 01 — Pinned Horizontal Promenade Walk */}
        <LakesidePromenade />

        {/* Chapter 05: Flagship Scroll Experience 02 — Pinned Day-to-Night Ambient Scrubber */}
        <LakesideDailyRhythm />

        {/* Chapter 06: Waterfront Dining Terraces & Culinary Pavilions */}
        <LakesideDining />

        {/* Chapter 07: Wellness by the Water (Infinity Pool & Fitness Club with Staggered Parallax) */}
        <LakesideWellness onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Chapter 08: Sector F Masterplan Destination Context */}
        <LakesideDestination />

        {/* Chapter 09: Final Invitation & Private Tour Concierge CTA */}
        <LakesideCtaBanner onOpenInquiry={() => setIsInquiryOpen(true)} />
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
