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

export default function LakesideDestination() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const visual = visualRef.current;
    if (!section || !text || !visual) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        visual,
        { opacity: 0, x: 35, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="A Destination Within DHA Phase III"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 left-1/4 w-[700px] h-[700px] bg-[#62AA9E]/4 rounded-full blur-[240px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Copy */}
          <div ref={textRef} className="lg:col-span-6 space-y-6 will-change-transform">
            <h2 className="font-serif-heading text-4xl sm:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
              A Destination Within <br />
              <span className="italic font-normal text-sand-gradient normal-case">
                DHA Phase III
              </span>
            </h2>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#EDE5DA]/90 font-light leading-relaxed">
              The lakeside experience sits within Orion One&apos;s wider mixed-use environment, bringing residences, commercial spaces, dining, wellness, and community together around the waterfront.
            </p>

            <div className="pt-4">
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-8 py-4 rounded-full transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>Discover Orion One</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Frame - Pure Clean Photography */}
          <div ref={visualRef} className="lg:col-span-6 will-change-transform">
            <div className="relative rounded-2xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-2xl group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="/images/lakeside/masterplan-context.jpg"
                  alt="Orion One Lakeview Masterplan Context in DHA Phase III"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center scale-100 transition-transform duration-[3000ms] group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
