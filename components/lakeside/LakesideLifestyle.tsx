"use client";

const EXPERIENCES = [
  {
    action: "Walk",
    number: "01",
    title: "Lakeside Paths",
    description: "Lakeside paths designed for everyday movement.",
    detail: "Continuous shoreline circuits connecting lush gardens, pedestrian decks, and open water horizons.",
  },
  {
    action: "Dine",
    number: "02",
    title: "Terrace Dining",
    description: "Restaurants and cafés overlooking the waterfront.",
    detail: "Curated culinary destinations where outdoor tables gaze upon the water and illuminated evening fountains.",
  },
  {
    action: "Connect",
    number: "03",
    title: "Social Spaces",
    description: "Social spaces that encourage community.",
    detail: "Shaded pavilions, amphitheater steps, and open plazas designed for conversation and gathering.",
  },
  {
    action: "Relax",
    number: "04",
    title: "Calm Serenity",
    description: "A calmer setting within a connected urban environment.",
    detail: "Still waters, unhurried seating, and gentle breezes that isolate residents from urban rush.",
  },
];

export default function LakesideLifestyle() {
  return (
    <section
      className="relative py-24 sm:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-b border-[#EDE5DA]/15"
      aria-label="The Waterfront Lifestyle"
    >
      {/* Ambient background glow vignette */}
      <div
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#62AA9E]/4 rounded-full blur-[200px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-4xl mb-14 sm:mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#62AA9E] uppercase font-semibold font-sans-body">
              The Waterfront Lifestyle
            </span>
            <span className="w-10 h-[1px] bg-[#62AA9E]/40" />
          </div>

          <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08] uppercase">
            One Setting <br />
            <span className="italic font-normal text-sand-gradient normal-case">
              Many Experiences
            </span>
          </h2>

          <p className="font-sans-body text-sm sm:text-base text-[#C9BFB1] font-light leading-relaxed max-w-2xl">
            A balanced ecosystem where quiet personal time and vibrant community life coexist seamlessly along the water.
          </p>
        </div>

        {/* 4 Architectural Experience Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 lg:gap-x-14 gap-y-12 sm:gap-y-16">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.number}
              className="group border-t border-[#EDE5DA]/20 pt-6 sm:pt-8 flex flex-col justify-start transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#62AA9E] tracking-widest font-medium">
                  {exp.number}
                </span>
                <span className="font-mono text-[10px] text-[#C9BFB1]/60 uppercase tracking-widest">
                  {exp.action}
                </span>
              </div>

              <h3 className="font-serif-heading text-2xl sm:text-3xl font-light text-[#EDE5DA] tracking-tight mb-3 group-hover:text-[#62AA9E] transition-colors">
                {exp.title}
              </h3>

              <p className="font-sans-body text-xs sm:text-sm text-[#C9BFB1] font-light leading-relaxed mb-2">
                {exp.description}
              </p>

              <p className="font-sans-body text-xs text-[#C9BFB1]/70 font-light leading-relaxed">
                {exp.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
