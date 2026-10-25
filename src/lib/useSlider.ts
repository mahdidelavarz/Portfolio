"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";

const SWIPE_THRESHOLD = 50;

/**
 * Manual slider state: no autoplay. Arrow keys only act while the slider
 * itself has focus, so they never hijack page scrolling or other widgets.
 */
export function useSlider(count: number, initialIndex = 0) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef(0);

  const previous = () => setIndex((i) => (i === 0 ? count - 1 : i - 1));
  const next = () => setIndex((i) => (i === count - 1 ? 0 : i + 1));

  const containerProps = {
    tabIndex: 0,
    role: "region",
    "aria-roledescription": "carousel",
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    },
    onTouchStart: (event: TouchEvent<HTMLElement>) => {
      touchStartX.current = event.touches[0].clientX;
    },
    onTouchEnd: (event: TouchEvent<HTMLElement>) => {
      const distance = touchStartX.current - event.changedTouches[0].clientX;
      if (Math.abs(distance) < SWIPE_THRESHOLD) return;
      if (distance > 0) next();
      else previous();
    },
  } as const;

  return { index, setIndex, previous, next, containerProps };
}
