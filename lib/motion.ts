/**
 * Shared motion language (Era-inspired).
 * Use for scroll / transition / hover timing only — never for layout.
 */

export const DUR = {
  s: 0.4,
  m: 0.8,
  l: 1.2,
} as const;

/** Matches Era CustomEase "InOut" / CSS --ease-inout */
export const EASE = {
  inOut: "power2.inOut",
  out: "power3.out",
  in: "power2.in",
  /** Expo coast used by Lenis + Era */
  expoOut: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  /** Soft scrub damping for pins (Era parallax uses ~0.5–0.8) */
  scrub: 0.65,
  scrubLoose: 0.8,
  scrubTight: 0.5,
} as const;

export const STAGGER = 0.1;

export type OrionScrollState = {
  velocity: number;
  progress: number;
  direction: number;
};

declare global {
  interface Window {
    __orionScroll?: OrionScrollState;
  }
}
