"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Footer from "@/components/Footer";
import InquiryDrawer from "@/components/InquiryDrawer";

import CinematicCanvas from "@/components/CinematicCanvas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    // Refresh GSAP ScrollTrigger calculations after initial layout mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-hidden selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Unified 7-Stage Cinematic Canvas Scrubber */}
      <main className="relative min-h-screen min-h-[100dvh] bg-[#153D3D]">
        <CinematicCanvas onOpenInquiry={() => setIsInquiryOpen(true)} />
      </main>

      {/* Grounded Brand Guidelines Footer */}
      <Footer />

      {/* Private Tour / Concierge Slide-over Drawer */}
      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
