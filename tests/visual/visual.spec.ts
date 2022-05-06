import {test,expect} from '@playwright/test'

test.describe.only("Visual Regression Testing Example", () => {
    test("Full Page Snapshot",async ({page}) => {
        await page.goto('https://www.techuntold.com/')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test("Single Element snapshot", async ({page})=>{
        await page.goto('https://www.techuntold.com')
        const pageElement = await page.$('.wp-show-posts-entry-header')
        expect(await pageElement.screenshot()).toMatchSnapshot('page-article.png')
    })
})