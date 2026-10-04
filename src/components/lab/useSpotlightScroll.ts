"use client";

import { useEffect, type RefObject } from "react";

/** Scrolls the spotlighted element (or the hint next to it) to the middle of the screen. */
export function useSpotlightScroll(containerRef: RefObject<HTMLElement | null>, spotlightKey: string | null) {
  useEffect(() => {
    if (spotlightKey === null) return;
    const frame = window.requestAnimationFrame(() => {
      const container = containerRef.current;
      const target =
        container?.querySelector<HTMLElement>("[data-spotlight='true']") ??
        container?.querySelector<HTMLElement>("[role='note']");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [containerRef, spotlightKey]);
}
