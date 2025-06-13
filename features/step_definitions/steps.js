  const { Given, When, Then } = require('@cucumber/cucumber');
  const {POManager} =require('../../pageobjects/POManager');
  const {test,expect, playwright} = require('@playwright/test');
  
  
  Given('a login to the Ecommerce application with {username} and {password}', async function (username, password) {

          // This first three lines are used to set up the Playwright environment
          // and create a new page instance.
          const browser = await playwright.chromium.launch();
          const context = await browser.newContext();
          const page = await context.newPage();
          const poManager = new POManager(page);
          const loginPage = poManager.getLoginPage();
          await loginPage.goTo();
          await loginPage.validLogin(data.username, data.password);
         
         });


         When('Add {string} to the cart', async function (string) {
          const dashboardPage = poManager.getDashboardPage();
          await dashboardPage.searchProductAddToCart(data.productName);
          await dashboardPage.navigateToCart();
         });


         Then('Verify {string} is displayed in the cart', async function (string) {
          const cartPage = poManager.getCartPage();
          await cartPage.VerifyProductIsDisplayed(data.productName);
          await cartPage.Checkout();

         });

         When('Enter valid details and  Place the order',async function () {
          const ordersReviewPage = poManager.getOrdersReviewPage();
          await ordersReviewPage.searchCountryAndSelect("ind","India");
          const orderId = await ordersReviewPage.SubmitAndGetOrderId();
          console.log(orderId);
         });


         Then('Verify the order is presented in the order history', async function () {
          await dashboardPage.navigateToOrders();
          const ordersHistoryPage = poManager.getOrdersHistoryPage();
          await ordersHistoryPage.searchOrderAndSelect(orderId);
          expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
         });
