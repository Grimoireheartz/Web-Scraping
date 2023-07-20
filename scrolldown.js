const puppeteer = require("puppeteer");
const { hostname } = require('os');
const path = require('path');
var mysql = require('mysql');
const { Console } = require("console");


async function autoScroll(page){
  await page.evaluate(async () => {
    let scrollPosition = 0
    let documentHeight = document.body.scrollHeight

    while (documentHeight > scrollPosition) {
      window.scrollBy(0, documentHeight)
      await new Promise(resolve => {
        setTimeout(resolve, 2500)
      })
      scrollPosition = documentHeight
      documentHeight = document.body.scrollHeight
    }
  })
}

(async () => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.setRequestInterception(true);
    page.on('request', (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;

        else interceptedRequest.continue();
    });

    await page.goto("https://toyota-isite.eu/");

    await page.waitForSelector("#label_input_1");
    // await page.type("#label_input_1", "extesir1", { delay: 100 });
    // await page.type("#label_input_2", "Te0846374624", { delay: 100 });
    await page.type("#label_input_1", "exsuyat1", { delay: 100 });
    await page.type("#label_input_2", "Donut5821270015", { delay: 100 });
    await page.click(".credentials_input_submit", { waitUntil: 'load', timeout: 100000 });
    await page.authenticate({ username: 'external\exsuyat1', password: 'Donut5821270015' });
    // await page.authenticate({ username: 'external\extesir1', password: 'Te0846374624' });

    let currentDate = new Date();
    console.log(currentDate.toLocaleDateString());

    await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Utilization/Index?menu=Utilization');
            await page.focus('#fromDate');
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await page.type('#fromDate', currentDate.toLocaleDateString(), { delay: 50 })

            await page.focus('#endDate');
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await page.type('#endDate', currentDate.toLocaleDateString(), { delay: 50 })
            await page.click('#SiteSelectorAction', { delay: 50 })
            await page.click('#selectAllSites', { delay: 50 })
            await page.click('.dimmedCaption', { delay: 50 })
            await page.click('#searchButton', { delay: 50 })
            // await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');

            await autoScroll(page);
            console.log("Finish to Search data ! ");





   
})
    ();



// // #searchwaitingicon






