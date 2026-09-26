"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowUpRight, MessageCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ResidenceCtaBannerProps {
  onOpenInquiry?: () => void;
}

export default function ResidenceCtaBanner({
  onOpenInquiry,
}: ResidenceCtaBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 sm:py-32 lg:py-36 bg-[#153D3D] text-[#EDE5DA] overflow-hidden border-t border-[#EDE5DA]/10">
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(98,170,158,0.1)_0%,transparent_70%)]" />

      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto px-4 sm:px-12 text-center"
      >
        <h2 className="font-serif-heading text-2xl sm:text-5xl lg:text-7xl font-light text-[#EDE5DA] leading-[1.08] mb-6 uppercase">
          Come home to the lake
        </h2>

        <p className="font-sans-body text-xs sm:text-base md:text-lg text-[#C9BFB1] font-light max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
          Discover a residence shaped around modern life, natural light, and the
          quiet rhythm of open water. Connect with our advisory desk to review
          detailed layouts or schedule an executive tour.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto">
          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              data-magnetic
              data-magnetic-strength="16"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#62AA9E] hover:bg-[#7EC1B6] text-[#0d2828] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.75,0,0.25,1)] shadow-xl hover:shadow-[#62AA9E]/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Book a Private Tour</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}

          <a
            href="https://wa.me/923336660722?text=Hello,%20I%20am%20interested%20in%20Orion%20One%20Residences"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EDE5DA] bg-[#0d2828]/80 hover:bg-[#0d2828] border border-[#EDE5DA]/20 hover:border-[#62AA9E]/60 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-md cursor-pointer hover:-translate-y-0.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#62AA9E]" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </section>
  );
}
