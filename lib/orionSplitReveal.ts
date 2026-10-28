import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export type SplitRevealRole = "heading" | "eyebrow" | "body";

export interface OrionSplitRevealOptions {
  root: HTMLElement | null;
  headings?: Array<HTMLElement | null>;
  eyebrows?: Array<HTMLElement | null>;
  bodies?: Array<HTMLElement | null>;
}

function shouldSkipSplit(): {
  explicitReducedMotion: boolean;
  lowDeviceOrSaveData: boolean;
} {
  if (typeof window === "undefined") {
    return { explicitReducedMotion: true, lowDeviceOrSaveData: true };
  }

  const explicitReducedMotion =
    document.documentElement.dataset.reducedMotion === "true";

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
  };
  const saveData = Boolean(nav.connection?.saveData);
  const lowCores =
    typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2;

  return {
    explicitReducedMotion,
    lowDeviceOrSaveData: saveData || lowCores,
  };
}

function isForbiddenTarget(el: HTMLElement): boolean {
  return Boolean(
    el.closest("nav, button, [data-no-split], footer small") ||
      el.tagName === "BUTTON" ||
      el.tagName === "NAV"
  );
}

/**
 * Preserves `.text-sand-gradient` fill on split character elements without applying
 * negative margins from `.text-sand-gradient` to individual characters.
 */
function preserveGradientOnChars(
  container: HTMLElement
): Array<() => void> {
  const restores: Array<() => void> = [];
  const gradientParents = container.querySelectorAll<HTMLElement>(
    ".text-sand-gradient"
  );

  gradientParents.forEach((gradEl) => {
    const prevBg = gradEl.style.background;
    const prevFill = gradEl.style.webkitTextFillColor;
    gradEl.style.background = "none";
    gradEl.style.webkitTextFillColor = "initial";

    restores.push(() => {
      gradEl.style.background = prevBg;
      gradEl.style.webkitTextFillColor = prevFill;
    });

    gradEl.querySelectorAll<HTMLElement>(".orion-split-char").forEach((charEl) => {
      charEl.style.backgroundImage =
        "linear-gradient(135deg, #FFFFFF 0%, #EDE5DA 50%, #C9BFB1 100%)";
      charEl.style.webkitBackgroundClip = "text";
      charEl.style.backgroundClip = "text";
      charEl.style.webkitTextFillColor = "transparent";
    });
  });

  return restores;
}

/**
 * ERA-disciplined role-based SplitText reveal with mirrored scroll-back exits.
 * Roles:
 *  1) Luxia headings -> chars from rotationX 90deg + x: 6rem, stagger 0.02, power3.out
 *  2) Montserrat eyebrows -> words rotateY -80 to 0
 *  3) Body -> lines masked overflow:hidden, y: 110% to 0
 *  Mirrored exit on scroll-back: toggleActions "play none none reverse"
 */
export function setupOrionSplitReveal({
  root,
  headings = [],
  eyebrows = [],
  bodies = [],
}: OrionSplitRevealOptions): () => void {
  if (!root || typeof window === "undefined") {
    return () => {};
  }

  const headingNodes = new Set<HTMLElement>();
  const eyebrowNodes = new Set<HTMLElement>();
  const bodyNodes = new Set<HTMLElement>();

  headings.forEach((el) => el && !isForbiddenTarget(el) && headingNodes.add(el));
  eyebrows.forEach((el) => el && !isForbiddenTarget(el) && eyebrowNodes.add(el));
  bodies.forEach((el) => el && !isForbiddenTarget(el) && bodyNodes.add(el));

  root.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((el) => {
    if (isForbiddenTarget(el)) return;
    const role = el.dataset.scrollReveal;
    if (role === "heading" || role === "h") headingNodes.add(el);
    else if (role === "eyebrow" || role === "a") eyebrowNodes.add(el);
    else if (role === "body" || role === "p") bodyNodes.add(el);
  });

  const allTargets = [
    ...Array.from(headingNodes),
    ...Array.from(eyebrowNodes),
    ...Array.from(bodyNodes),
  ];

  const { explicitReducedMotion, lowDeviceOrSaveData } = shouldSkipSplit();

  if (explicitReducedMotion || lowDeviceOrSaveData) {
    if (allTargets.length > 0) {
      gsap.set(allTargets, { opacity: 1, clearProps: "transform" });
    }
    return () => {};
  }

  const splits: SplitText[] = [];
  const lineWrappers: HTMLElement[] = [];
  const gradientRestores: Array<() => void> = [];

  const ctx = gsap.context(() => {
    // 1. Luxia headings -> chars from rotationX 90deg + x: 6rem, stagger 0.02, power3.out
    headingNodes.forEach((el) => {
      const split = new SplitText(el, {
        type: "words,chars",
        wordsClass: "orion-split-word inline-block",
        charsClass: "orion-split-char inline-block will-change-transform",
      });
      gradientRestores.push(...preserveGradientOnChars(el));
      splits.push(split);

      gsap.fromTo(
        split.chars,
        {
          opacity: 0,
          rotationX: 90,
          x: "6rem",
          transformPerspective: 800,
          transformOrigin: "50% 100%",
        },
        {
          opacity: 1,
          rotationX: 0,
          x: 0,
          duration: 0.9,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 2. Montserrat eyebrows -> words rotateY -80 to 0
    eyebrowNodes.forEach((el) => {
      const split = new SplitText(el, {
        type: "words",
        wordsClass: "orion-split-word inline-block will-change-transform",
      });
      splits.push(split);

      gsap.fromTo(
        split.words,
        {
          opacity: 0,
          rotationY: -80,
          transformPerspective: 600,
          transformOrigin: "0% 50%",
        },
        {
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 3. Body -> lines masked overflow:hidden, y: 110% to 0
    bodyNodes.forEach((el) => {
      const split = new SplitText(el, {
        type: "lines",
        linesClass: "orion-split-line will-change-transform",
      });
      splits.push(split);

      // Wrap each line in an overflow:hidden mask container
      split.lines.forEach((line) => {
        const lineEl = line as HTMLElement;
        const parent = lineEl.parentNode;
        if (!parent) return;
        const mask = document.createElement("div");
        mask.style.overflow = "hidden";
        mask.style.display = "block";
        parent.insertBefore(mask, lineEl);
        mask.appendChild(lineEl);
        lineWrappers.push(mask);
      });

      gsap.fromTo(
        split.lines,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, root);

  return () => {
    ctx.revert();
    lineWrappers.forEach((mask) => {
      const parent = mask.parentNode;
      if (parent) {
        while (mask.firstChild) {
          parent.insertBefore(mask.firstChild, mask);
        }
        parent.removeChild(mask);
      }
    });
    gradientRestores.forEach((fn) => fn());
    splits.forEach((s) => s.revert());
  };
}
