"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enforce manual scroll restoration and reset window scroll to top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      autoRaf: false,
    });

    (window as unknown as { lenis?: unknown }).lenis = lenis;

    // Immediately anchor scroll position at top
    lenis.scrollTo(0, { immediate: true });

    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis directly with GSAP Ticker for unified, jitter-free 60fps/120fps lock
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Sync Lenis scroll limit whenever GSAP ScrollTrigger refreshes pin layout
    const handleRefresh = () => {
      lenis.resize();
    };

    ScrollTrigger.addEventListener("refresh", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      gsap.ticker.remove(updateTicker);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
