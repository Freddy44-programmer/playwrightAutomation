const playwright = require("@playwright/test");
const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require("../../pageobjects/POManager");


Before(async function () {
  // This first three lines are used to set up the Playwright environment
  // and create a new page instance.
  const browser = await playwright.chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(async function () {
  // This is used to set up the page before each step.
  console.log("I am first to execute.");
});

AfterStep(async function ({result}) {
  // This is used to take a screenshot after each step.
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshot.png" });
  }
});


After(async function () {
  // This is used to close the browser after the tests are done.
  console.log("I am last to execute.");
});
