const {URLs, API_URLs} = require("../../fixtures/variables/urls");
const {ARTICLES} = require("../../fixtures/variables/articles");
exports.CreateArticlePage = class CreateArticlePage {

    constructor(page) {
        this.page = page;
        this.titleField = page.getByPlaceholder(ARTICLES.create_article_page.title_placeholder);
        this.descriptionField = page.getByPlaceholder(ARTICLES.create_article_page.description_placeholder);
        this.bodyField = page.getByPlaceholder(ARTICLES.create_article_page.body_placeholder);
        this.tagField = page.getByPlaceholder(ARTICLES.create_article_page.tag_placeholder);
        this.submitButton = page.locator(".btn-primary[type='button']");
    }

    async open() {
        await this.page.goto(URLs.create_article_page);
    }

    async createArticle({title, description, body, tags = []}) {
        await this.titleField.fill(title);
        await this.descriptionField.fill(description);
        await this.bodyField.fill(body);
        await this.addTags(tags)
        await this.submitButton.click();
    }

    async addTags(tags) {
        for (const tag of tags) {
            await this.tagField.fill(tag);
            await this.page.keyboard.press('Enter');
        }
    }

    async getArticleSlugAfterCreation(page, title) {
        const response = await page.waitForResponse(res =>
            res.url().includes(API_URLs.articles) && res.request().method() === 'POST'
        );

        const { article } = await response.json();

        if (article.title !== title) {
            throw new Error(`The title of the created article does not match. Expected: ${title}, but got: ${article.title}`);
        }

        return article.slug;
    }
};