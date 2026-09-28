"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

interface HeaderProps {
  className?: string;
  onOpenInquiry?: () => void;
}

export const RESIDENCE_SUITES_MENU = [
  { name: "All Residences", href: "/residence" },
  { name: "1 Bedroom Apartments", href: "/residence/1-bedroom" },
  { name: "2 Bedroom Apartments", href: "/residence/2-bedroom" },
  { name: "3 Bedroom Apartments", href: "/residence/3-bedroom" },
  { name: "Private Pool Residences", href: "/residence/private-pool" },
];

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
    const [residencesDropdownOpen, setResidencesDropdownOpen] = useState(false);
    const [mobileResidencesOpen, setMobileResidencesOpen] = useState(false);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

    const handleMouseEnter = () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
      setResidencesDropdownOpen(true);
    };

    const handleMouseLeave = () => {
      dropdownTimeoutRef.current = setTimeout(() => {
        setResidencesDropdownOpen(false);
      }, 150);
    };

    useEffect(() => {
      return () => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
      };
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 15);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile drawer and dropdown on route change
    useEffect(() => {
      setMenuOpen(false);
      setResidencesDropdownOpen(false);
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
          className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 border-b border-[#EDE5DA]/10 backdrop-blur-none md:backdrop-blur-xl ${
            scrolled
              ? "bg-[#081a1a] md:bg-[#081a1a]/95 shadow-[0_8px_32px_rgba(0,0,0,0.5)] h-[72px]"
              : "bg-[#0d2828] md:bg-[#0d2828]/85 shadow-[0_4px_24px_rgba(0,0,0,0.3)] h-20"
          } ${className}`}
        >
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-full flex items-center justify-between gap-3 sm:gap-4">
            {/* Primary Wordmark & Sun-over-water Horizon Mark */}
            <div className="flex items-center shrink-0 min-w-0">
              <Link
                href="/"
                className="flex items-center py-1 group"
                aria-label="Orion One Home"
              >
                <div className="relative h-8 sm:h-9 w-28 sm:w-32 transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src="/orion-logo-white.png"
                    alt="Orion One by SP Builders"
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-contain object-left drop-shadow-sm"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center justify-center gap-3.5 2xl:gap-6 text-[11px] xl:text-[11.5px] 2xl:text-[12px] tracking-[0.14em] xl:tracking-[0.16em] 2xl:tracking-[0.2em] uppercase font-sans-body font-medium shrink-0">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link);
                const isResidences = link.name === "Residences";

                if (isResidences) {
                  return (
                    <div
                      key={link.href}
                      className="relative group shrink-0 flex items-center"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setResidencesDropdownOpen(false)}
                        className={`relative inline-flex items-center gap-1 py-2 transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                          active
                            ? "text-[#62AA9E] font-semibold"
                            : "text-[#EDE5DA]/75 hover:text-[#EDE5DA]"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-3 h-3 text-[#EDE5DA]/60 transition-transform duration-200 ${
                            residencesDropdownOpen ? "rotate-180 text-[#62AA9E]" : "group-hover:rotate-180"
                          }`}
                        />

                        {/* Active State Accent Glow */}
                        {active && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#62AA9E] rounded-full shadow-[0_0_8px_rgba(98,170,158,0.7)]" />
                        )}

                        {/* Subtle Hover Underline Expand */}
                        {!active && (
                          <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#62AA9E]/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                        )}
                      </Link>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 transition-all duration-200 origin-top z-50 ${
                          residencesDropdownOpen
                            ? "opacity-100 scale-100 pointer-events-auto visible"
                            : "opacity-0 scale-95 pointer-events-none invisible"
                        }`}
                      >
                        <div className="bg-[#081a1a]/95 backdrop-blur-xl border border-[#EDE5DA]/15 rounded-xl p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] space-y-0.5">
                          {RESIDENCE_SUITES_MENU.map((suite) => {
                            const isSuiteActive = pathname === suite.href;
                            return (
                              <Link
                                key={suite.href}
                                href={suite.href}
                                onClick={() => setResidencesDropdownOpen(false)}
                                className={`block px-3 py-2 rounded-lg text-[13px] font-serif-heading tracking-wide transition-colors duration-150 ${
                                  isSuiteActive
                                    ? "text-[#62AA9E] bg-[#153D3D]/50 font-medium"
                                    : "text-[#EDE5DA]/80 hover:text-[#62AA9E] hover:bg-white/5"
                                }`}
                              >
                                {suite.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative py-2 inline-flex items-center transition-colors duration-200 whitespace-nowrap shrink-0 ${
                      active
                        ? "text-[#62AA9E] font-semibold"
                        : "text-[#EDE5DA]/75 hover:text-[#EDE5DA]"
                    }`}
                  >
                    <span>{link.name}</span>

                    {/* Active State Accent Glow */}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#62AA9E] rounded-full shadow-[0_0_8px_rgba(98,170,158,0.7)]" />
                    )}

                    {/* Subtle Hover Underline Expand */}
                    {!active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#62AA9E]/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
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
                className="hidden sm:inline-flex items-center justify-center gap-2 h-9 sm:h-9.5 text-[10.5px] xl:text-[11px] font-semibold tracking-[0.12em] xl:tracking-[0.14em] uppercase text-[#EDE5DA] bg-[#153D3D]/50 hover:bg-[#153D3D] hover:text-[#62AA9E] border border-[#EDE5DA]/15 hover:border-[#62AA9E]/40 px-3.5 xl:px-4 rounded-full transition-all duration-300 shadow-sm whitespace-nowrap shrink-0 group"
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
                className="sm:hidden inline-flex items-center justify-center h-9 w-9 text-[#62AA9E] hover:text-[#7ec1b6] transition-colors rounded-full hover:bg-white/5 shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Book a Tour CTA Button */}
              <button
                onClick={handleInquireClick}
                data-magnetic
                data-magnetic-strength="14"
                className="inline-flex items-center justify-center gap-1.5 h-9 sm:h-9.5 text-[9.5px] sm:text-[10.5px] xl:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] xl:tracking-[0.16em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#081a1a] px-3.5 sm:px-4.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.75,0,0.25,1)] shadow-[0_4px_16px_rgba(98,170,158,0.2)] hover:shadow-[0_4px_24px_rgba(98,170,158,0.35)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer group"
              >
                <span>
                  <span className="hidden min-[360px]:inline">Book a </span>
                  Tour
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              {/* Mobile/Tablet Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="xl:hidden inline-flex items-center justify-center gap-1.5 h-9 text-[#EDE5DA] hover:text-[#62AA9E] bg-[#153D3D]/50 hover:bg-[#153D3D] border border-[#EDE5DA]/15 px-3 rounded-full transition-all duration-200 cursor-pointer shrink-0"
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
            className="fixed inset-0 z-[80] bg-[#081a1a]/98 backdrop-blur-2xl flex flex-col p-5 sm:p-10 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] xl:hidden overflow-y-auto overscroll-contain animate-in fade-in duration-300"
          >
            {/* Top Bar inside drawer */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#EDE5DA]/10 shrink-0">
              <div className="relative h-8 sm:h-9 w-28 sm:w-32">
                <Image
                  src="/orion-logo-white.png"
                  alt="Orion One Logo"
                  fill
                  sizes="128px"
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center p-2.5 text-[#EDE5DA] bg-white/5 hover:bg-white/10 hover:text-[#62AA9E] border border-[#EDE5DA]/15 hover:border-[#62AA9E]/40 rounded-full transition-all duration-200 cursor-pointer active:scale-90"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 transition-transform duration-200 hover:rotate-90" />
              </button>
            </div>

            {/* Editorial Nav Links */}
            <nav className="flex flex-col space-y-1 sm:space-y-1.5 py-4 flex-1">
              {NAV_LINKS.map((link, idx) => {
                const active = isLinkActive(link);
                const ordinal = String(idx + 1).padStart(2, "0");
                const isResidences = link.name === "Residences";

                if (isResidences) {
                  return (
                    <div
                      key={link.href}
                      style={{ animationDelay: `${idx * 40}ms` }}
                      className={`border-b border-[#EDE5DA]/10 py-1.5 sm:py-2 rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 fill-mode-both ${
                        active ? "bg-[#62AA9E]/[0.07] px-3 sm:px-4 border border-[#62AA9E]/25" : "hover:bg-white/[0.02] px-2 sm:px-3"
                      }`}
                    >
                      <div className="flex items-center justify-between min-h-[44px]">
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 group flex-1 transition-transform duration-200 group-hover:translate-x-1"
                        >
                          <span
                            className={`text-[11px] font-sans-body tracking-[0.2em] font-semibold transition-colors ${
                              active ? "text-[#62AA9E]" : "text-[#62AA9E]/60 group-hover:text-[#62AA9E]"
                            }`}
                          >
                            {ordinal}
                          </span>
                          <span
                            className={`font-serif-heading text-lg sm:text-xl tracking-wide transition-colors ${
                              active ? "text-[#62AA9E] font-medium" : "text-[#EDE5DA] group-hover:text-[#62AA9E]"
                            }`}
                          >
                            {link.name}
                          </span>
                          {active && (
                            <span className="inline-flex items-center gap-1.5 text-[8.5px] font-sans-body uppercase tracking-[0.18em] text-[#62AA9E] bg-[#62AA9E]/15 border border-[#62AA9E]/30 px-2 py-0.5 rounded-full font-medium ml-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#62AA9E] animate-pulse" />
                              Active
                            </span>
                          )}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileResidencesOpen((prev) => !prev)}
                          className="p-2 text-[#EDE5DA]/70 hover:text-[#62AA9E] transition-colors cursor-pointer"
                          aria-label="Toggle Residences suites list"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileResidencesOpen ? "rotate-180 text-[#62AA9E]" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Expandable Mobile Suites List */}
                      {mobileResidencesOpen && (
                        <div className="pl-6 pt-1 pb-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                          {RESIDENCE_SUITES_MENU.map((suite) => {
                            const isSuiteActive = pathname === suite.href;
                            return (
                              <Link
                                key={suite.href}
                                href={suite.href}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center justify-between py-1.5 px-3 rounded-lg text-sm font-serif-heading transition-all duration-200 ${
                                  isSuiteActive
                                    ? "text-[#62AA9E] bg-[#62AA9E]/10 border-l-2 border-[#62AA9E] pl-3.5 font-medium"
                                    : "text-[#EDE5DA]/75 hover:text-[#62AA9E] hover:translate-x-1"
                                }`}
                              >
                                <span>{suite.name}</span>
                                {isSuiteActive && (
                                  <span className="w-1 h-1 rounded-full bg-[#62AA9E]" />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className={`transition-all duration-200 border-b border-[#EDE5DA]/10 py-2.5 sm:py-3 px-3 sm:px-4 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-1 group min-h-[44px] rounded-xl animate-in fade-in slide-in-from-bottom-2 fill-mode-both hover:translate-x-1.5 active:scale-[0.99] ${
                      active
                        ? "bg-[#62AA9E]/[0.08] border border-[#62AA9E]/30 text-[#62AA9E]"
                        : "hover:bg-white/[0.03] text-[#EDE5DA] hover:text-[#62AA9E]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-sans-body tracking-[0.2em] font-semibold transition-colors ${
                          active ? "text-[#62AA9E]" : "text-[#62AA9E]/60 group-hover:text-[#62AA9E]"
                        }`}
                      >
                        {ordinal}
                      </span>
                      <span
                        className={`font-serif-heading text-lg sm:text-xl tracking-wide transition-colors ${
                          active ? "text-[#62AA9E] font-medium" : "text-[#EDE5DA] group-hover:text-[#62AA9E]"
                        }`}
                      >
                        {link.name}
                      </span>
                      {active && (
                        <span className="inline-flex items-center gap-1.5 text-[8.5px] font-sans-body uppercase tracking-[0.18em] text-[#62AA9E] bg-[#62AA9E]/15 border border-[#62AA9E]/30 px-2 py-0.5 rounded-full font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#62AA9E] animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 pl-8 sm:pl-0">
                      <span
                        className={`text-[10px] sm:text-[11px] font-sans-body tracking-widest uppercase font-light transition-colors ${
                          active ? "text-[#62AA9E]/80 font-normal" : "text-[#EDE5DA]/50 group-hover:text-[#62AA9E]/80"
                        }`}
                      >
                        {link.subtitle}
                      </span>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 transition-all duration-200 ${
                          active
                            ? "text-[#62AA9E] opacity-100 translate-x-0"
                            : "text-[#62AA9E] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      />
                    </div>
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
