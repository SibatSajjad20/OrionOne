"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const curtain = curtainRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(root, { opacity: 1, clearProps: "all" });
      if (curtain) gsap.set(curtain, { autoAlpha: 0 });
      return;
    }

    // Immediate scroll reset on route mount
    window.scrollTo(0, 0);
    const lenis = (
      window as unknown as {
        lenis?: {
          scrollTo: (y: number, opts: unknown) => void;
          start: () => void;
        };
      }
    ).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (lenis) lenis.start();
        ScrollTrigger.refresh();
      },
    });

    if (curtain) {
      tl.fromTo(
        curtain,
        { autoAlpha: 0.6 },
        {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      );
    }

    tl.fromTo(
      root,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        clearProps: "all",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] bg-[#081a1a]"
        style={{ opacity: 0, visibility: "hidden" }}
      />
      <div ref={rootRef} className="relative w-full min-h-0">
        {children}
      </div>
    </>
  );
}
