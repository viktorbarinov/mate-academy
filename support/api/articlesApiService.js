import {expect} from "@playwright/test";
import {API_URLs} from "../../fixtures/variables/urls";

export class ArticlesApiService {

    static async getAllArticles(request) {
        const response = await request.get(API_URLs.articles);
        expect(response.status()).toBe(200);
        const data = await response.json();
        return data.articles;
    }

    static async getArticleSlugByTitle(request, title) {
        const articles = await this.getAllArticles(request);
        const article = articles.find(article => article.title === title);
        return article ? article.slug : null;
    }

    static async deleteArticle(request, title) {
        const articleSlug = await this.getArticleSlugByTitle(request, title);
        if (!articleSlug) {
            throw new Error(`Article with title "${title}" not found.`);
        }

        const response = await request.delete(
            API_URLs.article.replace('{articleSlug}', articleSlug)
        );

        expect(response.status()).toBe(204);
    }
}