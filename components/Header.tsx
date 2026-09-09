"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  className?: string;
  onOpenInquiry?: () => void;
}

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className = "", onOpenInquiry }, ref) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleInquireClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onOpenInquiry) {
        onOpenInquiry();
      }
    };

    return (
      <>
        <header
          ref={ref}
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-[#153D3D]/80 backdrop-blur-xl border-b border-[#EDE5DA]/10 shadow-2xl ${className}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-22 flex items-center justify-between">
            {/* Primary Wordmark & Sun-over-water Horizon Mark */}
            <Link href="/" className="flex items-center group py-1">
              <div className="relative h-10 sm:h-14 w-44 sm:w-64 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/new-logo.png"
                  alt="Orion One Logo"
                  fill
                  sizes="(max-width: 640px) 176px, 256px"
                  className="object-contain object-left filter brightness-110"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Chapters - Unhurried Editorial Style */}
            <nav className="hidden lg:flex items-center space-x-7 text-[11px] tracking-[0.25em] text-[#EDE5DA]/80 uppercase font-sans-body font-medium">
              <a href="#architecture" className="hover:text-[#62AA9E] transition-colors py-1">
                Architecture
              </a>
              <a href="#waterfront" className="hover:text-[#62AA9E] transition-colors py-1">
                Waterfront
              </a>
              <a href="#masterplan" className="hover:text-[#62AA9E] transition-colors py-1">
                Masterplan
              </a>
              <a href="#investment" className="hover:text-[#62AA9E] transition-colors py-1">
                Investment
              </a>
              <a href="#destination" className="hover:text-[#62AA9E] transition-colors py-1">
                Destination
              </a>
            </nav>

            {/* Actions: Direct WhatsApp & Private Tour Desk */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://wa.me/923009079164?text=Hello,%20I%20am%20interested%20in%20Orion%20One"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Concierge"
                className="inline-flex sm:hidden p-2 text-[#62AA9E] hover:text-[#7ec1b6] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/923009079164?text=Hello,%20I%20am%20interested%20in%20Orion%20One"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] border border-[#EDE5DA]/15 px-4 py-2 rounded-full transition-all duration-300 shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#62AA9E]" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={handleInquireClick}
                className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-5 py-2 rounded-full transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Book a Tour</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-[#EDE5DA] p-2 hover:text-[#62AA9E] transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Drawer Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-[#153D3D]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto">
            {/* Top Bar inside drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-[#EDE5DA]/10">
              <div className="relative h-10 w-44">
                <Image
                  src="/new-logo.png"
                  alt="Orion One Logo"
                  fill
                  sizes="176px"
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-[#EDE5DA] hover:text-[#62AA9E] transition-colors cursor-pointer rounded-full"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col space-y-4 my-auto py-6 text-base sm:text-lg font-serif tracking-widest text-[#EDE5DA]">
              <a
                href="#architecture"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#62AA9E] transition-colors border-b border-[#EDE5DA]/10 pb-3 flex items-center justify-between"
              >
                <span>01. Architecture</span>
                <span className="text-xs font-sans-body text-[#62AA9E]/70 tracking-normal font-light">Twin Towers</span>
              </a>
              <a
                href="#waterfront"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#62AA9E] transition-colors border-b border-[#EDE5DA]/10 pb-3 flex items-center justify-between"
              >
                <span>02. Life by the Water</span>
                <span className="text-xs font-sans-body text-[#62AA9E]/70 tracking-normal font-light">Promenade</span>
              </a>
              <a
                href="#masterplan"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#62AA9E] transition-colors border-b border-[#EDE5DA]/10 pb-3 flex items-center justify-between"
              >
                <span>03. District Masterplan</span>
                <span className="text-xs font-sans-body text-[#62AA9E]/70 tracking-normal font-light">Interactive</span>
              </a>
              <a
                href="#investment"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#62AA9E] transition-colors border-b border-[#EDE5DA]/10 pb-3 flex items-center justify-between"
              >
                <span>04. Lifestyle & Investment</span>
                <span className="text-xs font-sans-body text-[#62AA9E]/70 tracking-normal font-light">Sector F</span>
              </a>
              <a
                href="#destination"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#62AA9E] transition-colors border-b border-[#EDE5DA]/10 pb-3 flex items-center justify-between"
              >
                <span>05. Destination & Pillars</span>
                <span className="text-xs font-sans-body text-[#62AA9E]/70 tracking-normal font-light">4 Pillars</span>
              </a>
            </nav>

            {/* Actions in drawer */}
            <div className="space-y-3 pt-4 border-t border-[#EDE5DA]/10">
              <button
                onClick={(e) => {
                  setMenuOpen(false);
                  handleInquireClick(e);
                }}
                className="w-full py-3 rounded-full bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] font-sans-body font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Private Tour</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/923009079164?text=Hello,%20I%20am%20interested%20in%20Orion%20One"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#0d2828]/80 hover:bg-[#0d2828] border border-[#EDE5DA]/15 text-[#EDE5DA] font-sans-body font-medium text-xs tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#62AA9E]" />
                <span>WhatsApp Concierge</span>
              </a>

              <p className="text-[10px] text-center text-[#808080] font-sans-body uppercase tracking-wider pt-2">
                Show Suite Open Daily · 10AM – 7PM
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
);

Header.displayName = "Header";

export default Header;
