const {test, expect} = require('@playwright/test');
const {POManager} =require('../pageobjects/POManager');
//Json->string->js object
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));


for (const data of dataSet)
{

test(`Client App login ${data.productName}`, async ({page})=>
    {
    //class instance of POManager
    //this will create an instance of the POManager class and pass the page object to it
    //this will allow us to access the page objects for login and dashboard pages
    const poManager = new POManager(page);

    //  const username = "rangataft08@gmail.com";
    //  const password = "@12345Ft";
    //  const productName = "ZARA COAT 3";


  
     // this will navigate to the login page and perform login
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.username, data.password);


    // this will search for the product and add it to the cart and then navigate to the cart
    const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddToCart(data.productName);
     await dashboardPage.navigateToCart();
     
  
    // this will verify the product is displayed in the cart and then proceed to checkout
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();



     // this will search for the country and select it, then submit the order and get the order ID
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
            
});
}