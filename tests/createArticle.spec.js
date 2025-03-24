// @ts-check
import {test} from '@playwright/test';
import {CreateArticlePage} from "../support/pageObjects/createArticlePage";

let createArticlePage;

test.beforeEach(async ({page}) => {
    createArticlePage = new CreateArticlePage(page)
    await createArticlePage.open()
});

test('should successfully create Article with only required fields', async () => {
    await createArticlePage.createArticle({
        title: 'Default Article Title',
        description: 'Default Article Description',
        body: 'Default Article Body'
    })

});

test('should successfully create Article with all fields', async () => {
    await createArticlePage.createArticle({
        title: 'Default Article Title',
        description: 'Default Article Description',
        body: 'Default Article Body',
        tags: ['tag1', 'tag2']
    })

});
