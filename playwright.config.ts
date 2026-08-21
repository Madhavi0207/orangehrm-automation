import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false, // OrangeHRM demo shares a single dataset; keep serial to avoid data races
  workers: process.env.CI ? 2 : 3,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["html", { open: "never" }],
    ["list"],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  use: {
    baseURL:
      process.env.BASE_URL || "https://opensource-demo.orangehrmlive.com",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    // { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
});
