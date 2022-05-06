import{test,expect} from '@playwright/test'
import{getRandomNumber,getRandomString} from '../../utils/data-helpers'

test.describe.only("Tips & Tricks section", ()=>{
    test.only("Test Info Object",async ({page}, testInfo) => {
        await page.goto('http://www.example.com')
        let newNumber = await getRandomNumber()
        console.log(newNumber)
        let newString = await getRandomString()
        console.log(newString)
    })

    test("Test skip browser",async ({page, browserName}) => {
        test.skip(browserName === 'chromium', "Feature not ready in chrome browser")
        await page.goto('http://www.example.com')
        
    })

    test("Test Fixme Annotation",async ({page, browserName}) => {
        test.fixme(browserName === 'chromium', "Test is not stable, needs revision")
        await page.goto('http://www.example.com')      
    })

    //parameterized tests
    const people=['Minhaj' , 'Arshi' , 'Juveria','Kashif','Qayam']
    for(const name of people) {
        test(`Running test for ${name}`,async ({page}) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type('#searchTerm',`${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test("Mouse movement simulation",async ({page}) => {
        await page.goto("http://www.example.com")
        await page.mouse.move(0,0)
        await page.mouse.down()
        await page.mouse.move(0,100)
        await page.mouse.up()
        
    })

    test("Multiple browser tabs inside 1 Browser",async ({browser}) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto("https://www.example.com")
        await page2.goto("https://www.example.com")
        await page3.goto("https://www.example.com")

        await page1.waitForTimeout(5000)
        
    })

    //npx playwright pdf wikipedia.org wiki.pdf
    //npx playwright open --device="iphone11 Pro" wikipedia.org
    //npx playwright screenshot --device="iphone11 Pro" --color-scheme=dark
    // --wait-for-timeout=3000 twitter.com twitter-iphone-image.png
})
