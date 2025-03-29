import {expect} from "@playwright/test";
import {API_URLs} from "../../fixtures/variables/urls";

export class ArticlesApiService {

    static async deleteArticle(request, articleSlug, userAuthToken) {
        const response = await request.delete(
            API_URLs.article.replace('{articleSlug}', articleSlug), {headers: {Authorization: `Bearer ${userAuthToken}`}}
        );

        expect(response.status()).toBe(204);
    }
}