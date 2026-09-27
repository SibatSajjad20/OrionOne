"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ContactHeroProps {
  onOpenInquiry?: () => void;
}

export default function ContactHero({ onOpenInquiry: _onOpenInquiry }: ContactHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const ledger = ledgerRef.current;

    if (!container || !headline || !subtitle || !ledger) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headline,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, clearProps: "all" }
      )
        .fromTo(
          subtitle,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.0, clearProps: "all" },
          "-=0.7"
        );

      const items = ledger.querySelectorAll(".ledger-item");
      if (items.length > 0) {
        tl.fromTo(
          items,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, clearProps: "all" },
          "-=0.7"
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-24 sm:pt-36 lg:pt-40 pb-16 sm:pb-28 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* Subtle ambient lighting vignette */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] bg-[#62AA9E]/6 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Massive Editorial Display Canopy matching About & Home pages */}
      <div className="pb-12 sm:pb-20 max-w-5xl">
        <h1
          ref={headlineRef}
          className="font-serif-heading text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] font-light text-[#EDE5DA] tracking-tight leading-[0.98] uppercase"
        >
          Every Message <br />
          <span className="italic font-normal text-sand-gradient normal-case">Starts Something Timeless</span>
        </h1>
        <p
          ref={subtitleRef}
          className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light leading-relaxed max-w-2xl pt-6"
        >
          Whether you are inquiring about private lakefront residences, premier commercial promenade spaces, or arranging an executive tour at our District 101 Show Suite, our leadership and architectural advisors are at your service.
        </p>
      </div>

      {/* Architectural Ledger / Quick Orientation Bar */}
      <div
        ref={ledgerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 border-t border-[#EDE5DA]/15 pt-8 sm:pt-10"
      >
        <div className="ledger-item space-y-1.5">
          <span className="font-sans-body text-[10px] font-semibold text-[#62AA9E] tracking-[0.25em] uppercase block">
            Headquarters & Suite
          </span>
          <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA] font-light leading-relaxed">
            4th Floor, District 101, Business District Commercial
          </p>
        </div>

        <div className="ledger-item space-y-1.5">
          <span className="font-sans-body text-[10px] font-semibold text-[#62AA9E] tracking-[0.25em] uppercase block">
            Desk Hours
          </span>
          <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA] font-light leading-relaxed">
            Monday – Saturday · 10:00 AM – 6:00 PM
          </p>
        </div>

        <div className="ledger-item space-y-1.5">
          <span className="font-sans-body text-[10px] font-semibold text-[#62AA9E] tracking-[0.25em] uppercase block">
            Direct Desk
          </span>
          <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA] font-light leading-relaxed">
            0333 6660722 · +92 300 9079 164
          </p>
          <p className="font-sans-body text-xs text-[#C9BFB1]/70 font-light">
            spbuilderspk@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
