"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Dynamic import of client-only canvas component to optimize initial JS bundle size
const CinematicCanvas = dynamic(() => import("@/components/CinematicCanvas"), {
  ssr: false,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Refresh GSAP ScrollTrigger calculations after initial layout mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#09191a] text-[#FAFAFA]">
      {/* Unified Single-Sequence Cinematic Canvas Scrubber */}
      <CinematicCanvas />
    </main>
  );
}
