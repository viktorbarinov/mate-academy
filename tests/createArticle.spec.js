// @ts-check
import {expect, test} from '@playwright/test';
import {CreateArticlePage} from "../support/pageObjects/createArticlePage";
import {USERS} from "../fixtures/variables/users";
import {createRandomString, getUserAuthToken, setUpLogin} from "../support/utils";
import {URLs} from "../fixtures/variables/urls";
import {ArticlesApiService} from "../support/api/articlesApiService";
import {MyPosts} from "../support/pageObjects/myPostsPage";
import {ArticlePage} from "../support/pageObjects/articlePage";
import {VALID_ARTICLE_DATA} from "../fixtures/testsData/validArticleData";

let seed;
let articleTitle;
let createdArticleSlug;
let createArticlePage;
let myPostsPage;
let articlePage;

test.describe('verify Article creation', () => {

    test.beforeEach(async ({page, request}) => {
        seed = createRandomString();
        articleTitle = `${VALID_ARTICLE_DATA.title} ${seed}`;
        createArticlePage = new CreateArticlePage(page);

        await setUpLogin(page, request, USERS.regular_user.email, USERS.regular_user.password);
        await createArticlePage.open();
    });

    test('should successfully create Article with only required fields', async ({page}) => {
        await createArticlePage.createArticle({
            title: articleTitle,
            description: VALID_ARTICLE_DATA.description,
            body: VALID_ARTICLE_DATA.body
        });

        createdArticleSlug = await createArticlePage.getArticleSlugAfterCreation(page, articleTitle);

        await expect(page).toHaveURL(URLs.article_page.replace('{slug}', createdArticleSlug));
    });

    test('should successfully create Article with all fields', async ({page}) => {
        await createArticlePage.createArticle({
            title: articleTitle,
            description: VALID_ARTICLE_DATA.description,
            body: VALID_ARTICLE_DATA.body,
            tags: VALID_ARTICLE_DATA.tags
        });

        createdArticleSlug = await createArticlePage.getArticleSlugAfterCreation(page, articleTitle);

        await expect(page).toHaveURL(URLs.article_page.replace('{slug}', createdArticleSlug));
    });

    test.afterEach(async ({page, request}) => {
        const userAuthToken = await getUserAuthToken(page);
        await ArticlesApiService.deleteArticle(request, createdArticleSlug, userAuthToken);
    });
})

test.describe('verify Article data displaying after creation', () => {

    test.beforeEach(async ({page, request}) => {
        seed = createRandomString();
        articleTitle = `${VALID_ARTICLE_DATA.title} ${seed}`;

        createArticlePage = new CreateArticlePage(page);
        myPostsPage = new MyPosts(page);
        articlePage = new ArticlePage(page);

        await setUpLogin(page, request, USERS.regular_user.email, USERS.regular_user.password);

        await createArticlePage.open();
        await createArticlePage.createArticle({
            title: articleTitle,
            description: VALID_ARTICLE_DATA.description,
            body: VALID_ARTICLE_DATA.body,
            tags: VALID_ARTICLE_DATA.tags
        });

        createdArticleSlug = await createArticlePage.getArticleSlugAfterCreation(page, articleTitle);
    });

    test('should display created Article with proper data on "Profile" page', async ({page}) => {
        const articleTitleInfo = `Article title: ${articleTitle}`;
        const articleDescriptionInfo = `Article description: ${VALID_ARTICLE_DATA.description}`;

        await page.goto(URLs.profile_page.replace('{username}', USERS.regular_user.userName));

        await expect(myPostsPage.articleTitleInfo(createdArticleSlug)).toHaveText(articleTitleInfo);
        await expect(myPostsPage.articleDescriptionInfo(createdArticleSlug)).toHaveText(articleDescriptionInfo);
        await myPostsPage.articleTagPill(createdArticleSlug).allTextContents().then((articleTags) => {
            expect(articleTags).toEqual(VALID_ARTICLE_DATA.tags);
        });
    });

    test('should display created Article with proper data on "Article" page', async ({page}) => {
        await page.goto(URLs.article_page.replace('{slug}', createdArticleSlug));

        await expect(articlePage.articleTitleInfo).toHaveText(articleTitle);
        await expect(articlePage.articleBodyInfo).toHaveText(VALID_ARTICLE_DATA.body);
        await articlePage.articleTagPill.allTextContents().then((articleTags) => {
            expect(articleTags).toEqual(VALID_ARTICLE_DATA.tags);
        });
    });

    test.afterEach(async ({page, request}) => {
        const userAuthToken = await getUserAuthToken(page);
        await ArticlesApiService.deleteArticle(request, createdArticleSlug, userAuthToken);
    });

})
