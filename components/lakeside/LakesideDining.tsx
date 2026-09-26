"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LakesideDining() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    const text = textRef.current;
    if (!section || !visual || !text) return;

    const ctx = gsap.context(() => {
      // Parallax float on the dining visual
      gsap.fromTo(
        visual,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visual,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Text stagger entrance
      gsap.fromTo(
        text,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="Dining by the Lake"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/3 w-[650px] h-[650px] bg-[#62AA9E]/5 rounded-full blur-[200px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase - Pure Clean Architectural Photography */}
          <div ref={visualRef} className="lg:col-span-7 order-2 lg:order-1 will-change-transform">
            <div className="relative rounded-2xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-2xl group">
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="/images/lakeside/dining-terrace.jpg"
                  alt="Waterfront Dining Terraces and Shoreline Restaurants at Orion One"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center scale-100 transition-transform duration-[3000ms] group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div ref={textRef} className="lg:col-span-5 order-1 lg:order-2 space-y-6 will-change-transform">

            <h2 className="font-serif-heading text-4xl sm:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
              Dining by the <br />
              <span className="italic font-normal text-sand-gradient normal-case">
                Lake
              </span>
            </h2>

            <p className="font-serif-heading text-xl sm:text-2xl text-[#EDE5DA]/90 font-light leading-snug">
              The waterfront brings dining into the everyday Orion One experience
            </p>

            <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
              Premium cafés and signature restaurants line the shoreline promenade, creating spaces for casual morning coffee, lively business luncheons, and romantic evening dinners reflected across the dancing fountains.
            </p>

            <div className="pt-4">
              <Link
                href="/commercial"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-8 py-4 rounded-full transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>Explore Commercial Opportunities</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
