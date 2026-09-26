"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Clock, ArrowUpRight, Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Artery {
  id: string;
  name: string;
  driveTime: string;
  corridor: string;
  description: string;
}

const ARTERIES: Artery[] = [
  {
    id: "dha-boulevards",
    name: "DHA Main Boulevards",
    driveTime: "Immediate Direct Access",
    corridor: "Internal Sector Network",
    description: "Multi-lane landscaped boulevards connecting effortlessly throughout DHA Phase III sectors and commercial avenues.",
  },
  {
    id: "gt-road",
    name: "GT Road (Grand Trunk Road)",
    driveTime: "3 Minutes Drive",
    corridor: "Intercity Commercial Highway",
    description: "Direct artery linking to central Rawalpindi business districts, Saddar, and major northern commercial corridors.",
  },
  {
    id: "ring-road",
    name: "Rawalpindi Ring Road",
    driveTime: "6 Minutes Drive",
    corridor: "Metropolitan High-Speed Bypass",
    description: "Rapid bypass corridor allowing residents to circumvent urban congestion and connect seamlessly across the region.",
  },
  {
    id: "expressway",
    name: "Islamabad Expressway",
    driveTime: "8 Minutes Drive",
    corridor: "Capital Signal-Free Route",
    description: "Direct, signal-free expressway leading straight into central Islamabad, the Blue Area, and diplomatic quarters.",
  },
  {
    id: "airport",
    name: "Islamabad International Airport",
    driveTime: "25 Minutes Drive",
    corridor: "Aviation Gateway Link",
    description: "Smooth, continuous highway connection providing unhurried access for domestic departures and international flights.",
  },
];

export default function LocationConnectivity() {
  const [activeId, setActiveId] = useState<string>("dha-boulevards");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  const selectedArtery = ARTERIES.find((a) => a.id === activeId) ?? ARTERIES[0];

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const matrix = matrixRef.current;
    if (!section || !header || !matrix) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        matrix,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: matrix,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="connectivity"
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="Connected to DHA"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 right-1/4 w-[750px] h-[750px] bg-[#62AA9E]/4 rounded-full blur-[240px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl space-y-4 will-change-transform">
          <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Connected to <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              DHA & Beyond
            </span>
          </h2>

          <p className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA]/90 font-light leading-snug">
            Easy Access · Everyday Convenience
          </p>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
            Orion One is connected to key routes serving DHA Phase III and the wider Islamabad–Rawalpindi region.
          </p>
        </div>

        {/* Bespoke Arterial Highway Schematic Component */}
        <div ref={matrixRef} className="rounded-3xl bg-[#0d2828] border border-[#EDE5DA]/15 p-6 sm:p-10 shadow-2xl space-y-8 will-change-transform">
          
          {/* Top Row: 5 Artery Route Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {ARTERIES.map((a, idx) => {
              const isSelected = activeId === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setActiveId(a.id)}
                  onMouseEnter={() => setActiveId(a.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-[130px] ${
                    isSelected
                      ? "bg-[#153D3D] border-[#62AA9E] shadow-lg shadow-[#62AA9E]/10"
                      : "bg-[#081a1a]/60 border-[#EDE5DA]/10 hover:border-[#62AA9E]/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#62AA9E]">0{idx + 1}</span>
                    <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-[#62AA9E]" : "text-[#808080]"}`} />
                  </div>
                  <div>
                    <h4 className={`font-serif-heading text-base leading-snug transition-colors ${
                      isSelected ? "text-[#EDE5DA]" : "text-[#EDE5DA]/80"
                    }`}>
                      {a.name}
                    </h4>
                    <span className="font-sans-body text-[11px] text-[#62AA9E] block pt-1 font-medium">
                      {a.driveTime}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Display: Active Highway Route Dynamic Spotlight */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#153D3D]/50 border border-[#EDE5DA]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#62AA9E]" />
                <span className="font-mono text-xs text-[#62AA9E] uppercase tracking-wider">
                  {selectedArtery.corridor}
                </span>
              </div>
              <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
                {selectedArtery.name}
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                {selectedArtery.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3 border-t md:border-t-0 md:border-l border-[#EDE5DA]/10 pt-4 md:pt-0 md:pl-8">
              <div>
                <span className="text-[10px] font-mono text-[#808080] uppercase tracking-wider block">Estimated Velocity</span>
                <span className="font-serif-heading text-xl text-[#EDE5DA]">{selectedArtery.driveTime}</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#62AA9E] text-[#0d2828] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
