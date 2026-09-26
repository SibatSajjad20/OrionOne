"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

interface DirectoryRow {
  category: string;
  items: string[];
  image: string;
  alt: string;
}

const DIRECTORY_DATA: DirectoryRow[] = [
  {
    category: "Fitness",
    items: [
      "Premium Fitness Center",
      "Elevated Jogging Track",
      "Indoor & Outdoor Jogging Paths",
    ],
    image: "/images/amenities/fitness-gym.jpg",
    alt: "Double-height fitness gym and running tracks",
  },
  {
    category: "Wellness",
    items: [
      "Spa & Salon Suites",
      "Steam & Sauna",
      "Physical Recovery Facilities",
    ],
    image: "/images/amenities/spa.jpg",
    alt: "Thermal sauna and wellness spa facilities",
  },
  {
    category: "Recreation",
    items: [
      "Lake-Facing Infinity Pool",
      "Private Pool Residences",
      "Landscaped Water Garden",
      "Kids' Play Area",
    ],
    image: "/images/amenities/infinity-pool.jpg",
    alt: "Lakefront infinity pool and recreation terraces",
  },
  {
    category: "Community",
    items: [
      "Lakeside Social Terraces",
      "Kids' Play Area",
      "Mosque & Prayer Area",
    ],
    image: "/images/amenities/mosque.jpg",
    alt: "Dedicated prayer sanctuary and lakeside community facilities",
  },
  {
    category: "Convenience",
    items: [
      "Concierge & Welcome Lounge",
      "Smart Access Entry",
      "High-Speed Passenger Lifts",
      "Private Resident Parking",
      "Three-Level Basement Parking",
    ],
    image: "/images/amenities/concierge.jpg",
    alt: "Concierge welcome desk and arrival lounge",
  },
  {
    category: "Security & Tech",
    items: [
      "Smart Home Automation",
      "24/7 CCTV & Controlled Access Infrastructure",
    ],
    image: "/images/amenities/smart-home.jpg",
    alt: "Smart home automation and intelligent building security",
  },
];

export default function AmenitiesIndex() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);

  // Smooth floating cursor preview tracking
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    // Use GSAP quickTo for 60fps GPU-accelerated cursor following
    const xTo = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const previewWidth = 380;
      const previewHeight = 240;
      let targetX = e.clientX + 32;
      let targetY = e.clientY - 120;

      // Keep inside right window boundary
      if (targetX + previewWidth > window.innerWidth - 20) {
        targetX = e.clientX - previewWidth - 32;
      }
      // Keep inside bottom window boundary
      if (targetY + previewHeight > window.innerHeight - 20) {
        targetY = window.innerHeight - previewHeight - 20;
      }
      if (targetY < 20) {
        targetY = 20;
      }

      xTo(targetX);
      yTo(targetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scale & fade preview on category hover
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    if (activeCategory) {
      gsap.to(preview, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else {
      gsap.to(preview, {
        opacity: 0,
        scale: 0.88,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  }, [activeCategory]);

  return (
    <section
      id="directory-ledger"
      className="relative w-full py-16 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-y border-[#EDE5DA]/15"
      aria-label="Amenities at a Glance Directory Ledger"
    >
      {/* Pure Floating Hover Image Preview Card (Desktop - No text overlay) */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-50 w-[360px] xl:w-[400px] aspect-[16/10] rounded-xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.88)] border border-[#EDE5DA]/25 bg-[#081a1a] opacity-0 scale-90 will-change-transform hidden lg:block"
      >
        {DIRECTORY_DATA.map((row) => (
          <div
            key={row.category}
            className={`absolute inset-0 transition-opacity duration-300 ease-out ${
              activeCategory === row.category ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={row.image}
              alt={row.alt}
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Centered Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-24 space-y-4">
          <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Amenities At A{" "}
            <span className="italic font-normal text-sand-gradient normal-case">
              Glance
            </span>
          </h2>

          <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#C9BFB1] font-light leading-relaxed max-w-2xl mx-auto pt-2">
            A comprehensive architectural ledger of fitness, wellness, recreation, and community spaces integrated across Orion One.
          </p>
        </div>

        {/* Spacious 6-Row Ledger Table */}
        <div
          ref={ledgerRef}
          onMouseLeave={() => setActiveCategory(null)}
          className="border-t border-[#EDE5DA]/15 divide-y divide-[#EDE5DA]/15"
        >
          {DIRECTORY_DATA.map((row) => {
            const isHovered = activeCategory === row.category;

            return (
              <div
                key={row.category}
                onMouseEnter={() => setActiveCategory(row.category)}
                className={`group relative py-8 sm:py-10 lg:py-12 transition-all duration-300 cursor-pointer px-4 sm:px-6 rounded-xl ${
                  isHovered ? "bg-[#EDE5DA]/[0.03]" : "hover:bg-[#EDE5DA]/[0.015]"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  {/* Category Title Column */}
                  <div className="lg:col-span-5 flex items-center">
                    <h3 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl text-[#EDE5DA] font-light tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-sand-gradient">
                      {row.category}
                    </h3>
                  </div>

                  {/* Items List Column */}
                  <div className="lg:col-span-6 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-xs sm:text-sm lg:text-base text-[#C9BFB1] font-sans-body font-light">
                    {row.items.map((item, idx) => (
                      <span key={item} className="flex items-center gap-4">
                        <span className="group-hover:text-[#EDE5DA] transition-colors">
                          {item}
                        </span>
                        {idx < row.items.length - 1 && (
                          <span className="text-[#62AA9E]/40 select-none text-xs">
                            •
                          </span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Arrow Indicator Column */}
                  <div className="lg:col-span-1 hidden lg:flex justify-end">
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "border-[#62AA9E] bg-[#62AA9E]/10 text-[#62AA9E] translate-x-1"
                          : "border-[#EDE5DA]/15 text-[#EDE5DA]/40 group-hover:border-[#EDE5DA]/40 group-hover:text-[#EDE5DA]"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Mobile Preview Image (Inline on small screens - No text overlay) */}
                <div className="mt-5 lg:hidden rounded-xl overflow-hidden aspect-[16/10] relative border border-[#EDE5DA]/15 shadow-lg">
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
