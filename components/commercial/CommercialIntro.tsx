"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CommercialIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;

    if (!section || !leftCol || !rightCol) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftCol,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: leftCol,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        rightCol,
        { opacity: 0, scale: 0.96, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: rightCol,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden"
    >
      {/* Atmosphere vignette */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] bg-[#62AA9E]/4 rounded-full blur-[180px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Heading and Editorial Narrative */}
          <div ref={leftColRef} className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
              A Place For <br />
              <span className="italic font-normal text-sand-gradient normal-case">
                Business to Belong
              </span>
            </h2>

            <div className="space-y-5 text-[#EDE5DA]/85 font-sans-body text-base sm:text-lg font-light leading-relaxed">
              <p>
                Orion One&apos;s commercial component is designed for businesses that want to become part of a curated mixed-use destination.
              </p>
              <p className="text-[#C9BFB1] text-sm sm:text-base">
                From dining and retail to offices and lifestyle concepts, the commercial offering creates space for businesses that complement the character of Orion One.
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame */}
          <div ref={rightColRef} className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#0d2828] border border-[#EDE5DA]/10 shadow-2xl">
              <Image
                src="/images/commercial/retail-arcade.jpg"
                alt="Orion One Commercial Promenade"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
