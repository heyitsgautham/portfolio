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
    include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.ts"],
    restoreMocks: true,
    // The contact form tests type whole messages through userEvent, which
    // can pass 5s on a loaded runner while every test file runs in parallel.
    testTimeout: 15_000,
    coverage: {
      provider: "v8",
      // Measure the whole app. Only generated code, build-time scripts,
      // type-only modules and the registry's demo examples stay out.
      include: ["src/**/*.{ts,tsx,js}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/__registry__/**",
        "src/scripts/**",
        "src/registry/examples/**",
        "src/types/**",
        "src/features/profile/types/**",
      ],
      reporter: ["text", "lcov"],
      thresholds: {
        statements: 70,
        branches: 65,
        functions: 60,
        lines: 70,
      },
    },
  },
});
