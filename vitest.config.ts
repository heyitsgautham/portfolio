import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: [
        "src/lib/**",
        "src/utils/**",
        "src/hooks/**",
        "src/components/ui/contribution-graph*.{ts,tsx}",
        "src/features/profile/components/contact/**",
        "src/features/profile/data/github-contributions.ts",
        "src/features/profile/lib/**",
        "src/app/(llms)/**",
      ],
      reporter: ["text", "lcov"],
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 75,
        lines: 70,
      },
    },
  },
});
