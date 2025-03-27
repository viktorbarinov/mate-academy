import {LoginApiService} from "./api/loginApiService";

export function createRandomString(length = 5) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function setLocalStorage(page, userData) {
    await page.goto('/', { waitUntil: 'load' });

    await page.evaluate((data) => {
        localStorage.setItem('user', JSON.stringify(data));
    }, userData);
}

async function addAuthCookies(page, token) {
    await page.context().addCookies([{
        name: 'auth',
        value: token,
        domain: 'conduit.mate.academy',
        path: '/',
        httpOnly: false
    }]);
}

export async function setUpLogin(page, request, email, password) {
    const responseBody = LoginApiService.loginViaApi(request, email, password);

    await setLocalStorage(page, {
        bio: null,
        effectiveImage: "https://static.productionready.io/images/smiley-cyrus.jpg",
        image: null,
        username: responseBody.user.username,
        email: responseBody.user.email,
        token: responseBody.user.token
    });

    await addAuthCookies(page, responseBody.user.token);
    await page.reload();
}
