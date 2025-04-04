const {test, expect} = require('@playwright/test');


test.only('Browser Context Playwright test', async ({browser})=>{

//chrome - plugin/ cookies
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//css
await page.locator("#username").fill("shettyacademy");
await page.locator("[type='password']").fill("learning");
await page.locator("#signInBtn").click();
console.log(await page.locator("[style*='block']").textContent());




});


test('First Playwright test', async ({page})=>
    {
    await page.goto("https://google.com");
    //get title - assertion
   console.log(await page.title());
   await expect(page).toHaveTitle("Google")
   
    });