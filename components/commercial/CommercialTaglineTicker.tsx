"use client";

interface CommercialTaglineTickerProps {
  className?: string;
}

const TAGLINE =
  "Five curated commercial categories tailored to businesses that value architectural distinction, affluent demographics, and a premier lakefront address.";

export default function CommercialTaglineTicker({
  className = "",
}: CommercialTaglineTickerProps) {
  // Repeat content to ensure continuous seamless loop across all viewport widths
  const items = Array.from({ length: 4 });

  return (
    <section
      aria-label="Commercial Proposition Tagline"
      className={`relative w-full overflow-hidden bg-[#0d2828] border-y border-[#EDE5DA]/15 py-6 sm:py-8 select-none z-20 ${className}`}
    >
      {/* Edge gradient soft vignettes for smooth fade in/out */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#153D3D] via-[#153D3D]/80 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#153D3D] via-[#153D3D]/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Infinite Left-to-Right Scrolling Track */}
      <div className="flex w-max animate-marquee-ltr hover:[animation-play-state:paused] cursor-default">
        {/* Track Half 1 */}
        <div className="flex shrink-0 items-center">
          {items.map((_, i) => (
            <div key={`part1-${i}`} className="flex items-center">
              <span className="font-serif-heading text-lg sm:text-2xl lg:text-3xl font-light text-[#EDE5DA]/90 tracking-wide whitespace-nowrap">
                {TAGLINE}
              </span>
              <span
                className="mx-8 sm:mx-14 text-[#62AA9E] text-xs sm:text-sm font-light select-none"
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          ))}
        </div>

        {/* Track Half 2 (Exact Duplicate for Seamless Looping) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {items.map((_, i) => (
            <div key={`part2-${i}`} className="flex items-center">
              <span className="font-serif-heading text-lg sm:text-2xl lg:text-3xl font-light text-[#EDE5DA]/90 tracking-wide whitespace-nowrap">
                {TAGLINE}
              </span>
              <span
                className="mx-8 sm:mx-14 text-[#62AA9E] text-xs sm:text-sm font-light select-none"
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
