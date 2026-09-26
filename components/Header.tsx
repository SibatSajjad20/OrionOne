"use client";

import { forwardRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  className?: string;
  onOpenInquiry?: () => void;
}

const NAV_LINKS = [
  { name: "Home", href: "/", subtitle: "Lakefront Living" },
  { name: "Orion One", href: "/orion-one", subtitle: "The Destination" },
  {
    name: "Residences",
    href: "/residence",
    subtitle: "Curated Living",
    match: ["/residence", "/residences"],
  },
  { name: "About Us", href: "/about", subtitle: "SP Builders Heritage" },
  { name: "Commercial", href: "/commercial", subtitle: "Retail & Terraces" },
  {
    name: "Lakeside",
    href: "/lakeside",
    subtitle: "Waterfront Story",
    match: ["/lakeside", "/lakeside-experience"],
  },
  { name: "Location", href: "/location", subtitle: "DHA Phase III Waterfront" },
  { name: "Amenities", href: "/amenities", subtitle: "Movement & Wellness" },
  { name: "Contact Us", href: "/contact", subtitle: "Headquarters & Suite" },
];

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className = "", onOpenInquiry }, ref) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 15);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile drawer on route change
    useEffect(() => {
      setMenuOpen(false);
    }, [pathname]);

    // Prevent background scrolling and lock Lenis when mobile drawer is open
    useEffect(() => {
      const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
      if (menuOpen) {
        document.documentElement.classList.add("modal-lock");
        document.body.classList.add("modal-lock");
        if (lenis) lenis.stop();
        window.dispatchEvent(new CustomEvent("lenis:stop"));
      } else {
        document.documentElement.classList.remove("modal-lock");
        document.body.classList.remove("modal-lock");
        if (lenis) lenis.start();
        window.dispatchEvent(new CustomEvent("lenis:start"));
      }
      return () => {
        document.documentElement.classList.remove("modal-lock");
        document.body.classList.remove("modal-lock");
        if (lenis) lenis.start();
        window.dispatchEvent(new CustomEvent("lenis:start"));
      };
    }, [menuOpen]);

    const handleInquireClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onOpenInquiry) {
        onOpenInquiry();
      } else {
        window.location.href = "/contact";
      }
    };

    const isLinkActive = (link: (typeof NAV_LINKS)[0]) => {
      if (link.href === "/residence" && pathname.startsWith("/residence")) {
        return true;
      }
      if (link.match) {
        return link.match.includes(pathname);
      }
      return pathname === link.href;
    };

    return (
      <>
        <header
          ref={ref}
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-[#EDE5DA]/10 backdrop-blur-none md:backdrop-blur-xl ${
            scrolled
              ? "bg-[#081a1a] md:bg-[#081a1a]/95 shadow-[0_8px_32px_rgba(0,0,0,0.5)] h-[72px]"
              : "bg-[#0d2828] md:bg-[#0d2828]/85 shadow-[0_4px_24px_rgba(0,0,0,0.3)] h-20"
          } ${className}`}
        >
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-full flex items-center justify-between gap-3 sm:gap-4">
            {/* Primary Wordmark & Sun-over-water Horizon Mark */}
            <Link
              href="/"
              className="flex items-center shrink min-w-0 py-1 group"
              aria-label="Orion One Home"
            >
              <div className="relative h-8 sm:h-10 w-28 sm:w-32 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/orion-logo-clean.png"
                  alt="Orion One by SP Builders"
                  fill
                  sizes="(max-width: 640px) 112px, 128px"
                  className="object-contain object-left filter brightness-110 drop-shadow-sm"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6 text-[11px] xl:text-[11.5px] 2xl:text-[12px] tracking-[0.12em] xl:tracking-[0.16em] 2xl:tracking-[0.2em] uppercase font-sans-body font-medium shrink-0">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative py-2.5 transition-colors duration-200 whitespace-nowrap shrink-0 ${
                      active
                        ? "text-[#62AA9E] font-semibold"
                        : "text-[#EDE5DA]/75 hover:text-[#EDE5DA]"
                    }`}
                  >
                    <span>{link.name}</span>

                    {/* Active State Accent Glow */}
                    {active && (
                      <span className="absolute bottom-0.5 left-0 right-0 h-[2px] bg-[#62AA9E] rounded-full shadow-[0_0_8px_rgba(98,170,158,0.7)]" />
                    )}

                    {/* Subtle Hover Underline Expand */}
                    {!active && (
                      <span className="absolute bottom-0.5 left-0 right-0 h-[1.5px] bg-[#62AA9E]/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Direct WhatsApp, Private Tour CTA, and Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
              {/* WhatsApp Concierge - Desktop Pill */}
              <a
                href="https://wa.me/923336660722?text=Hello,%20I%20am%20interested%20in%20Orion%20One"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Concierge"
                className="hidden sm:inline-flex items-center gap-2 text-[10.5px] xl:text-[11px] font-semibold tracking-[0.12em] xl:tracking-[0.14em] uppercase text-[#EDE5DA] bg-[#153D3D]/50 hover:bg-[#153D3D] hover:text-[#62AA9E] border border-[#EDE5DA]/15 hover:border-[#62AA9E]/40 px-3 xl:px-3.5 py-2 rounded-full transition-all duration-300 shadow-sm whitespace-nowrap shrink-0 group"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#62AA9E] transition-transform duration-300 group-hover:scale-110 shrink-0" />
                <span>WhatsApp</span>
              </a>

              {/* WhatsApp Mobile Icon button */}
              <a
                href="https://wa.me/923336660722?text=Hello,%20I%20am%20interested%20in%20Orion%20One"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Concierge"
                className="sm:hidden inline-flex items-center justify-center p-2.5 text-[#62AA9E] hover:text-[#7ec1b6] transition-colors rounded-full hover:bg-white/5 shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Book a Tour CTA Button */}
              <button
                onClick={handleInquireClick}
                data-magnetic
                data-magnetic-strength="14"
                className="inline-flex items-center justify-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[10.5px] xl:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] xl:tracking-[0.16em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#081a1a] px-2.5 sm:px-4.5 py-2.5 sm:py-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.75,0,0.25,1)] shadow-[0_4px_16px_rgba(98,170,158,0.2)] hover:shadow-[0_4px_24px_rgba(98,170,158,0.35)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer group"
              >
                <span>
                  <span className="hidden min-[360px]:inline">Book a </span>
                  Tour
                </span>
                <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              {/* Mobile/Tablet Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden inline-flex items-center justify-center gap-1 sm:gap-1.5 text-[#EDE5DA] hover:text-[#62AA9E] bg-[#153D3D]/50 hover:bg-[#153D3D] border border-[#EDE5DA]/15 px-2.5 sm:px-3 py-2 rounded-full transition-all duration-200 cursor-pointer shrink-0"
                aria-label="Toggle navigation menu"
              >
                <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.15em] font-sans-body">
                  {menuOpen ? "Close" : "Menu"}
                </span>
                {menuOpen ? (
                  <X className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#62AA9E] shrink-0" />
                ) : (
                  <Menu className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#62AA9E] shrink-0" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile & Tablet Fullscreen Editorial Drawer */}
        {menuOpen && (
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 bg-[#081a1a]/98 backdrop-blur-2xl flex flex-col p-5 sm:p-10 lg:hidden overflow-y-auto overscroll-contain animate-in fade-in duration-300"
          >
            {/* Top Bar inside drawer */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#EDE5DA]/10 shrink-0">
              <div className="relative h-8 sm:h-9 w-28 sm:w-32">
                <Image
                  src="/orion-logo-clean.png"
                  alt="Orion One Logo"
                  fill
                  sizes="128px"
                  className="object-contain object-left filter brightness-110"
                />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center p-2.5 text-[#EDE5DA] hover:text-[#62AA9E] border border-[#EDE5DA]/15 hover:border-[#62AA9E]/40 rounded-full transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editorial Nav Links */}
            <nav className="flex flex-col space-y-1 sm:space-y-2 py-4 flex-1">
              {NAV_LINKS.map((link, idx) => {
                const active = isLinkActive(link);
                const ordinal = String(idx + 1).padStart(2, "0");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`transition-colors border-b border-[#EDE5DA]/10 py-3 sm:py-3.5 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-1 group min-h-[44px] ${
                      active ? "text-[#62AA9E]" : "hover:text-[#62AA9E]"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] font-sans-body text-[#62AA9E]/60 tracking-[0.2em] font-semibold">
                        {ordinal}
                      </span>
                      <span className="font-serif-heading text-lg sm:text-xl tracking-wide text-[#EDE5DA] group-hover:text-[#62AA9E] transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-sans-body text-[#EDE5DA]/50 group-hover:text-[#62AA9E]/80 tracking-widest uppercase font-light pl-8 sm:pl-0">
                      {link.subtitle}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions in drawer */}
            <div className="space-y-3 pt-4 sm:pt-6 border-t border-[#EDE5DA]/10 shrink-0 pb-6">
              <button
                onClick={(e) => {
                  setMenuOpen(false);
                  handleInquireClick(e);
                }}
                className="w-full min-h-[48px] py-3.5 rounded-full bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#081a1a] font-sans-body font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Book a Private Tour</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="https://wa.me/923336660722?text=Hello,%20I%20am%20interested%20in%20Orion%20One"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full min-h-[48px] py-3 rounded-full bg-[#153D3D]/60 hover:bg-[#153D3D] border border-[#EDE5DA]/15 text-[#EDE5DA] font-sans-body font-medium text-xs tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-[#62AA9E]" />
                <span>WhatsApp Concierge</span>
              </a>

              <p className="text-[10px] text-center text-[#EDE5DA]/50 font-sans-body uppercase tracking-wider pt-1">
                Show Suite Open Daily · Sector F, DHA Phase III, Islamabad
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
