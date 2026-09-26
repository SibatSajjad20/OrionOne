"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0d2828] text-[#EDE5DA] border-t border-[#EDE5DA]/15 pt-16 sm:pt-24 pb-8 sm:pb-12 font-sans-body">
      {/* Ambient top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#62AA9E]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-12 sm:pb-16 border-b border-[#EDE5DA]/10">
          
          {/* Brand Info & Mission Statement */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex flex-col space-y-3">
              <div className="relative h-12 w-48 sm:h-16 sm:w-60">
                <Image
                  src="/new-logo.png"
                  alt="Orion One by SP Builders"
                  fill
                  sizes="(max-width: 640px) 192px, 240px"
                  className="object-contain object-left filter brightness-110"
                />
              </div>
              <span className="text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-[#62AA9E] uppercase block font-semibold">
                A Signature Development by SP Builders
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#EDE5DA]/80 font-light max-w-sm leading-relaxed">
              SP Builders delivers trusted construction, consultancy, and development solutions across Pakistan with an unwavering commitment to architectural quality, structural integrity, and enduring value.
            </p>

            <div className="flex items-center gap-2.5 text-xs text-[#808080]">
              <Clock className="w-3.5 h-3.5 text-[#62AA9E]" />
              <span>Show Suite Open Daily · 10AM – 6PM</span>
            </div>
          </div>

          {/* Quick Links: Strictly 3 Pages + Social Outlines */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#62AA9E] block mb-4">
                Quick Links
              </span>
              <div className="flex flex-col space-y-1 text-xs sm:text-sm text-[#EDE5DA]/85 font-light">
                <Link href="/" className="hover:text-[#62AA9E] transition-colors py-2 min-h-11 flex items-center">
                  Home
                </Link>
                <Link href="/orion-one" className="hover:text-[#62AA9E] transition-colors py-2 min-h-11 flex items-center">
                  Orion One
                </Link>
                <Link href="/about" className="hover:text-[#62AA9E] transition-colors py-2 min-h-11 flex items-center">
                  About Us
                </Link>
                <Link href="/commercial" className="hover:text-[#62AA9E] transition-colors py-2 min-h-11 flex items-center">
                  Commercial
                </Link>
                <Link href="/lakeside" className="hover:text-[#62AA9E] transition-colors py-2 min-h-11 flex items-center">
                  Lakeside Experience
                </Link>
                <Link href="/location" className="hover:text-[#62AA9E] transition-colors py-2 min-h-11 flex items-center">
                  Location
                </Link>
                <Link href="/amenities" className="hover:text-[#62AA9E] transition-colors py-2 min-h-11 flex items-center">
                  Amenities
                </Link>
                <Link href="/contact" className="hover:text-[#62AA9E] transition-colors py-2 min-h-11 flex items-center">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Social Channels with outline boxes adhering to DESIGN.md icon rules */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[10px] uppercase tracking-widest text-[#808080] block">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg border border-[#EDE5DA]/15 hover:border-[#62AA9E] text-[#EDE5DA]/70 hover:text-[#62AA9E] transition-all bg-[#153D3D]/30"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg border border-[#EDE5DA]/15 hover:border-[#62AA9E] text-[#EDE5DA]/70 hover:text-[#62AA9E] transition-all bg-[#153D3D]/30"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <polygon points="10 15 15 12 10 9 10 15" />
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg border border-[#EDE5DA]/15 hover:border-[#62AA9E] text-[#EDE5DA]/70 hover:text-[#62AA9E] transition-all bg-[#153D3D]/30"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg border border-[#EDE5DA]/15 hover:border-[#62AA9E] text-[#EDE5DA]/70 hover:text-[#62AA9E] transition-all bg-[#153D3D]/30"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Official Location & Direct Contact */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#62AA9E] block">
              Headquarters & Show Suite
            </span>
            <div className="space-y-3.5 text-xs text-[#EDE5DA]/80 font-light leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#62AA9E] shrink-0 mt-0.5" />
                <p>
                  4th Floor, District 101, Business District Commercial,<br />
                  Phase 8, Bahria Town, Rawalpindi / Islamabad
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <Phone className="w-4 h-4 text-[#62AA9E] shrink-0" />
                <a
                  href="tel:03336660722"
                  className="hover:text-[#62AA9E] transition-colors py-0.5"
                >
                  0333 6660722
                </a>
                <span className="text-[#808080]">/</span>
                <a
                  href="tel:+923009079164"
                  className="hover:text-[#62AA9E] transition-colors py-0.5"
                >
                  +92 300 9079 164
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#62AA9E] shrink-0" />
                <a
                  href="mailto:spbuilderspk@gmail.com"
                  className="hover:text-[#62AA9E] transition-colors py-0.5"
                >
                  spbuilderspk@gmail.com
                </a>
              </div>

              <div className="pt-1.5">
                <a
                  href="https://maps.google.com/?q=District+101+Business+District+Commercial+Phase+8+Bahria+Town+Rawalpindi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#62AA9E] hover:text-[#EDE5DA] transition-colors font-medium text-xs tracking-wider group"
                >
                  <span>See On Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EDE5DA]/60 font-light">
          <p className="text-center sm:text-left">
            © Copyright. All rights reserved. Powered by Reamarc.io
          </p>

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
