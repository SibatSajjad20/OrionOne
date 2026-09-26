"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";

interface AboutHeroProps {
  onOpenInquiry?: () => void;
}

export default function AboutHero({ onOpenInquiry }: AboutHeroProps) {
  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-32 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto overflow-hidden">
      {/* Subtle ambient lighting vignette */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] bg-[#62AA9E]/6 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true" 
      />

      {/* Massive Editorial Display Canopy */}
      <div className="pb-12 sm:pb-20">
        <h1 className="font-serif-heading text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] font-light text-[#EDE5DA] tracking-tight leading-[0.98] uppercase">
          Experience <span className="text-[#EDE5DA]/40 font-normal">Shaped Us</span> <br />
          <span className="italic font-normal text-sand-gradient normal-case">Execution</span> Defines Us
        </h1>
      </div>

      {/* Asymmetric Architectural Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-[#EDE5DA]/15 pt-12 sm:pt-16">
        {/* Left Column: Monograph Narrative & Pedigree Ledger */}
        <div className="lg:col-span-7 space-y-12">
          {/* Lead Narrative */}
          <div className="space-y-6 text-[#EDE5DA]/85 font-sans-body text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            <p>
              Orion One is a signature lakefront development conceived by <span className="text-[#EDE5DA] font-medium">SP Builders</span>, a multidisciplinary firm specializing in construction, structural consultancy, and landmark real estate.
            </p>
            <p className="text-[#C9BFB1] text-sm sm:text-base">
              With comprehensive experience across the complete project lifecycle, SP Builders unites structural honesty, rigorous masterplanning, and a lasting commitment to shaping environments engineered for permanence.
            </p>
          </div>

          {/* Architectural Pedigree Ledger */}
          <div className="border-t border-[#EDE5DA]/15 divide-y divide-[#EDE5DA]/10">
            <div className="py-5 grid grid-cols-12 gap-4 items-baseline">
              <span className="col-span-2 sm:col-span-1 font-mono text-[11px] text-[#62AA9E] font-medium">
                01
              </span>
              <div className="col-span-10 sm:col-span-4">
                <h2 className="font-sans-body text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#EDE5DA]">
                  Engineering Lifecycle
                </h2>
              </div>
              <p className="col-span-12 sm:col-span-7 font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed">
                From subterranean civil works to high rise structural envelope and luxury interior delivery.
              </p>
            </div>

            <div className="py-5 grid grid-cols-12 gap-4 items-baseline">
              <span className="col-span-2 sm:col-span-1 font-mono text-[11px] text-[#62AA9E] font-medium">
                02
              </span>
              <div className="col-span-10 sm:col-span-4">
                <h2 className="font-sans-body text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#EDE5DA]">
                  Masterplanning Foresight
                </h2>
              </div>
              <p className="col-span-12 sm:col-span-7 font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed">
                Precise urban integration balancing privacy, pedestrian promenade flow, and open horizons.
              </p>
            </div>

            <div className="py-5 grid grid-cols-12 gap-4 items-baseline">
              <span className="col-span-2 sm:col-span-1 font-mono text-[11px] text-[#62AA9E] font-medium">
                03
              </span>
              <div className="col-span-10 sm:col-span-4">
                <h2 className="font-sans-body text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#EDE5DA]">
                  Shoreline Stewardship
                </h2>
              </div>
              <p className="col-span-12 sm:col-span-7 font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed">
                A dedication to architectural quality on the most coveted water edge in Islamabad.
              </p>
            </div>
          </div>

          {/* Understated Editorial Anchor */}
          <div className="pt-2 flex items-center gap-6">
            <a
              href="#philosophy"
              className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#EDE5DA] hover:text-[#62AA9E] transition-colors"
            >
              <span>Explore The Design Philosophy</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#62AA9E] transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Pure Borderless Architectural Photography */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#0d2828]">
            <Image
              src="/images/about/sp-builders-facade.png"
              alt="SP Builders Architectural Signage and Headquarters"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-all duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
