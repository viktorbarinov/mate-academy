exports.NavigationBar = class NavigationBar {

    constructor(page) {
        this.homeLink = page.locator('.nav-link[href=\'/\']');
        this.newArticleLink = page.locator('.nav-link[href=\'/editor\']');
        this.settingsLink = page.locator('.nav-link[href=\'/settings\']');

        /** @type {import('@playwright/test').Locator} */
        this.profileLink = page.locator('.nav-link[href^=\'/profile\']');
    }

    async goToHome() {
        await this.homeLink.click();
    }

    async goToNewArticle() {
        await this.newArticleLink.click();
    }

    async goToSettings() {
        await this.settingsLink.click();
    }

    async goToProfile() {
        await this.profileLink.click();
    }
};