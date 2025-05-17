// @ts-check
import { defineConfig, devices } from '@playwright/test';


const config = ({
  testDir: './tests',
  /*Maximum time one test can run for. */
timeout: 40 * 1000,
expect: {
  timeout: 5000,
},

reporter: 'html',
  
  use: {
  
 browserName:'chromium',
 headless: false,
 screenshot: 'only-on-failure',
 video: 'retain-on-failure',
  trace: 'retain-on-failure',
   
  },

  
});

module.exports = config

