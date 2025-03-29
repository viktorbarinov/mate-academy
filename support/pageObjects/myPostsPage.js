exports.MyPosts = class MyPosts {

    constructor(page) {
        /** @type {import('@playwright/test').Locator} */
        this.articleTitleInfo = (slug) => page.locator(`.article-preview [href='/article/${slug}'] h1`);
        /** @type {import('@playwright/test').Locator} */
        this.articleDescriptionInfo = (slug) => page.locator(`.article-preview [href='/article/${slug}'] p`);
        /** @type {import('@playwright/test').Locator} */
        this.articleTagPill = (slug) => page.locator(`.article-preview [href='/article/${slug}'] .tag-pill`);
    }
};