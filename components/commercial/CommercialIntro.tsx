"use client";

import Image from "next/image";

export default function CommercialIntro() {
  return (
    <section className="relative py-24 sm:py-36 bg-[#081a1a] border-y border-[#EDE5DA]/15 overflow-hidden">
      {/* Atmosphere vignette */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] bg-[#62AA9E]/4 rounded-full blur-[180px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Heading and Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
              A Place For <br />
              <span className="italic font-normal text-sand-gradient normal-case">
                Business to Belong
              </span>
            </h2>

            <div className="space-y-5 text-[#EDE5DA]/85 font-sans-body text-base sm:text-lg font-light leading-relaxed">
              <p>
                Orion One&apos;s commercial component is designed for businesses that want to become part of a curated mixed-use destination.
              </p>
              <p className="text-[#C9BFB1] text-sm sm:text-base">
                From dining and retail to offices and lifestyle concepts, the commercial offering creates space for businesses that complement the character of Orion One.
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame (Clean, no labels or captions) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#0d2828] border border-[#EDE5DA]/10">
              <Image
                src="/images/commercial/retail-arcade.jpg"
                alt="Orion One Commercial Promenade"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
