import { test, expect, Locator, Page } from '@playwright/test';
export class DashboardPage {


    products: Locator;
    productsText: Locator; 
    cart: Locator;
    orders: Locator;
    page: Page;


    constructor(page: Page) {

      this.page = page;
         this.products = page.locator(".card-body");
           this.productsText = page.locator(".card-body b");
           this.cart = page.locator("button[routerlink*='cart']");
            this.orders = page.locator("button[routerlink*='myorders']");

    }


   async searchProductAddToCart(productName: string) {

    // wait for the first product that contains the product name to be visible
    await this.products.first().locator("b").waitFor({state: "visible" });
    
    // get all product titles
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i)     
    {
      if(await this.products.nth(i).locator("b").textContent() === productName)
     {
        //add to cart
       await this.products.nth(i).locator("text=Add To Cart").click();
       break;
      }
    }

   }

   async navigateToCart() {
    
        //click on cart icon
       await this.cart.click();
   }

    async navigateToOrders() {
          //click on orders icon
        await this.orders.click();
    }
}
 module.exports = { DashboardPage };