module.exports = {
  testDir: './tests',
  timeout: 30000,
  use: {
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...require('@playwright/test').devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      },
    },
  ],
};