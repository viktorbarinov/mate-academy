exports.NavigationBar = class NavigationBar {

    constructor(page) {
        /** @type {import('@playwright/test').Locator} */
        this.profileLink = page.locator('.nav-link[href^=\'/profile\']');
    }
};