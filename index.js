const path = require('path')
const puppeteer = require('puppeteer')
const {TimeoutError} = require('puppeteer/Errors');

async function scrape() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.urbandictionary.com/browse.php?character=A');
    // #ud-root > div > main > div > div.flex.flex-col.lg\:flex-row.mx-0.gap-4 > section > div.bg-white.dark\:bg-yankees.p-5.mb-5.rounded-md > ul > li:nth-child(1) > a
    console.log('hhh')

    let element = await page.waitForSelector('#ud-root > div > main > div > div.flex.flex-col.lg\:flex-row.mx-0.gap-4 > section > div.bg-white.dark\:bg-yankees.p-5.mb-5.rounded-md > ul > li:nth-child(5) > a',{timeout: 30000})
    let text = await page.eveluate(element => element.textContent, element)
    console.log(text)

    //#ud-root > div > main > div > div.flex.flex-col.lg\:flex-row.mx-0.gap-4 > section > div.bg-white.dark\:bg-yankees.p-5.mb-5.rounded-md > ul > li:nth-child(1) > a

    //#ud-root > div > main > div > div.flex.flex-col.lg\:flex-row.mx-0.gap-4 > section > div.bg-white.dark\:bg-yankees.p-5.mb-5.rounded-md > ul > li:nth-child(1)


    browser.close();
}
scrape()