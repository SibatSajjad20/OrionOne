"use client";

import Image from "next/image";

export default function LakesideConnect() {
  return (
    <section
      className="relative py-24 sm:py-36 bg-[#081a1a] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="Spaces to Connect"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#62AA9E]/4 rounded-full blur-[200px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-4xl mb-14 sm:mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#62AA9E] uppercase font-semibold font-sans-body">
              Spaces to Connect
            </span>
            <span className="w-10 h-[1px] bg-[#62AA9E]/40" />
          </div>

          <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            Where the Waterfront <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Brings People Together
            </span>
          </h2>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            Orion One creates shared spaces designed for residents, visitors, and the wider community.
          </p>

          <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1]/80 font-light leading-relaxed max-w-2xl">
            The lakeside setting provides an environment for conversation, relaxation, and social experiences beyond the private residence.
          </p>
        </div>

        {/* Full-Width Architectural Showcase */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-2xl group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/lakeside/fountain-plaza.jpg"
              alt="Community Waterfront Gathering Plaza and Dancing Fountains"
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-center scale-100 transition-transform duration-[3000ms] group-hover:scale-105"
            />

            {/* Gradient Overlays */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#081a1a]/90 via-[#081a1a]/20 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* In-Frame Editorial Overlay */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <span className="font-mono text-[10px] text-[#62AA9E] uppercase tracking-widest block">
                  Shared Public Domain · The Fountains Promenade
                </span>
                <p className="font-sans-body text-xs sm:text-sm text-[#EDE5DA]/90 font-light leading-relaxed">
                  Carefully proportioned stepped terraces and water-edge plazas invite spontaneous conversation, evening gatherings, and leisure moments beside the fountains.
                </p>
              </div>

              <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-[#EDE5DA]/15 pt-4 sm:pt-0 sm:pl-6 text-xs font-mono text-[#C9BFB1] tracking-wider shrink-0">
                <div>
                  <span className="block text-[#EDE5DA] text-lg font-serif">100%</span>
                  <span className="text-[10px] text-[#808080] uppercase tracking-widest">Pedestrianized</span>
                </div>
                <div>
                  <span className="block text-[#EDE5DA] text-lg font-serif">360°</span>
                  <span className="text-[10px] text-[#808080] uppercase tracking-widest">Open Outlook</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
