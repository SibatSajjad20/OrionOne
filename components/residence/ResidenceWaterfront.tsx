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
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const getTargetTransform = () => {
        const el = imageFrameRef.current;
        if (!el) return { targetScale: 2.0, targetY: 0 };

        const currentScale = (gsap.getProperty(el, "scale") as number) || 1;
        const currentY = (gsap.getProperty(el, "y") as number) || 0;

        const rect = el.getBoundingClientRect();
        const unscaledWidth = rect.width / currentScale;
        const unscaledHeight = rect.height / currentScale;
        const unscaledTop = rect.top - currentY;
        const unscaledCenterY = unscaledTop + unscaledHeight / 2;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const scaleX = vw / (unscaledWidth || 1);
        const scaleY = vh / (unscaledHeight || 1);
        const targetScale = Math.max(scaleX, scaleY) * 1.06;
        const targetY = vh / 2 - unscaledCenterY;

        return { targetScale, targetY };
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        imageFrameRef.current,
        {
          scale: () => getTargetTransform().targetScale,
          y: () => getTargetTransform().targetY,
          borderRadius: 0,
          borderWidth: 0,
          borderColor: "transparent",
          boxShadow: "none",
          ease: "power2.inOut",
          duration: 0.75,
        },
        0
      );

      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          ease: "power1.out",
          duration: 0.35,
        },
        0.45
      );

      tl.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.35,
        },
        0.48
      );

      tl.to({}, { duration: 0.25 });
    
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] bg-[#0d2828] text-[#EDE5DA] overflow-hidden flex items-center justify-center border-t border-[#EDE5DA]/10"
    >
      {/* Top Scrim Gradient Overlay for Text Readability */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-black/60 via-black/20 to-transparent opacity-0 md:opacity-0"
      />

      {/* Top Left Corner Heading — visible on mobile; transitions in on md+ pin */}
      <div
        ref={headingRef}
        className="absolute top-28 lg:top-32 left-4 lg:left-20 pr-4 z-20 pointer-events-none max-w-2xl opacity-0"
      >
        <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-[1.12] uppercase">
          EVERY DAY COMES
          <br />
          <span className="text-[#62AA9E]">WITH A VIEW</span>
        </h2>
      </div>

      {/* Centered Image Showcase Frame — Zooms on scroll */}
      <div
        ref={imageFrameRef}
        className="relative w-[88vw] sm:w-[80vw] max-w-5xl aspect-[16/10] sm:aspect-[21/10] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-[#EDE5DA]/15 bg-[#153D3D] will-change-transform z-0 origin-center order-2 md:order-none"
      >
        <Image
          src="/images/residence/pic-1.jpg"
          alt="Every day comes with a view - Orion One lakefront residence"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center filter brightness-[1.03]"
        />
      </div>
    </section>
  );
}
