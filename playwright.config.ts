import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "https://innovation-brindes-case.vercel.app",
    headless: true,
  },
});