// playwright.config.ts
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : undefined,
  projects: [
    {
      name: 'E2E Chromium',
      testDir: './e2e',
      use: {
        browserName: 'chromium', // webkit/firefox
        channel: 'chrome',
        headless: process.env.CI ? true : false
      }
    }
  ],
  reporter: [['junit', { outputFile: 'reports/e2e-results.xml' }]],
  snapshotDir: './e2e/expected-snapshots/',
  outputDir: 'reports'
};
export default config;
