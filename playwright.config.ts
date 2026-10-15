import { defineConfig, devices } from '@playwright/test';
import { config } from './config/appConfig';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 12_000 },
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: config.baseUrl, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
