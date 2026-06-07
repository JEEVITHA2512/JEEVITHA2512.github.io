import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    environmentMatchGlobs: [
      ["tests/unit/server/**", "node"],
      ["tests/unit/src/**", "jsdom"],
    ],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".git", ".cache", "tests/e2e/**/*"],
    setupFiles: ["./tests/setup/vitest.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}", "server/**/*.ts"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/db/migrate*.ts",
        "**/db/seed.ts",
        "**/db/update*.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@server": path.resolve(import.meta.dirname, "server"),
    },
  },
});
