"use client";

import { ArrowUpRight } from "lucide-react";

interface AboutStewardshipProps {
  onOpenInquiry?: () => void;
}

export default function AboutStewardship({ onOpenInquiry }: AboutStewardshipProps) {
  return (
    <section className="relative py-28 sm:py-40 bg-[#0d2828] border-t border-[#EDE5DA]/15 overflow-hidden">
      {/* Subtle glowing ambient horizon */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-gradient-to-t from-[#62AA9E]/8 to-transparent pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Canopy */}
        {/* Section Canopy */}
        <div className="max-w-4xl mb-16 sm:mb-24 space-y-4">
          <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Built for Today <br />
            <span className="italic font-normal text-sand-gradient normal-case">Designed for Tomorrow</span>
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl pt-2">
            Orion One reflects SP Builders&apos; commitment to structural honesty, disciplined planning, and lasting value. Situated on a finite shoreline in Sector F, DHA Phase III, Islamabad, the development is engineered to stand as a landmark for generations.
          </p>
        </div>

        {/* Architectural Standards Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 border-t border-[#EDE5DA]/15 pt-12 mb-20 sm:mb-28">
          <div className="space-y-3">
            <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
              Geographic Rarity
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
              A finite Sector F waterfront parcel with permanently protected panoramic water horizons that cannot be replicated elsewhere in Islamabad.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
              Kinetic Geometry
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
              Continuous fluid curves engineered to minimize wind resistance, optimize solar angles, and ensure absolute acoustic privacy between homes.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
              Material Honesty
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
              Backlit Turkish travertine, marine grade anodized bronze trims, and high performance low E acoustic double glazed curtain walling.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
              Generational Equity
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
              A landmark asset anchored within the central commercial and leisure corridor of DHA Phase III, structured for enduring capital appreciation.
            </p>
          </div>
        </div>

        {/* Executive Show Suite Invitation */}
        <div className="relative rounded-2xl bg-[#081a1a] p-5 sm:p-10 lg:p-16 border border-[#EDE5DA]/15 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Left: Invitation Headline and Overview */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-serif-heading text-2xl sm:text-4xl lg:text-5xl font-light text-[#EDE5DA] tracking-tight leading-[1.12]">
                Experience Orion One in Person
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed max-w-xl">
                Private viewings are conducted daily at our executive show suite. The 1:100 architectural scale model, complete floor plan monographs, and authentic material finish samples are available for private inspection.
              </p>

              {/* Show Suite Coordinates & Hours Ledger */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EDE5DA]/10 text-xs font-sans-body">
                <div className="space-y-1">
                  <span className="text-[#62AA9E] font-medium uppercase tracking-wider text-[10px] block">
                    Show Suite Address
                  </span>
                  <p className="text-[#EDE5DA]/90 font-light leading-relaxed">
                    4th Floor, District 101, Business District, Bahria Town (Phase VIII), Rawalpindi, Islamabad.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[#62AA9E] font-medium uppercase tracking-wider text-[10px] block">
                    Visiting Hours
                  </span>
                  <p className="text-[#EDE5DA]/90 font-light leading-relaxed">
                    Open Daily · 10:00 AM to 7:00 PM <br />
                    <span className="text-[#C9BFB1] text-[11px]">Personal advisory desk available on arrival</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Focused Architectural Action Box */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#EDE5DA]/15 pt-8 lg:pt-0 lg:pl-12 space-y-4">
              <button
                onClick={onOpenInquiry}
                className="w-full inline-flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7ec1b6] text-[#0d2828] px-5 sm:px-8 py-4 sm:py-4.5 rounded-full transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>Schedule Private Tour</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/923009079164?text=Hello,%20I%20would%20like%20to%20inquire%20about%20Orion%20One"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#EDE5DA]/90 hover:text-[#62AA9E] px-5 sm:px-8 py-3.5 sm:py-4 border border-[#EDE5DA]/20 hover:border-[#62AA9E]/40 rounded-full transition-all duration-300 text-center sm:text-left"
              >
                <span>WhatsApp Private Desk</span>
                <span className="font-mono text-[11px] text-[#62AA9E] font-normal">+92 300 9079 164</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
