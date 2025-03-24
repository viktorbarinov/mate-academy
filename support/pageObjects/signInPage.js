const {URLs} = require("../../fixtures/variables/urls");
exports.SignInPage = class SignInPage {

    constructor(page) {
        this.page = page;
        this.emailField = page.locator("[type='email']");
        this.passwordField = page.locator("[type='password']");
        this.signInButton = page.locator("[type='submit']");

        /** @type {import('@playwright/test').Locator} */
        this.validationErrorMessage = page.locator(".error-messages");
    }

    async open() {
        await this.page.goto(URLs.loginPage);
    }

    async signIn(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
};