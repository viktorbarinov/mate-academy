exports.ArticlePage = class ArticlePage {

    constructor(page) {
        /** @type {import('@playwright/test').Locator} */
        this.articleTitleInfo = page.locator(`.article-page h1`);
        /** @type {import('@playwright/test').Locator} */
        this.articleBodyInfo = page.locator(`.article-page p`);
        /** @type {import('@playwright/test').Locator} */
        this.articleTagPill = page.locator(`.article-page .tag-pill`);
    }
};