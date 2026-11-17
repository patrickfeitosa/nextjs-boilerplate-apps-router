import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  reporter: process.env.CI ? 'github' : 'list',
  retries: process.env.CI ? 2 : 0,
  testDir: './e2e',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command: process.env.CI ? 'yarn start' : 'yarn dev',
    reuseExistingServer: !process.env.CI,
    url: `http://localhost:${PORT}`,
  },
});
