import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'src',
  // include .spec.ts, .test.ts and .step.ts patterns
  testMatch: ['**/*.spec.ts', '**/*.test.ts', '**/*.step.ts'],
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    baseURL: 'https://parabank.parasoft.com/'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
});
