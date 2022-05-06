import {test,expect} from '@playwright/test'
import{HomePage} from '../../page-objects/HomePage'
import{LoginPage} from '../../page-objects/LoginPage'

test.describe('Currency exhange test',()=>{
    let loginPage: LoginPage
    let homePage: HomePage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')       
    })

    test('Should buy new currency',async ({page}) => {
        await page.click('#pay_bills_tab')
        await page.click("//a[contains(text(),'Purchase Foreign Currency')]")
        await page.selectOption('#pc_currency','EUR')
        await page.waitForSelector('#sp_sell_rate')
        await page.type('#pc_amount','500')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')

        const conversionAmount = await page.locator('#pc_conversion_amount')
        await expect(conversionAmount).toBeVisible()
        await expect(conversionAmount).toContainText('500.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')

        const successMessage = await page.locator('#alert_content')
        await expect(successMessage).toBeVisible()
        await expect(successMessage).toContainText('Foreign currency cash was successfully purchased.')

        
    })
})