const {URLs} = require("../../fixtures/variables/urls");
exports.CreateArticlePage = class CreateArticlePage {

    constructor(page) {
        this.page = page;
        this.titleField = page.getByPlaceholder("Article Title");
        this.descriptionField = page.getByPlaceholder("What's this article about?");
        this.bodyField = page.getByPlaceholder("Write your article (in markdown)");
        this.tagField = page.getByPlaceholder("Enter tags");
        this.submitButton = page.getByPlaceholder(".btn-primary[type='button']");
    }

    async open() {
        await this.page.goto(URLs.createArticlePage);
    }

    async createArticle({title, description, body, tags}) {
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
};