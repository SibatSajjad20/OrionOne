"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CinematicCanvas = dynamic(() => import("@/components/CinematicCanvas"), {
  ssr: false,
  loading: () => (
    <div className="relative min-h-screen min-h-[100dvh] bg-[#153D3D] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#EDE5DA]/20 border-t-[#62AA9E] animate-spin" />
    </div>
  ),
});

const InquiryDrawer = dynamic(() => import("@/components/InquiryDrawer"), {
  ssr: false,
});

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
    <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-clip selection:bg-[#62AA9E] selection:text-[#153D3D]">
      {/* Universal Fixed Header */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

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
