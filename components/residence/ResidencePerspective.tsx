"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ResidencePerspective() {
  const sectionRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const getTargetTransform = () => {
          const el = imageFrameRef.current;
          if (!el) return { targetScale: 1.8, targetY: 0 };

          const currentScale = (gsap.getProperty(el, "scale") as number) || 1;
          const currentY = (gsap.getProperty(el, "y") as number) || 0;

          const rect = el.getBoundingClientRect();
          const unscaledWidth = rect.width / currentScale;
          const unscaledHeight = rect.height / currentScale;
          const unscaledTop = rect.top - currentY;
          const unscaledCenterY = unscaledTop + unscaledHeight / 2;

          const vw = window.innerWidth;
          const vh = window.innerHeight;

          const scaleX = vw / unscaledWidth;
          const scaleY = vh / unscaledHeight;
          const targetScale = Math.max(scaleX, scaleY) * 1.06;
          const targetY = vh / 2 - unscaledCenterY;

          return { targetScale, targetY };
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          narrativeRef.current,
          {
            opacity: 0,
            y: -35,
            ease: "power1.out",
            duration: 0.28,
          },
          0
        );

        tl.to(
          imageFrameRef.current,
          {
            scale: () => getTargetTransform().targetScale,
            y: () => getTargetTransform().targetY,
            borderRadius: 0,
            borderWidth: 0,
            borderColor: "transparent",
            boxShadow: "none",
            ease: "power2.inOut",
            duration: 0.85,
          },
          0
        );

        tl.to({}, { duration: 0.15 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] md:h-screen md:min-h-[640px] bg-[#153D3D] text-[#EDE5DA] overflow-hidden flex flex-col justify-center items-center pt-20 sm:pt-24 pb-8 sm:pb-12"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 flex flex-col items-center justify-center">
        {/* Centered Heading in one line & Paragraph below */}
        <div ref={narrativeRef} className="w-full text-center mb-6 sm:mb-12">
          <h2 className="font-serif-heading text-xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-[#EDE5DA] leading-tight uppercase max-w-5xl mx-auto">
            A HOME WITH <span className="text-[#62AA9E]">A DIFFERENT PERSPECTIVE</span>
          </h2>
          <p className="font-sans-body text-xs sm:text-base md:text-lg text-[#EDE5DA]/85 font-light leading-relaxed max-w-3xl mx-auto mt-3 sm:mt-6">
            Living at Orion One means more than having a well-designed apartment.
            It means waking up beside the lake, moving through spaces shaped by
            natural light, and having seamless access to wellness, recreation,
            dining, and community within the same tranquil destination.
          </p>
        </div>

        {/* Pure Architectural Showcase Frame — Same Image Size */}
        <div
          ref={imageFrameRef}
          className="relative w-full aspect-[16/10] sm:aspect-[21/10] rounded-2xl overflow-hidden shadow-2xl border border-[#EDE5DA]/15 bg-[#153D3D] will-change-transform z-10"
        >
          <Image
            src="/images/residence/pic-5.webp"
            alt="Sunlit double-height residence living room looking toward the terrace at Orion One"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-[1.03] contrast-[1.02]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
