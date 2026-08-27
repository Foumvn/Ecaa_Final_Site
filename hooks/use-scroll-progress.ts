"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

export function clampProgress(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/**
 * Subscribes to window scroll (passive, coalesced through requestAnimationFrame)
 * and stores the value returned by `compute`. Returning `undefined` keeps the
 * previous value, which lets callers bail out when refs are not mounted yet.
 */
export function useScrollValue<T>(compute: () => T | undefined, initialValue: T): T {
  const [value, setValue] = useState<T>(initialValue);
  const rafRef = useRef<number | null>(null);
  const computeRef = useRef(compute);
  computeRef.current = compute;

  const update = useCallback(() => {
    const next = computeRef.current();
    if (next !== undefined) setValue(next);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return value;
}

/**
 * Progress of a sticky section: how far the page has scrolled past the top of
 * the element, over `scrollableHeight` pixels (defaults to two viewports).
 */
export function useStickyScrollProgress(
  ref: RefObject<HTMLElement | null>,
  scrollableHeight?: (element: HTMLElement) => number
): number {
  return useScrollValue(() => {
    const element = ref.current;
    if (!element) return undefined;

    const distance = scrollableHeight
      ? scrollableHeight(element)
      : window.innerHeight * 2;
    if (distance <= 0) return undefined;

    return clampProgress(-element.getBoundingClientRect().top / distance);
  }, 0);
}

/**
 * Progress of an element travelling up through the viewport, from
 * `start` * viewportHeight down to `end` * viewportHeight.
 */
export function useViewportRevealProgress(
  ref: RefObject<HTMLElement | null>,
  start = 0.9,
  end = 0.1
): number {
  return useScrollValue(() => {
    const element = ref.current;
    if (!element) return undefined;

    const startOffset = window.innerHeight * start;
    const endOffset = window.innerHeight * end;
    const totalDistance = startOffset - endOffset;
    if (totalDistance <= 0) return undefined;

    return clampProgress((startOffset - element.getBoundingClientRect().top) / totalDistance);
  }, 0);
}
