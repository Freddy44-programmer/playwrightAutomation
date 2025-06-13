// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'process';


const config = ({
  testDir: './tests',
  retries : 1, // Number of retries for failed tests
  Workers: 3, // Number of parallel workers to run tests
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
// npx playwright test --grep @web --project=chrome
// npx playwright test --grep @web --project=firefox
// npx playwright test --grep @web --project=edge
// npx playwright test --grep @web --reporter=line,allure-playwright
// allure generate ./allure-results --clean
// allure open ./allure-report
 //npm run webTests /// npm run webTests --project=chrome
 //java -jar jenkins.war --httpPort=8080 --enable-future-java 
module.exports = config

