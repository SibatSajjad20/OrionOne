"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#061213] via-[#09191a] to-[#040c0d] text-[#FAFAFA] border-t border-[#45a3a5]/30 pt-20 pb-12 font-sans-body">
      {/* Ambient top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#45a3a5]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info featuring new-logo.png prominently */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex flex-col space-y-3">
              <div className="relative h-16 w-56 sm:h-20 sm:w-64">
                <Image
                  src="/new-logo.png"
                  alt="Orion One Logo"
                  fill
                  sizes="(max-width: 640px) 224px, 256px"
                  className="object-contain object-left"
                />
              </div>
              <span className="text-[10px] tracking-[0.25em] text-[#45a3a5] uppercase block font-bold">
                SP Builders Landmark Development
              </span>
            </div>

            <p className="text-xs text-[#FAFAFA]/80 font-light max-w-sm leading-relaxed">
              Prestige lakefront living and commercial destination situated in Sector F, DHA Phase III Islamabad.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#45a3a5] block">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2.5 text-xs text-[#FAFAFA]/80 font-light">
              <a href="#hero" className="hover:text-[#45a3a5] transition-colors">
                01. Hero Canvas
              </a>
              <a href="#promise" className="hover:text-[#45a3a5] transition-colors">
                02. Directive
              </a>
              <a href="#perspectives" className="hover:text-[#45a3a5] transition-colors">
                03. Perspectives
              </a>
              <a href="#arch-portal" className="hover:text-[#45a3a5] transition-colors">
                04. Portal Arch
              </a>
              <a href="#horizontal-scroll" className="hover:text-[#45a3a5] transition-colors">
                05. Living Stories
              </a>
              <a href="#masterplan" className="hover:text-[#45a3a5] transition-colors">
                06. Timelapse
              </a>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#45a3a5] block">
              Address & Office
            </span>
            <p className="text-xs text-[#FAFAFA]/80 font-light leading-relaxed">
              4th Floor, District 101, Business District, <br />
              Bahria Town (Phase VIII), Rawalpindi / Islamabad
            </p>
          </div>
        </div>

        {/* Copyright & Scroll Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAFAFA]/70 font-light">
          <p>© {new Date().getFullYear()} Orion One by SP Builders. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#45a3a5] hover:text-white transition-colors cursor-pointer font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
