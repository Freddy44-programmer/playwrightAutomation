const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
  testDataForOrder:
  {
    username: "rangataft08@gmail.com",
    password: "@12345Ft", 
    productName: "ZARA COAT 3"
  }
});