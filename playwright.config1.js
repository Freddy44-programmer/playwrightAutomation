// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'process';


const config = ({
  testDir: './tests',
  /*Maximum time one test can run for. */
timeout: 40 * 1000,
expect: {
  timeout: 5000,
},

reporter: 'html',
projects: [
{
  name: 'chrome',
  use: {
 browserName:'chromium',
 headless: false,
 screenshot: 'only-on-failure',
 video: 'retain-on-failure',
  trace: 'retain-on-failure',
  // permission: ['geolocation'],
  // ignoreHttpsErrors: true,
// ...devices['iPhone 14 Pro'],
   
  }
},
{
  name: 'firefox',
  use: {
    browserName: 'firefox',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  }
},
{
  name: 'edge',
  use: {
    browserName: 'chromium',
    channel: 'msedge',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  }
}
],
});
// This is a Playwright configuration file that sets up the testing environment.
// npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js --project=chrome 
module.exports = config

