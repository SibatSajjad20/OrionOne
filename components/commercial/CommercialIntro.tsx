"use client";

import Image from "next/image";
import { Building2, Compass, Sparkles } from "lucide-react";

export default function CommercialIntro() {
  return (
    <section className="relative py-24 sm:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden">
      {/* Subtle architectural atmosphere vignette */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] bg-[#62AA9E]/4 rounded-full blur-[180px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Vision Monograph */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.35em] text-[#62AA9E] mb-4">
                02 — The Vision
              </p>
              <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
                A Place For <br />
                <span className="italic font-normal text-sand-gradient normal-case">Business to Belong.</span>
              </h2>
            </div>

            <div className="space-y-5 text-[#EDE5DA]/85 font-sans-body text-sm sm:text-base font-light leading-relaxed">
              <p>
                Orion One&apos;s commercial component is designed for businesses that want to become part of a curated mixed-use destination.
              </p>
              <p className="text-[#C9BFB1]">
                From dining and retail to offices and lifestyle concepts, the commercial offering creates space for businesses that complement the character of Orion One.
              </p>
            </div>

            {/* Architectural Pedigree Ledger */}
            <div className="border-t border-[#EDE5DA]/15 divide-y divide-[#EDE5DA]/10 pt-2">
              <div className="py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#0d2828] border border-[#EDE5DA]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4 text-[#62AA9E]" />
                </div>
                <div>
                  <h3 className="font-sans-body text-xs font-semibold uppercase tracking-wider text-[#EDE5DA]">
                    Curated Mixed-Use Synergy
                  </h3>
                  <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed mt-1">
                    Seamless harmony between elevated residential towers and vibrant ground-floor commercial frontage.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#0d2828] border border-[#EDE5DA]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-4 h-4 text-[#62AA9E]" />
                </div>
                <div>
                  <h3 className="font-sans-body text-xs font-semibold uppercase tracking-wider text-[#EDE5DA]">
                    A Finite Shoreline Position
                  </h3>
                  <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed mt-1">
                    A rare, irreplaceable address overlooking open water along DHA Phase III&apos;s primary commercial boulevard.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#0d2828] border border-[#EDE5DA]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#62AA9E]" />
                </div>
                <div>
                  <h3 className="font-sans-body text-xs font-semibold uppercase tracking-wider text-[#EDE5DA]">
                    Distinctive Brand Caliber
                  </h3>
                  <p className="font-sans-body text-xs text-[#C9BFB1] font-light leading-relaxed mt-1">
                    Thoughtfully selected concepts ensuring every tenant benefits from a high-trust, elevated commercial atmosphere.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame (Clean, no overlay labels) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#0d2828] border border-[#EDE5DA]/10">
              <Image
                src="/images/commercial/retail-arcade.jpg"
                alt="Curated Retail Arcade Interior at Orion One"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            {/* Caption below the frame */}
            <div className="pt-4 flex items-center justify-between text-xs text-[#808080]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#62AA9E]">
                Retail Arcade & Promenade Interior
              </span>
              <span>Double-Height Volumes</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
