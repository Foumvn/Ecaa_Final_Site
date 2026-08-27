import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      include: ["app/api/**/*.ts", "hooks/**/*.ts", "lib/**/*.ts"],
      exclude: ["**/*.test.ts", "**/*.test.tsx"],
    },
  },
});
