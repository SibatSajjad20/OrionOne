"use client";

import Image from "next/image";
import { ArrowDown, MapPin, Clock, Phone } from "lucide-react";

interface ContactHeroProps {
  onOpenInquiry?: () => void;
}

export default function ContactHero({ onOpenInquiry }: ContactHeroProps) {
  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto overflow-hidden">
      {/* Subtle ambient lighting vignette */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] bg-[#62AA9E]/6 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Massive Editorial Display Canopy matching About & Home pages */}
      <div className="pb-12 sm:pb-20 max-w-5xl">
        <p className="font-sans-body text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#62AA9E] mb-6">
          SP Builders · Direct Concierge & Show Suite · DHA Phase III Islamabad
        </p>
        <h1 className="font-serif-heading text-5xl sm:text-7xl lg:text-8xl xl:text-[5.5rem] font-light text-[#EDE5DA] tracking-tight leading-[0.98] uppercase">
          Every Message <br />
          <span className="italic font-normal text-sand-gradient normal-case">Starts Something Timeless.</span>
        </h1>
        <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light leading-relaxed max-w-2xl pt-6">
          Whether you are inquiring about private lakefront residences, premier commercial promenade spaces, or arranging an executive tour at our District 101 Show Suite, our leadership and architectural advisors are at your service.
        </p>
      </div>

      {/* Architectural Ledger / Quick Orientation Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 border-t border-[#EDE5DA]/15 pt-8 sm:pt-10">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-[#0d2828] border border-[#EDE5DA]/15 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-[#62AA9E]" />
          </div>
          <div className="space-y-1">
            <span className="font-sans-body text-[10px] font-semibold text-[#62AA9E] tracking-[0.25em] uppercase block">
              HEADQUARTERS & SUITE
            </span>
            <p className="font-sans-body text-xs text-[#EDE5DA] font-medium">
              4th Floor, District 101, Business District Commercial
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-[#0d2828] border border-[#EDE5DA]/15 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-[#62AA9E]" />
          </div>
          <div className="space-y-1">
            <span className="font-sans-body text-[10px] font-semibold text-[#62AA9E] tracking-[0.25em] uppercase block">
              DESK HOURS
            </span>
            <p className="font-sans-body text-xs text-[#EDE5DA] font-medium">
              Monday – Saturday · 10:00 AM – 6:00 PM
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-[#0d2828] border border-[#EDE5DA]/15 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-[#62AA9E]" />
          </div>
          <div className="space-y-1">
            <span className="font-sans-body text-[10px] font-semibold text-[#62AA9E] tracking-[0.25em] uppercase block">
              DIRECT DESK
            </span>
            <p className="font-sans-body text-xs text-[#EDE5DA] font-medium">
              0333 6660722 · +92 300 9079 164
            </p>
            <p className="font-sans-body text-[11px] text-[#808080]">
              spbuilderspk@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
