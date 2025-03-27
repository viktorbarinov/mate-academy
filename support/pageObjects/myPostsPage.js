exports.MyPosts = class MyPosts {

    constructor(page) {
        /** @type {import('@playwright/test').Locator} */
        this.articleTitleInfo = page.locator('.article-preview [href=\'/article/{slug}\'] h1')
        /** @type {import('@playwright/test').Locator} */
        this.articleDescriptionInfo = page.locator('.article-preview [href=\'/article/{slug}\'] p')
    }
};