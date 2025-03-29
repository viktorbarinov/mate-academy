import {LoginApiService} from "./api/loginApiService";

export function createRandomString(length = 5) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function setUserIntoLocalStorage(page, userData) {
    await page.goto('/', { waitUntil: 'load' });

    await page.evaluate((data) => {
        localStorage.setItem('user', JSON.stringify(data));
    }, userData);
}

async function addUserAuthCookies(page, token) {
    await page.context().addCookies([{
        name: 'auth',
        value: token,
        domain: 'conduit.mate.academy',
        path: '/',
        httpOnly: false
    }]);
}

export async function setUpLogin(page, request, email, password) {
    const responseBody = await LoginApiService.loginViaApi(request, email, password);

    await setUserIntoLocalStorage(page, {
        bio: null,
        effectiveImage: "https://static.productionready.io/images/smiley-cyrus.jpg",
        image: null,
        username: responseBody.user.username,
        email: responseBody.user.email,
        token: responseBody.user.token
    });

    await addUserAuthCookies(page, responseBody.user.token);
    await page.reload();
}

export async function getUserAuthToken(page) {
    const cookies = await page.context().cookies();
    const authCookie = cookies.find(cookie => cookie.name === 'auth');
    return authCookie ? authCookie.value : null;
}
