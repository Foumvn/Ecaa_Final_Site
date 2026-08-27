import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("joins conditional class names", () => {
    expect(cn("base", false && "hidden", { active: true })).toBe("base active");
  });

  it("resolves conflicting Tailwind utilities in favor of the last value", () => {
    expect(cn("px-2 py-1", "px-4", ["text-sm", "text-lg"])).toBe(
      "py-1 px-4 text-lg",
    );
  });
});
