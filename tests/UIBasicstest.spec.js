const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');


test('@web Browser Context Playwright test', async ({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator('#username');
const signIn = page.locator("#signInBtn");
const cardTitles = page.locator(".card-body a");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
//css
await userName.fill("shettyacademy");
await page.locator("[type='password']").fill("learning");
await signIn.click();
console.log(await page.locator("[style*='block']").textContent());
await expect( page.locator("[style*='block']")).toContainText('Incorrect');
//type - fill
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);

});


    
test('First Playwright test', async ({page})=>
    {
    await page.goto("https://google.com");
    //get title - assertion
   console.log(await page.title());
   await expect(page).toHaveTitle("Google")
   
    });


    test('UI Controls', async ({page})=>
        {
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       const userName = page.locator('#username');
       const signIn = page.locator("#signInBtn");
       const documentLink = page.locator("a[href*='documents-request']");
       const dropdown = page.locator("select.form-control");
       await dropdown.selectOption("consult");
      //  await page.pause();

       await page.locator(".radiotextsty").last().click();
       await page.locator("#okayBtn").click();
       await expect(page.locator(".radiotextsty").last()).toBeChecked();

         //checkbox
       await page.locator("#terms").click();
       await expect(page.locator("#terms")).toBeChecked();
     //  await expect(page.locator("#terms")).uncheck();
     await expect(documentLink).toHaveAttribute("class", "blinkingText");
       
        });

    

        test('Child windows handling', async ({browser})=>
            {
            const context = await browser.newContext();
            const page = await context.newPage();
            const userName = page.locator('#username');
            const signIn = page.locator("#signInBtn");
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            const documentLink = page.locator("[href*='documents-request']");

           const [newPage] = await Promise.all([

                context.waitForEvent('page'),//listen for any new page 
                documentLink.click(),// new page is opened
            ])

           const text = await newPage.locator(".red").textContent();
           //grab the email text from the new page
           const arrayText = text.split("@");
           const domain = arrayText[1].split(" ")[0].trim();
            console.log(domain);
           await page.locator("#username").fill(domain);
          //  await page.pause();
           console.log(await page.locator("#username").textContent());
            });