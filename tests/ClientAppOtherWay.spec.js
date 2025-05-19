const {test, expect} = require('@playwright/test');


test('@WC Client App login', async ({page})=>
    {
     const email = "rangataft08@gmail.com";
     const productName = "ZARA COAT 3";
     const products = page.locator(".card-body");
     await page.goto("https://rahulshettyacademy.com/client");
     await page.getByPlaceholder("email@example.com").fill(email);
     await page.getByPlaceholder("enter your password").fill("@12345Ft");
     await page.getByRole('button',{name:"Login"}).click();
     await page.waitForLoadState("networkidle");
     await page.locator(".card-body b").first().waitFor();
    
     await page.locator(".card-body").filter({hasText: productName})
     .getByRole("button",{name:"Add to Cart"}).click();

  
    //click on cart icon
     await page.getByRole('listitem',{name:"Cart"}).getByRole('button', {name:"Cart"}).click();
     await page.locator("div li").first().waitFor();
      //check if product is present in cart
     await expect(page.getByText(productName)).toBeVisible();
     await page.getByRole('button',{name:"Checkout"}).click();


     //handling auto suggection 
     await page.getByPlaceholder("Select Country").pressSequentially("ind");
     await page.getByRole("button",{name:"India"}).nth(1).click();
     await page.getByText("PLACE ORDER").click();
     await expect(page.getByText("Thankyou for the order.")).toBeVisible();

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