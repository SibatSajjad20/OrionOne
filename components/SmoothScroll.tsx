"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  DUR,
  EASE,
  NO_SNAP_ROUTES,
  SOFT_SNAP_ROUTES,
  type OrionScrollState,
} from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}

function allowSoftSnap(pathname: string) {
  if (NO_SNAP_ROUTES.has(pathname)) return false;
  if (pathname.startsWith("/residence/")) return false;
  return SOFT_SNAP_ROUTES.has(pathname);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    window.__orionScroll = { velocity: 0, progress: 0, direction: 1 };

    // Home page has a 1700vh cinematic pin — use slower, more controlled settings
    const isHomePage = pathname === "/";
    const lenis = new Lenis({
      duration: isHomePage ? 1.6 : DUR.l,
      easing: EASE.expoOut,
      smoothWheel: true,
      wheelMultiplier: isHomePage ? 0.72 : 0.82,
      touchMultiplier: 1.2,
      syncTouch: false,
      autoRaf: false,
    });

    lenisRef.current = lenis;
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const handleLenisStop = () => lenis.stop();
    const handleLenisStart = () => lenis.start();
    window.addEventListener("lenis:stop", handleLenisStop);
    window.addEventListener("lenis:start", handleLenisStart);

    lenis.scrollTo(0, { immediate: true });

    if (pathname === "/" && document.documentElement.classList.contains("loading-lock")) {
      lenis.stop();
    } else {
      document.documentElement.classList.remove("loading-lock");
      document.body.classList.remove("loading-lock");
      lenis.start();
    }

    const onLenisScroll = (e: {
      velocity?: number;
      progress?: number;
      direction?: number;
    }) => {
      ScrollTrigger.update();
      const state: OrionScrollState = {
        velocity: e.velocity ?? 0,
        progress: e.progress ?? 0,
        direction: e.direction ?? 1,
      };
      window.__orionScroll = state;

      if (!allowSoftSnap(window.location.pathname)) return;
      if (Math.abs(state.velocity) > 0.15) {
        if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
        snapTimerRef.current = setTimeout(() => {
          softSnapToNearest(lenis);
        }, 140);
      }
    };

    lenis.on("scroll", onLenisScroll);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const handleRefresh = () => {
      lenis.resize();
    };

    ScrollTrigger.addEventListener("refresh", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("lenis:stop", handleLenisStop);
      window.removeEventListener("lenis:start", handleLenisStart);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      gsap.ticker.remove(updateTicker);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const lenis = lenisRef.current;

    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });

      if (pathname !== "/") {
        document.documentElement.classList.remove("loading-lock");
        document.body.classList.remove("loading-lock");
        lenis.start();
      }
    }

    let cancelled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        ScrollTrigger.refresh();
        lenisRef.current?.resize();
      });
    });

    const timer = setTimeout(() => {
      if (cancelled) return;
      ScrollTrigger.refresh();
      lenisRef.current?.resize();
    }, 280);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname]);

  return <>{children}</>;
}

function softSnapToNearest(lenis: Lenis) {
  if (document.documentElement.classList.contains("modal-lock")) return;
  if (document.documentElement.classList.contains("loading-lock")) return;

  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("main section, [data-snap]")
  );
  if (!sections.length) return;

  const vh = window.innerHeight;
  let best: HTMLElement | null = null;
  let bestRatio = 0;

  for (const section of sections) {
    if (section.offsetHeight < vh * 0.45) continue;
    const rect = section.getBoundingClientRect();
    const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    if (visible <= 0) continue;
    const ratio = visible / Math.min(section.offsetHeight, vh);
    if (ratio > 0.55 && ratio > bestRatio) {
      bestRatio = ratio;
      best = section;
    }
  }

  if (!best) return;

  const top = best.getBoundingClientRect().top + window.scrollY;
  if (Math.abs(window.scrollY - top) < 48) return;

  lenis.scrollTo(top, { duration: DUR.m, offset: 0 });
}
