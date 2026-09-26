"use client";

import Image from "next/image";

export default function AboutPhilosophy() {
  return (
    <section id="philosophy" className="relative py-28 sm:py-40 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden">
      {/* Subtle ambient lighting vignette */}
      <div 
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#62AA9E]/5 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* The Central Manifesto Spread */}
        <div className="max-w-5xl mb-16 sm:mb-24">
          <blockquote className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl xl:text-[5rem] font-light text-[#EDE5DA] tracking-tight leading-[1.08]">
            &ldquo;We don&apos;t just build projects <br />
            <span className="italic font-normal text-sand-gradient">We create destinations&rdquo;</span>
          </blockquote>
        </div>

        {/* Cinematic Pure Borderless Panoramic Spread */}
        <div className="space-y-12 sm:space-y-16">
          <div className="relative aspect-[16/10] sm:aspect-[21/8] w-full overflow-hidden rounded-xl bg-[#0d2828]">
            <Image
              src="/images/about/orion-marble-wall.png"
              alt="Orion One Grand Entrance and Backlit Travertine Emblem"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-all duration-700 ease-out"
            />
          </div>

          {/* Architectural Theses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-[#EDE5DA]/15 pt-12">
            <div className="space-y-3">
              <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
                Fluidity Over Rigidity
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Water has no sharp corners. The towers curve organically, channeling prevailing lake breezes and allowing natural morning and evening light to penetrate deep into every residence.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
                Integrated Functionality
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Residential quiet sits effortlessly above a vibrant waterfront promenade and culinary arcade, connected by landscaped trails and water features rather than commercial barriers.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif-heading text-lg sm:text-xl text-[#EDE5DA] font-light">
                Generational Longevity
              </h3>
              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed">
                Situated on a finite shoreline in DHA Phase III Islamabad, Orion One is engineered with honest structural materials designed to age with dignity over the next century.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
