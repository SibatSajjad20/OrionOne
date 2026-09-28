"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ResidencePerspective() {
  const sectionRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const narrative = narrativeRef.current;
    const imageFrame = imageFrameRef.current;
    if (!section || !narrative || !imageFrame) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        narrative,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: narrative,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        imageFrame,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageFrame,
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
      className="relative w-full py-24 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-t border-[#EDE5DA]/10"
      aria-label="A Home with a Different Perspective"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 flex flex-col items-center justify-center">
        {/* Centered Heading in one line & Paragraph below */}
        <div ref={narrativeRef} className="w-full text-center mb-10 sm:mb-16">
          <h2 className="font-serif-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-tight uppercase max-w-5xl mx-auto">
            A Home with a<span className="italic font-normal text-sand-gradient normal-case uppercase"> Different Perspective</span>
          </h2>
          <p className="font-sans-body text-xs sm:text-base md:text-lg text-[#EDE5DA]/85 font-light leading-relaxed max-w-3xl mx-auto mt-4 sm:mt-6">
            Living at Orion One offers a lakeside home shaped by natural light and premium amenities. This tranquil destination seamlessly blends wellness, recreation, dining, and community into your daily life
          </p>
        </div>

        {/* Pure Architectural Showcase Frame */}
        <div
          ref={imageFrameRef}
          className="relative w-full aspect-[16/10] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#EDE5DA]/15 bg-[#0d2828]"
        >
          <Image
            src="/images/residence/pic-5.webp"
            alt="Sunlit double-height residence living room looking toward the terrace at Orion One"
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover object-center filter brightness-[1.02] contrast-[1.02]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
