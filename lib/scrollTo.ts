import type Lenis from "lenis";
import { DUR } from "@/lib/motion";

type LenisWindow = Window & { lenis?: Lenis };

export function getLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined;
  const lenis = (window as unknown as LenisWindow).lenis;
  if (!lenis || typeof lenis.scrollTo !== "function") return undefined;
  return lenis;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Absolute page position. Header offset is not applied. */
export function scrollToY(top: number) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(top, prefersReducedMotion() ? { immediate: true } : undefined);
    return;
  }
  window.scrollTo({ top, behavior: "auto" });
}

/**
 * In-page element. Lenis reads `scroll-padding-top` on the document
 * so the fixed header does not cover the target.
 */
export function scrollToElement(element: Element) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(element as HTMLElement, prefersReducedMotion() ? { immediate: true } : { duration: DUR.m });
    return;
  }
  element.scrollIntoView({ block: "start" });
}
