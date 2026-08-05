"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  className?: string;
}

const Header = forwardRef<HTMLElement, HeaderProps>(({ className = "" }, ref) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        ref={ref}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#061112]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl ${className}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-22 flex items-center justify-between">
          {/* Logo & Brand Mark featuring new-logo.png */}
          <Link href="/" className="flex items-center group py-1">
            <div className="relative h-14 w-60 sm:h-16 sm:w-68 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/new-logo.png"
                alt="Orion One Logo"
                fill
                sizes="(max-width: 640px) 240px, 272px"
                className="object-contain object-left scale-[1.25] origin-left brightness-125 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links - Restrained Dark Luxury Palette */}
          <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] text-white/80 uppercase font-sans-body font-medium">
            <a href="#promise" className="hover:text-[#45a3a5] transition-colors py-1">
              The Directive
            </a>
            <a href="#perspectives" className="hover:text-[#45a3a5] transition-colors py-1">
              Perspectives
            </a>
            <a href="#arch-portal" className="hover:text-[#45a3a5] transition-colors py-1">
              Portal
            </a>
            <a href="#horizontal-scroll" className="hover:text-[#45a3a5] transition-colors py-1">
              Stories
            </a>
            <a href="#masterplan" className="hover:text-[#45a3a5] transition-colors py-1">
              Timelapse
            </a>
          </nav>

          {/* Actions & Menu Button */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923000000000?text=Hello,%20I%20am%20interested%20in%20Orion%20One"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-white bg-[#0e2728]/90 hover:bg-[#153b3c] border border-white/15 px-4 py-2 rounded-full transition-all duration-300 shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#45a3a5]" />
              <span>WhatsApp</span>
            </a>

            <a
              href="#register"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] bg-[#153b3c] hover:bg-[#276e70] text-white border border-[#45a3a5]/40 px-5 py-2 rounded-full transition-all duration-300 shadow-md"
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-4 h-4 text-[#45a3a5]" />
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2 hover:text-[#45a3a5] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#061112]/98 backdrop-blur-2xl flex flex-col justify-center px-8 sm:px-12 md:hidden">
          <div className="relative w-64 h-20 mb-8">
            <Image
              src="/new-logo.png"
              alt="Orion One Logo"
              fill
              sizes="256px"
              className="object-contain object-left"
            />
          </div>

          <nav className="flex flex-col space-y-6 text-xl font-serif-heading tracking-widest text-white">
            <a
              href="#promise"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#45a3a5] transition-colors border-b border-white/10 pb-3"
            >
              01. The Directive
            </a>
            <a
              href="#perspectives"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#45a3a5] transition-colors border-b border-white/10 pb-3"
            >
              02. Atmospheric Perspectives
            </a>
            <a
              href="#arch-portal"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#45a3a5] transition-colors border-b border-white/10 pb-3"
            >
              03. Architectural Portal
            </a>
            <a
              href="#horizontal-scroll"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#45a3a5] transition-colors border-b border-white/10 pb-3"
            >
              04. Living Stories
            </a>
            <a
              href="#masterplan"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#45a3a5] transition-colors border-b border-white/10 pb-3"
            >
              05. Volumetric Timelapse
            </a>
            <a
              href="#register"
              onClick={() => setMenuOpen(false)}
              className="text-[#45a3a5] pt-4 font-sans-body uppercase text-sm tracking-widest font-bold"
            >
              Register Interest →
            </a>
          </nav>
        </div>
      )}
    </>
  );
});

Header.displayName = "Header";

export default Header;
