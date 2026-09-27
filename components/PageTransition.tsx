"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DUR, EASE } from "@/lib/motion";

/**
 * Module-level navigation state preserved across React component re-mounts
 * during Next.js client-side route transitions (Era Residence Barba-style lifecycle).
 */
let isNavigating = false;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Enter Phase: runs on initial load and whenever pathname changes
  useEffect(() => {
    const root = rootRef.current;
    const curtain = curtainRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(root, { opacity: 1, clearProps: "opacity" });
      if (curtain) gsap.set(curtain, { autoAlpha: 0 });
      isNavigating = false;
      return;
    }

    // Immediate scroll reset before page is revealed
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

    if (isFirstMount.current && !isNavigating) {
      isFirstMount.current = false;
      if (curtain) {
        gsap.fromTo(
          curtain,
          { autoAlpha: 1 },
          {
            autoAlpha: 0,
            duration: 0.7,
            ease: EASE.inOut,
            delay: 0.05,
            onComplete: () => {
              if (lenis) lenis.start();
              ScrollTrigger.refresh();
            },
          }
        );
      }
      gsap.fromTo(
        root,
        { opacity: 0.25, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE.out,
          delay: 0.05,
          clearProps: "all",
          onComplete: () => {
            if (lenis) lenis.start();
            ScrollTrigger.refresh();
          },
        }
      );

      // Safety timer so curtain never stays if animation is disrupted
      const initialSafetyTimer = setTimeout(() => {
        if (curtain) gsap.to(curtain, { autoAlpha: 0, duration: 0.2 });
        if (root) gsap.to(root, { opacity: 1, y: 0, clearProps: "all" });
      }, 1500);

      return () => clearTimeout(initialSafetyTimer);
    }

    isFirstMount.current = false;

    // Route Enter Animation
    const tl = gsap.timeline({
      onComplete: () => {
        isNavigating = false;
        if (lenis) lenis.start();
        ScrollTrigger.refresh();
      },
    });

    if (curtain) {
      tl.to(
        curtain,
        {
          autoAlpha: 0,
          duration: 0.55,
          ease: EASE.inOut,
          delay: 0.05,
        },
        0
      );
    }

    tl.fromTo(
      root,
      { opacity: 0.35 },
      {
        opacity: 1,
        duration: 0.55,
        ease: EASE.inOut,
        clearProps: "opacity",
      },
      0
    );

    return () => {
      tl.kill();
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [pathname]);

  // Exit Phase: Global link click interceptor for seamless exit fade
  useEffect(() => {
    const handleGlobalLinkClick = (event: MouseEvent) => {
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

      const anchor = (event.target as Element | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (
        !rawHref ||
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("javascript:")
      ) {
        return;
      }

      try {
        const dest = new URL(anchor.href, window.location.href);
        if (dest.origin !== window.location.origin) return;

        // Same page & query navigation (e.g. hash jumps) handled natively/by Lenis
        if (
          dest.pathname === window.location.pathname &&
          dest.search === window.location.search
        ) {
          return;
        }

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        if (isNavigating) {
          event.preventDefault();
          return;
        }

        event.preventDefault();
        isNavigating = true;

        const curtain = curtainRef.current;
        const root = rootRef.current;
        const targetHref = dest.pathname + dest.search + dest.hash;

        const lenis = (
          window as unknown as { lenis?: { stop: () => void } }
        ).lenis;
        if (lenis) lenis.stop();

        // Safety timeout to prevent screen lock if navigation is blocked
        if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = setTimeout(() => {
          if (isNavigating && curtain) {
            gsap.to(curtain, { autoAlpha: 0, duration: 0.3 });
            isNavigating = false;
          }
        }, 2200);

        const exitTl = gsap.timeline({
          onComplete: () => {
            router.push(targetHref);
          },
        });

        if (curtain) {
          exitTl.to(
            curtain,
            {
              autoAlpha: 1,
              duration: 0.32,
              ease: EASE.inOut,
            },
            0
          );
        }

        if (root) {
          exitTl.to(
            root,
            {
              opacity: 0.35,
              duration: 0.3,
              ease: EASE.inOut,
            },
            0
          );
        }
      } catch {
        // Fallback to default browser navigation
      }
    };

    window.addEventListener("click", handleGlobalLinkClick, true);

    return () => {
      window.removeEventListener("click", handleGlobalLinkClick, true);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [router]);

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] bg-[#081a1a]"
        style={{
          opacity: isNavigating ? 1 : 0,
          visibility: isNavigating ? "visible" : "hidden",
        }}
      />
      <div ref={rootRef} className="relative w-full min-h-0">
        {children}
      </div>
    </>
  );
}
