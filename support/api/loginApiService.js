import {API_URLs} from "../../fixtures/variables/urls";

export class LoginApiService {

    static async loginViaApi(request, email, password) {
        const response = await request.post(API_URLs.login, {
            data: {user: {email, password}}
        });

        if (response.status() !== 200) {
            throw new Error(`Login failed with status: ${response.status()}`);
        }

        return response.json();
    }
}