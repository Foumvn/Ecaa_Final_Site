// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useIsMobile } from "./use-mobile";

describe("useIsMobile", () => {
  let changeListener: (() => void) | undefined;
  const addEventListener = vi.fn(
    (_event: string, listener: () => void) => {
      changeListener = listener;
    },
  );
  const removeEventListener = vi.fn();

  beforeEach(() => {
    changeListener = undefined;
    addEventListener.mockClear();
    removeEventListener.mockClear();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        media: "(max-width: 767px)",
        onchange: null,
        addEventListener,
        removeEventListener,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("reports whether the viewport is narrower than the mobile breakpoint", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 600,
      writable: true,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
  });

  it("updates on media-query changes and removes its listener on cleanup", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
      writable: true,
    });

    const { result, unmount } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    window.innerWidth = 500;
    act(() => changeListener?.());

    expect(result.current).toBe(true);

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith("change", changeListener);
  });
});
