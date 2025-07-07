import {test as baseTest} from '@playwright/test';
interface TestDataForOrder{
  username: string;
  password: string;
  productName: string;
}
export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
{
  testDataForOrder: 
  {
    username: "rangataft08@gmail.com",
    password: "@12345Ft", 
    productName: "ZARA COAT 3"
  }
});