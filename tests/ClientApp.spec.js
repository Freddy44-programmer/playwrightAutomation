const {test, expect} = require('@playwright/test');


test('@WC Client App login', async ({page})=>
    {
 
     await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("#userEmail").fill("rangataft08@gmail.com");
     await page.locator("#userPassword").fill("@12345Ft");
     await page.locator("#login").click();
    //  await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first.waitFor();
    const allTitles = await page.locator(".card-body b").allTextContents();
    console.log(allTitles);
   
    });