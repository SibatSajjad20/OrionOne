"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { scrollToElement } from "@/lib/scrollTo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LakesideHeroProps {
  onOpenInquiry?: () => void;
}

export default function LakesideHero({ onOpenInquiry }: LakesideHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
  }, [videoLoaded]);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaWrapRef.current;
    const content = contentRef.current;

    if (!section || !media || !content) return;

    const ctx = gsap.context(() => {
      gsap.to(media, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
        },
      });

      gsap.to(content, {
        yPercent: -12,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("heart-of-orion");
    if (element) {
      scrollToElement(element);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-end overflow-hidden bg-[#153D3D]"
      aria-label="Lakeside Experience Hero"
    >
      {/* 1. Cinematic Background Video with Parallax Wrapper */}
      <div
        ref={mediaWrapRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
      >
        {/* Poster / Fallback Image — fades once video is ready */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/images/lakeside/hero-lake.jpg"
            alt="Orion One Lakefront Living and Promenade Horizon"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
        </div>

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/scene_3.mp4" type="video/mp4" />
        </video>

        {/* Architectural Vignette Gradients */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#153D3D] via-[#153D3D]/50 to-black/30 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-radial-gradient from-transparent via-[#153D3D]/30 to-[#153D3D]/80 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Hero Editorial Narrative Block */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-16 pb-16 sm:pb-24 pt-36 will-change-transform"
      >
        <div className="max-w-3xl space-y-6">
          {/* Display Headline */}
          <h1 className="font-serif-heading text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-[#EDE5DA] tracking-tight leading-[1.05]">
            Life, By the{" "}
            <span className="italic font-normal text-sand-gradient block sm:inline">
              Water
            </span>
          </h1>

          {/* Subtitle / Lead */}
          <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#EDE5DA]/85 font-light leading-relaxed max-w-2xl">
            A waterfront experience shaped around movement, dining, relaxation, and connection.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <button
              onClick={scrollToExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span>Explore the Lakeside</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            {onOpenInquiry && (
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] border border-[#EDE5DA]/15 hover:border-[#62AA9E]/40 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Book a Private Tour</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#62AA9E]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
