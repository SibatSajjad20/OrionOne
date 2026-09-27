"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DUR, EASE, type OrionScrollState } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}

const ERA_DURATION = DUR.l; // 1.2s matching Era Residence
const ERA_TOUCH_MULTIPLIER = 2; // Instant flick response matching Era Residence

function wheelProfile() {
  return { duration: ERA_DURATION, wheelMultiplier: 1 };
}

function applyWheelProfile(lenis: Lenis) {
  const profile = wheelProfile();
  lenis.options.duration = profile.duration;
  lenis.options.wheelMultiplier = profile.wheelMultiplier;
  const virtualScroll = (
    lenis as unknown as {
      virtualScroll?: { options?: { wheelMultiplier?: number } };
    }
  ).virtualScroll;
  if (virtualScroll?.options) {
    virtualScroll.options.wheelMultiplier = profile.wheelMultiplier;
  }
}

function anchorOptions(reduced: boolean) {
  return reduced
    ? { offset: 0, immediate: true as const }
    : { offset: 0, duration: ERA_DURATION };
}

function isSamePageHash(anchor: HTMLAnchorElement) {
  try {
    const url = new URL(anchor.href, window.location.href);
    return (
      url.host === window.location.host &&
      url.pathname === window.location.pathname &&
      url.hash.length > 1
    );
  } catch {
    return false;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

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

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;

    const profile = wheelProfile();
    const lenis = new Lenis({
      duration: reduced ? 0 : profile.duration,
      easing: EASE.expoOut,
      smoothWheel: !reduced,
      wheelMultiplier: profile.wheelMultiplier,
      touchMultiplier: ERA_TOUCH_MULTIPLIER,
      autoRaf: false,
      anchors: anchorOptions(reduced),
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    });

    lenisRef.current = lenis;
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    applyWheelProfile(lenis);

    const handleLenisStop = () => lenis.stop();
    const handleLenisStart = () => lenis.start();
    window.addEventListener("lenis:stop", handleLenisStop);
    window.addEventListener("lenis:start", handleLenisStart);

    // Stop the browser's instant hash jump. Lenis then coasts to the target.
    // Capture runs before the cinematic pin handler, which stopPropagates its own chapters.
    const preventNativeHashJump = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement) || !isSamePageHash(anchor)) return;
      if (anchor.target && anchor.target !== "_self") return;
      event.preventDefault();
      const url = new URL(anchor.href, window.location.href);
      if (window.location.hash !== url.hash) {
        history.pushState(null, "", url.hash);
      }
    };
    window.addEventListener("click", preventNativeHashJump, true);

    lenis.scrollTo(0, { immediate: true });

    if (pathname === "/" && document.documentElement.classList.contains("loading-lock")) {
      lenis.stop();
    } else {
      document.documentElement.classList.remove("loading-lock");
      document.body.classList.remove("loading-lock");
      lenis.start();
    }

    const onLenisScroll = (instance: Lenis) => {
      ScrollTrigger.update();
      const state: OrionScrollState = {
        velocity: instance.velocity ?? 0,
        progress: instance.progress ?? 0,
        direction: instance.direction ?? 1,
      };
      window.__orionScroll = state;
    };

    lenis.on("scroll", onLenisScroll);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    let tickerBound = false;
    const bindTicker = () => {
      if (tickerBound) return;
      gsap.ticker.add(updateTicker);
      tickerBound = true;
    };
    const unbindTicker = () => {
      if (!tickerBound) return;
      gsap.ticker.remove(updateTicker);
      tickerBound = false;
    };

    // Era Residence architecture: lagSmoothing(0) ensures 1:1 instantaneous response
    // without GSAP's artificial frame-time dilation delaying smooth-scroll physics.
    gsap.ticker.lagSmoothing(0);
    if (!reduced) bindTicker();

    const onMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches;
      lenis.options.smoothWheel = !reduced;
      lenis.options.anchors = anchorOptions(reduced);
      if (reduced) {
        unbindTicker();
        lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true });
      } else {
        bindTicker();
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    const handleRefresh = () => {
      lenis.resize();
    };

    ScrollTrigger.addEventListener("refresh", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("lenis:stop", handleLenisStop);
      window.removeEventListener("lenis:start", handleLenisStart);
      window.removeEventListener("click", preventNativeHashJump, true);
      motionQuery.removeEventListener("change", onMotionChange);
      unbindTicker();
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
      applyWheelProfile(lenis);
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
