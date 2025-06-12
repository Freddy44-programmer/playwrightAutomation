const {test, expect} = require('@playwright/test');


test.describe.configure({mode: 'parallel'});// Parallel execution of tests means tests will run at the same time
// test.describe.configure({mode: 'serial'}); // Serial execution of tests which means tests will run one after another
test('@web Popup validations', async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("http://google.com");
// await page.goBack();
// await page.goForward();
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();

//handling java/javascript alerts popups
page.on('dialog', dialog=> dialog.accept());
// page.on('dialog', dialog=> dialog.dismiss());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();

//handling iframes
const framesPage = page.frameLocator("#courses-iframe");
await framesPage.locator("li a[href*='lifetime-access']:visible").click();
//hlandling extracting numeber from string
const textCheck = await framesPage.locator(".text h2").textContent();
textCheck.split(" ")[1];
console.log(textCheck.split(" ")[1]);

});



test('@web Screenshot & Visual comparison', async ({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({path: 'screenshot.png'});
await page.locator("#hide-textbox").click();
await page.screenshot({path: 'screenshot.png'});
await expect(page.locator("#displayed-text")).toBeHidden();

});

//screenshot -store -> screenshot ->
test('Visual', async ({page})=>{
await page.goto("https://flightaware.com/");
expect(await page.screenshot()).toMatchSnapshot('landing.png');
await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");


});


