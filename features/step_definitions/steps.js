  const { Given, When, Then } = require('@cucumber/cucumber');
  const {POManager} =require('../../pageobjects/POManager');
  const {expect} = require('@playwright/test');
  const playwright = require('@playwright/test');
  
  Given('a login to the Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
          const products = this.page.locator(".card-body");
          const loginPage = this.poManager.getLoginPage();
          await loginPage.goTo();
          await loginPage.validLogin(username, password);
         
         });


         When('Add {string} to the cart', async function (productName) {
          this.dashboardPage = this.poManager.getDashboardPage();
          await this.dashboardPage.searchProductAddToCart(productName);
          await this.dashboardPage.navigateToCart();
         });


         Then('Verify {string} is displayed in the cart', async function (productName) {
          const cartPage = this.poManager.getCartPage();
          await cartPage.VerifyProductIsDisplayed(productName);
          await cartPage.Checkout();

         });

         When('Enter valid details and  Place the order',async function () {
          const ordersReviewPage = this.poManager.getOrdersReviewPage();
          await ordersReviewPage.searchCountryAndSelect("ind","India");
          this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
          console.log(this.orderId);
         });


         Then('Verify the order is presented in the order history', async function () {
          await this.dashboardPage.navigateToOrders();
          const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
          await ordersHistoryPage.searchOrderAndSelect(this.orderId);
          expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
         });
