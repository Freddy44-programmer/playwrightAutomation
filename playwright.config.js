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
  
 browserName:'firefox',
 headless: false
   
  },

  
});

module.exports = config

