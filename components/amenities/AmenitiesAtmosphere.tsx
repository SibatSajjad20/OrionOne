"use client";

import Image from "next/image";

export default function AmenitiesAtmosphere() {
  return (
    <section
      id="atmosphere"
      className="relative w-full py-24 sm:py-32 bg-[#153D3D] text-[#EDE5DA] border-b border-[#EDE5DA]/15"
      aria-label="A Rhythm of Motion and Stillness"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Centered Minimalist Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
          <h2 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            A Rhythm of <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Motion & Stillness
            </span>
          </h2>
          <p className="font-sans-body text-xs sm:text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-xl mx-auto">
            Lifestyle at Orion One shifts naturally with the light — morning vitality along the water, transitioning into unhurried evening recovery.
          </p>
        </div>

        {/* 2-Column Diptych: Morning and Evening */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Morning: Movement */}
          <div className="space-y-5 group">
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-xl transition-colors duration-500 group-hover:border-[#62AA9E]/40">
              <Image
                src="/images/amenities/jogging-track.jpg"
                alt="Morning movement and elevated jogging track overlooking the lake"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
                Morning Vitality
              </h3>
              <p className="font-sans-body text-xs sm:text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
                Sunrise laps in the elevated pool, panoramic fitness conditioning, and continuous jogging tracks along the freshwater edge.
              </p>
            </div>
          </div>

          {/* Evening: Stillness */}
          <div className="space-y-5 group">
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#0d2828] border border-[#EDE5DA]/15 shadow-xl transition-colors duration-500 group-hover:border-[#62AA9E]/40">
              <Image
                src="/images/amenities/spa.jpg"
                alt="Evening thermal spa and restorative wellness suites"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#EDE5DA] font-light">
                Evening Stillness
              </h3>
              <p className="font-sans-body text-xs sm:text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed">
                Quiet steam and sauna suites, restorative thermal therapies, and twilight alfresco dining with illuminated water reflections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
