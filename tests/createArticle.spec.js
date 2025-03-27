// @ts-check
import {expect, test} from '@playwright/test';
import {CreateArticlePage} from "../support/pageObjects/createArticlePage";
import {USERS} from "../fixtures/variables/users";
import {createRandomString, setUpLogin} from "../support/utils";
import {ArticlesApiService} from "../support/api/articlesApiService";
import {URLs} from "../fixtures/variables/urls";
import {MyPosts} from "../support/pageObjects/myPostsPage";

const articleData = {
    title: 'Default Title',
    description: 'Default Description',
    body: 'Default Body',
    tags: ['tag1', 'tag2']
}

test.beforeAll(async ({page}) => {
    await setUpLogin(page, request, USERS.regular_user.email, USERS.regular_user.password)
})

test.describe('verify Article creation', () => {

    let request;
    let createArticlePage;
    let seed;
    let articleTitle;

    test.beforeEach(async ({page, request: apiRequest}) => {
        seed = createRandomString()
        articleTitle = `${articleData.title} ${seed}`;
        request = apiRequest;
        createArticlePage = new CreateArticlePage(page)

        await createArticlePage.open()
    });

    test('should successfully create Article with only required fields', async () => {
        await createArticlePage.createArticle({
            title: articleTitle,
            description: articleData.description,
            body: articleData.body
        })
    });

    test('should successfully create Article with all fields', async () => {
        await createArticlePage.createArticle({
            title: articleTitle,
            description: articleData.description,
            body: articleData.body,
            tags: articleData.tags
        })
    });

    test.afterEach(async () => {
        try {
            await ArticlesApiService.deleteArticle(request, articleTitle);
        } catch (error) {
            console.warn(`Failed to delete article: ${error.message}`);
        }
    })
})

test.describe('verify Article displaying and data', () => {

    const titleLabel = 'Article title: ';
    const descriptionLabel = 'Article description: ';

    let request;
    let createArticlePage;
    let myPosts;
    let seed;
    let articleTitle;

    test.beforeAll(async ({page, request: apiRequest}) => {
        seed = createRandomString()
        articleTitle = `${articleData.title} ${seed}`;
        request = apiRequest;
        createArticlePage = new CreateArticlePage(page)
        myPosts = new MyPosts(page)

        await createArticlePage.open()

        await createArticlePage.createArticle({
            title: articleTitle,
            description: articleData.description,
            body: articleData.body,
            tags: articleData.tags
        })
    });

    test('should display created Article with proper data on "Profile" page', async ({page}) => {
        const articleTitleInfo = titleLabel + articleTitle;
        const articleDescriptionInfo = descriptionLabel + articleData.description;

        const slug = await ArticlesApiService.getArticleSlugByTitle(request, articleTitle)

        await page.goto(URLs.profilePage.replace('{username}', USERS.regular_user.userName))

        await expect(myPosts.articleTitleInfo.replace('{slug}', slug)).toHaveText(articleTitleInfo);
        await expect(myPosts.articleDescriptionInfo.replace('{slug}', slug)).toHaveText(articleDescriptionInfo);
    });

})
