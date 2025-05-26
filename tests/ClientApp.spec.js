const {test, expect} = require('@playwright/test');


test('Client App login', async ({page})=>
    {
     const email = "rangataft08@gmail.com";
     const productName = "ZARA COAT 3";
     const products = page.locator(".card-body");
     await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("#userEmail").fill(email);
     await page.locator("#userPassword").fill("@12345Ft");
     await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    const allTitles = await page.locator(".card-body b").allTextContents();
    console.log(allTitles);

    const count = await products.count();

    for (let i = 0; i < count; ++i) {
      if(await products.nth(i).locator("b").textContent() === productName) {
        //add to cart
        await products.nth(i).locator("text=Add To Cart").click();
        break;
      }
    }
    //wait for cart icon to be visible
    await page.locator("button[routerlink*='cart']").waitFor();
    //click on cart icon
     await page.locator("button[routerlink*='cart']").click();
     await page.locator("div li").first().waitFor();
     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
     expect(bool).toBeTruthy();
     await page.locator("text=Checkout").click();


     //handling auto suggection 
     await page.locator("[placeholder='Select Country']").pressSequentially("ind");
     const dropdown = page.locator(".ta-results");
     await dropdown.waitFor();
     const optionCount = await dropdown.locator("button").count();

        for (let i = 0; i < optionCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
        }
        
       expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
       await page.locator(".action__submit").click();
       expect(page.locator(".hero-primary").first()).toHaveText("Thankyou for the order.");
         //get order id
         const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
         console.log(orderId);


           //checking in my orders if order id is present
           await page.locator("button[routerlink*='myorders']").click();
           await page.locator("tbody").waitFor();
           const rows = await page.locator("tbody tr");

            for (let i = 0; i < await rows.count(); ++i) {
             const rowOrderID =await rows.nth(i).locator("th").textContent();
                if (orderId.includes(rowOrderID)) {
                    await rows.nth(i).locator("button").first().click();
                    break;
                }
            }

            const orderIdDetails = await page.locator(".col-text").textContent();
            expect(orderId.includes(orderIdDetails)).toBeTruthy();
            
});