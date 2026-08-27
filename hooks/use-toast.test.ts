// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { reducer, toast, useToast } from "./use-toast";

const firstToast = { id: "reducer-1", title: "First", open: true };
const secondToast = { id: "reducer-2", title: "Second", open: true };

describe("toast reducer", () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("adds only the most recent toast", () => {
    const state = reducer(
      { toasts: [firstToast] },
      { type: "ADD_TOAST", toast: secondToast },
    );

    expect(state.toasts).toEqual([secondToast]);
  });

  it("updates the matching toast", () => {
    const state = reducer(
      { toasts: [firstToast, secondToast] },
      { type: "UPDATE_TOAST", toast: { id: "reducer-2", title: "Updated" } },
    );

    expect(state.toasts).toEqual([
      firstToast,
      { ...secondToast, title: "Updated" },
    ]);
  });

  it("dismisses one toast or all toasts", () => {
    vi.useFakeTimers();

    const oneDismissed = reducer(
      { toasts: [firstToast, secondToast] },
      { type: "DISMISS_TOAST", toastId: "reducer-1" },
    );
    expect(oneDismissed.toasts).toEqual([
      { ...firstToast, open: false },
      secondToast,
    ]);

    const allDismissed = reducer(oneDismissed, { type: "DISMISS_TOAST" });
    expect(allDismissed.toasts.every((item) => item.open === false)).toBe(true);
  });

  it("removes one toast or clears the collection", () => {
    const oneRemoved = reducer(
      { toasts: [firstToast, secondToast] },
      { type: "REMOVE_TOAST", toastId: "reducer-1" },
    );
    expect(oneRemoved.toasts).toEqual([secondToast]);

    const allRemoved = reducer(oneRemoved, { type: "REMOVE_TOAST" });
    expect(allRemoved.toasts).toEqual([]);
  });
});

describe("toast API", () => {
  it("publishes, updates, dismisses, and removes a toast", () => {
    vi.useFakeTimers();
    const { result, unmount } = renderHook(() => useToast());

    let controls: ReturnType<typeof toast>;
    act(() => {
      controls = toast({ title: "Created" });
    });
    expect(result.current.toasts[0]).toMatchObject({
      id: controls!.id,
      title: "Created",
      open: true,
    });

    act(() => {
      controls!.update({ id: "ignored", title: "Updated" });
    });
    expect(result.current.toasts[0].title).toBe("Updated");

    act(() => {
      result.current.toasts[0].onOpenChange?.(false);
    });
    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      vi.runAllTimers();
    });
    expect(result.current.toasts).toEqual([]);

    unmount();
    vi.useRealTimers();
  });
});
