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

// Era-Residence Inspired Split-Merge-Zoom Polygon Generator
function computeSplitMergePolygons(
  widthPercent: number,
  heightPercent: number,
  staggerY: number,
  alignT: number,
  mergeT: number,
  targetCenterY: number
) {
  const halfW = widthPercent / 2;
  const leftX_inner = 100 - (halfW / 50) * 100;
  const rightX_outer = (halfW / 50) * 100;

  const initialGap = 1.0;
  const curGap = (1 - mergeT) * initialGap;

  const leftRightEdge = 100 - curGap;
  const rightLeftEdge = curGap;

  const halfH = heightPercent / 2;

  const curStagger = (1 - alignT) * staggerY;
  const leftTop = targetCenterY + curStagger - halfH;
  const leftBot = targetCenterY + curStagger + halfH;
  const rightTop = targetCenterY - curStagger - halfH;
  const rightBot = targetCenterY - curStagger + halfH;

  const polyL = `polygon(0% 0%, 0% 100%, ${leftX_inner.toFixed(2)}% 100%, ${leftX_inner.toFixed(2)}% ${leftTop.toFixed(2)}%, ${leftRightEdge.toFixed(2)}% ${leftTop.toFixed(2)}%, ${leftRightEdge.toFixed(2)}% ${leftBot.toFixed(2)}%, ${leftX_inner.toFixed(2)}% ${leftBot.toFixed(2)}%, 0% 100%, 100% 100%, 100% 0%)`;
  const polyR = `polygon(0% 0%, 0% 100%, ${rightLeftEdge.toFixed(2)}% 100%, ${rightLeftEdge.toFixed(2)}% ${rightTop.toFixed(2)}%, ${rightX_outer.toFixed(2)}% ${rightTop.toFixed(2)}%, ${rightX_outer.toFixed(2)}% ${rightBot.toFixed(2)}%, ${rightLeftEdge.toFixed(2)}% ${rightBot.toFixed(2)}%, ${rightLeftEdge.toFixed(2)}% 100%, 100% 100%, 100% 0%)`;

  return { polyL, polyR, leftTop, leftBot, rightTop, rightBot, curGap, halfW };
}

interface OrionOneMasterplanProps {
  onOpenInquiry?: () => void;
}

