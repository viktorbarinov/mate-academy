// @ts-check
import {expect, test} from '@playwright/test';
import {SignInPage} from "../support/pageObjects/signInPage";
import {INVALID_USER_CREDENTIALS} from "../fixtures/testsData/invalidUserCredentials";
import {USERS} from "../fixtures/variables/users";
import {URLs} from "../fixtures/variables/urls";

let signInPage;

test.beforeEach(async ({page}) => {
    signInPage = new SignInPage(page)
    await signInPage.open()
});

test('should successfully Sign In with valid credentials', async ({page}) => {
    await signInPage.signIn(USERS.regular_user.email, USERS.regular_user.password)

    await expect(page).toHaveURL('/');
});

Object.values(INVALID_USER_CREDENTIALS).forEach((data) => {
    test(`should show error and prevent Sign In with invalid credentials: ${data.name}`, async ({page}) => {
        await signInPage.signIn(data.email, data.password)

        await expect(page).toHaveURL(URLs.loginPage);
        await expect(signInPage.validationErrorMessage).toHaveText(data.error_message);
    });
})
