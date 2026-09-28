"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ResidenceWaterfront() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = imageFrameRef.current;
    const heading = headingRef.current;
    if (!section || !frame || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        frame,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frame,
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
      className="relative w-full py-24 sm:py-36 bg-[#0d2828] text-[#EDE5DA] overflow-hidden border-t border-[#EDE5DA]/10"
      aria-label="Every Day Comes with a View"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headingRef} className="max-w-4xl mx-auto text-center mb-12 sm:mb-20 space-y-4">
          <h2 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-[1.08] uppercase">
            Every Day Comes With a <br />
            <span className="italic font-normal uppercase text-sand-gradient normal-case">
              View
            </span>
          </h2>

          <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light max-w-2xl mx-auto leading-relaxed">
            From morning mist rising over the water to illuminated dancing fountains at dusk, the lakefront setting transforms everyday living into an unhurried, contemplative retreat.
          </p>
        </div>

        {/* Panoramic Waterfront Frame */}
        <div
          ref={imageFrameRef}
          className="relative w-full aspect-[16/10] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#EDE5DA]/15 bg-[#153D3D]"
        >
          <Image
            src="/images/residence/pic-1.jpg"
            alt="Every day comes with a view - Orion One lakefront residence"
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            priority
            className="object-cover object-center filter brightness-[1.02]"
          />
        </div>
      </div>
    </section>
  );
}
