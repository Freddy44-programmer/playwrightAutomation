
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { OrdersHistoryPage} from "./OrdersHistoryPage";
import { OrdersReviewPage} from "./OrdersReviewPage";
import { CartPage} from "./CartPage.ts";
import { Page } from '@playwright/test'; 


export class POManager{


    loginPage: LoginPage;
    dashboardPage: DashboardPage;       
    ordersHistoryPage: OrdersHistoryPage;
    ordersReviewPage: OrdersReviewPage;
    cartPage: CartPage;
    page : Page;    

    constructor(page: Page) 
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
    }


    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

     getCartPage() {
        return this.cartPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

   
}

module.exports = { POManager };
// This class is used to manage the page objects for the application