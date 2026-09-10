"use client";

import Image from "next/image";
import { ArrowUp, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0d2828] text-[#EDE5DA] border-t border-[#EDE5DA]/15 pt-12 sm:pt-20 pb-8 sm:pb-12 font-sans-body">
      {/* Ambient top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#62AA9E]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-[#EDE5DA]/10">
          {/* Brand Info featuring primary mark */}
          <div className="md:col-span-5 space-y-5 sm:space-y-6">
            <div className="flex flex-col space-y-3">
              <div className="relative h-12 w-44 sm:h-20 sm:w-64">
                <Image
                  src="/new-logo.png"
                  alt="Orion One Logo"
                  fill
                  sizes="(max-width: 640px) 176px, 256px"
                  className="object-contain object-left [filter:brightness(0)_invert(1)]"
                />
              </div>
              <span className="text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-[#62AA9E] uppercase block font-semibold">
                A Signature Development by SP Builders
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#EDE5DA]/80 font-light max-w-sm leading-relaxed">
              Prestige lakefront residences, commercial terraces, and curated lifestyle amenities situated beside the lakeview commercial in Sector F, DHA Phase III Islamabad.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#808080]">
              <Clock className="w-3.5 h-3.5 text-[#62AA9E]" />
              <span>Show Suite Open Daily · 10AM – 7PM</span>
            </div>
          </div>

          {/* Quick Navigation Chapters */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#62AA9E] block">
              The Journey
            </span>
            <div className="flex flex-col space-y-2.5 text-xs text-[#EDE5DA]/80 font-light">
              <a href="#architecture" className="hover:text-[#62AA9E] transition-colors py-0.5">
                01. Architectural Vision
              </a>
              <a href="#waterfront" className="hover:text-[#62AA9E] transition-colors py-0.5">
                02. Life by the Water
              </a>
              <a href="#masterplan" className="hover:text-[#62AA9E] transition-colors py-0.5">
                03. District Masterplan
              </a>
              <a href="#investment" className="hover:text-[#62AA9E] transition-colors py-0.5">
                04. Investment Proposition
              </a>
              <a href="#destination" className="hover:text-[#62AA9E] transition-colors py-0.5">
                05. The Destination & Pillars
              </a>
            </div>
          </div>

          {/* Official Location & Direct Contact from Brand Guidelines */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#62AA9E] block">
              Headquarters & Show Suite
            </span>
            <div className="space-y-3 text-xs text-[#EDE5DA]/80 font-light leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                <p>
                  4th Floor, District 101, Business District,<br />
                  Bahria Town (Phase VIII), Rawalpindi / Islamabad
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#62AA9E] shrink-0" />
                <a
                  href="tel:+923009079164"
                  className="hover:text-[#62AA9E] transition-colors py-1 min-h-[36px] flex items-center"
                >
                  +92 300 9079 164
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#62AA9E] shrink-0" />
                <a
                  href="mailto:info@orionone.com.pk"
                  className="hover:text-[#62AA9E] transition-colors py-1 min-h-[36px] flex items-center"
                >
                  info@orionone.com.pk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EDE5DA]/60 font-light">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} Orion One by SP Builders. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#62AA9E] hover:text-[#EDE5DA] transition-colors cursor-pointer font-medium py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
