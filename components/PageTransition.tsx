"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { DUR, EASE } from "@/lib/motion";

/**
 * Era-style route enter fade. Template remounts on navigation —
 * opacity choreography only; no layout or content changes.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    const root = rootRef.current;
    const curtain = curtainRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(root, { opacity: 1, clearProps: "opacity" });
      if (curtain) gsap.set(curtain, { autoAlpha: 0 });
      return;
    }

    if (isFirst.current) {
      isFirst.current = false;
      gsap.fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: DUR.m, ease: EASE.inOut, delay: 0.05 }
      );
      return;
    }

    const tl = gsap.timeline();
    if (curtain) {
      tl.fromTo(
        curtain,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: DUR.m, ease: EASE.inOut, delay: 0.05 }
      );
    }
    tl.fromTo(
      root,
      { opacity: 0.35 },
      { opacity: 1, duration: DUR.m, ease: EASE.inOut },
      0
    );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] bg-[#081a1a] opacity-0"
      />
      <div ref={rootRef} className="relative w-full min-h-0">
        {children}
      </div>
    </>
  );
}
