class LoginPage{

    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInbutton =  page.locator("#login");
    }


    async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {
     await this.userName.fill(username);
     await this.password.fill(password);
     await this.signInbutton.click();
     await this.page.waitForLoadState("networkidle");
    }
}

// used to expose the LoginPage class for use in other files
module.exports = { LoginPage };