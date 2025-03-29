import {API_URLs} from "../../fixtures/variables/urls";
import {expect} from "@playwright/test";

export class LoginApiService {

    static async loginViaApi(request, email, password) {
        const response = await request.post(API_URLs.login, {
            data: {user: {email, password}}
        });
        expect(response.status()).toBe(200);

        return await response.json();
    }
}