export default function OrionOneMasterplan({ onOpenInquiry }: OrionOneMasterplanProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const maskContainerRef = useRef<HTMLDivElement>(null);
  const maskLeftRef = useRef<HTMLDivElement>(null);
  const maskRightRef = useRef<HTMLDivElement>(null);
  const initialHeaderRef = useRef<HTMLDivElement>(null);
  const grandCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    if (!el || !pinContainer) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const applySplitMerge = (p: number) => {
          const isMobile = window.innerWidth < 768;

          const widthPercent = isMobile ? 86 : 56;
          const heightPercent = isMobile ? 40 : 44;
          const staggerY = isMobile ? 6 : 8;

          const rawAlignT = Math.max(0, Math.min(1, p / 0.38));
          const alignT = rawAlignT * rawAlignT * (3 - 2 * rawAlignT);

          const rawMergeT = Math.max(0, Math.min(1, (p - 0.38) / 0.20));
          const mergeT = rawMergeT * rawMergeT * (3 - 2 * rawMergeT);

          const rawZoomT = Math.max(0, Math.min(1, (p - 0.58) / 0.34));
          const zoomT = rawZoomT * rawZoomT * (3 - 2 * rawZoomT);

          const initialCenterY = isMobile ? 60 : 62;
          const currentCenterY = initialCenterY - zoomT * (initialCenterY - 50);

          const { polyL, polyR } = computeSplitMergePolygons(
            widthPercent,
            heightPercent,
            staggerY,
            alignT,
            mergeT,
            currentCenterY
          );

          if (maskLeftRef.current) maskLeftRef.current.style.clipPath = polyL;
          if (maskRightRef.current) maskRightRef.current.style.clipPath = polyR;

          const maxScale = isMobile ? 2.6 : 2.45;
          const maskScale = 1.0 + zoomT * (maxScale - 1.0);
          if (maskContainerRef.current) {
            maskContainerRef.current.style.transform = `scale(${maskScale.toFixed(4)})`;
          }

          const initHeaderOpacity = Math.max(0, 1 - rawZoomT * 2.5);
          if (initialHeaderRef.current) {
            initialHeaderRef.current.style.opacity = `${initHeaderOpacity.toFixed(3)}`;
          }

          const ctaOpacity = Math.max(0, Math.min(1, (rawZoomT - 0.12) / 0.55));
          const ctaY = (1 - ctaOpacity) * 28;
          const ctaScale = 0.92 + ctaOpacity * 0.08;
          if (grandCtaRef.current) {
            grandCtaRef.current.style.opacity = `${ctaOpacity.toFixed(3)}`;
            grandCtaRef.current.style.transform = `translate3d(0, ${ctaY.toFixed(1)}px, 0) scale(${ctaScale.toFixed(3)})`;
            grandCtaRef.current.style.pointerEvents = ctaOpacity > 0.5 ? "auto" : "none";
          }
        };

        applySplitMerge(0);

        const trigger = ScrollTrigger.create({
          trigger: pinContainer,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => applySplitMerge(self.progress),
        });

        if (trigger.progress > 0) {
          applySplitMerge(trigger.progress);
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-[#0d2828] text-[#EDE5DA]">
      {/* ============================================================= */}
      {/* CINEMATIC PINNED SECTION: SPLIT -> MERGE -> FULL-BLEED CTA */}
      {/* ============================================================= */}
      <section
        ref={pinContainerRef}
        className="relative w-full h-auto min-h-[100dvh] md:h-[100dvh] overflow-hidden bg-[#0d2828] select-none"
      >
        {/* Layer 1: Full-Bleed Photograph with subtle atmospheric gradient */}
        <div className="absolute inset-0 w-full h-full min-h-[100dvh] overflow-hidden select-none">
          <Image
            src="/images/commercial/lakeview-aerial.jpg"
            alt="The Lakefront at the Heart of DHA Phase III"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center select-none"
          />
          {/* Subtle cinematic gradient to ensure crisp editorial text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2828]/85 via-[#0d2828]/25 to-[#0d2828]/70 pointer-events-none" />
        </div>

        {/* Layer 2: Mask — desktop pin only; hidden on mobile so image stays full-bleed */}
        <div
          ref={maskContainerRef}
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none will-change-transform origin-center"
          style={{ transform: "scale(1)" }}
        >
          {/* Left Mask: Covers left half of screen with dynamic clip-path cutout */}
          <div
            ref={maskLeftRef}
            className="absolute inset-[-2px] right-[50%] bg-[#0d2828] will-change-[clip-path]"
          />
          {/* Right Mask: Covers right half of screen with dynamic clip-path cutout */}
          <div
            ref={maskRightRef}
            className="absolute inset-[-2px] left-[50%] bg-[#0d2828] will-change-[clip-path]"
          />
        </div>

        {/* Layer 3: Initial Clean Heading (Comfortably placed above cards, zero clutter) */}
        <div
          ref={initialHeaderRef}
          className="relative md:absolute top-0 md:top-28 left-0 right-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 md:pt-0 pointer-events-none transition-opacity duration-150"
        >
          <h2 className="font-serif-heading text-2xl sm:text-4xl lg:text-5xl font-light text-[#EDE5DA] uppercase max-w-5xl">
            The Lakefront at the Heart of{" "}
            <span className="italic font-normal text-sand-gradient normal-case">
              DHA Phase III
            </span>
          </h2>
        </div>

        {/* Layer 4: Grand CTA — always visible on mobile; scrubbed in on md+ */}
        <div
          ref={grandCtaRef}
          className="relative md:absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 z-20 pointer-events-auto md:pointer-events-none opacity-100 md:opacity-0 will-change-transform space-y-6 sm:space-y-8 py-12 md:py-0"
        >
          <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] leading-[1.08] uppercase max-w-5xl mx-auto">
            More Than An Address <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              A Destination
            </span>
          </h2>

          <p className="font-sans-body text-xs sm:text-base lg:text-lg text-[#EDE5DA]/90 font-light max-w-2xl mx-auto leading-relaxed">
            Discover the architecture, explore the waterfront, and experience the
            vision behind Orion One.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto">
            <Link
              href="/lakeside"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-[#62AA9E]/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Residences</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/commercial"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] hover:border-[#62AA9E]/50 border border-[#EDE5DA]/20 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-md cursor-pointer hover:-translate-y-0.5"
            >
              <span>Explore Commercial</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
            </Link>

            {onOpenInquiry && (
              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] hover:border-[#62AA9E]/50 border border-[#EDE5DA]/20 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <span>Book a Private Tour</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
