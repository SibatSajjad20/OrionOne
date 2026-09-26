"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { DUR } from "@/lib/motion";

/**
 * Era-style magnetic pull on [data-magnetic] elements.
 * Attribute-only — no layout or content changes.
 */
export default function MagneticEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px) and (pointer: fine)");
    if (!mq.matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cleanups: Array<() => void> = [];

    const bind = (el: HTMLElement) => {
      const strength = parseFloat(el.dataset.magneticStrength || "18");
      const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]") || el;

      const onMove = (e: MouseEvent) => {
        const b = el.getBoundingClientRect();
        const x = e.clientX - (b.left + b.width / 2);
        const y = e.clientY - (b.top + b.height / 2);
        gsap.to(el, {
          x: (x / b.width) * strength,
          y: (y / b.height) * strength,
          duration: DUR.s,
          ease: "power3.out",
          overwrite: "auto",
        });
        if (inner !== el) {
          gsap.to(inner, {
            x: (x / b.width) * strength * 0.45,
            y: (y / b.height) * strength * 0.45,
            duration: DUR.s,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      const onLeave = () => {
        gsap.to([el, inner], {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.35)",
          overwrite: "auto",
        });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf([el, inner]);
        gsap.set([el, inner], { clearProps: "x,y,transform" });
      });
    };

    // Defer one frame so route content is mounted
    const id = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(bind);
    });

    return () => {
      cancelAnimationFrame(id);
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
