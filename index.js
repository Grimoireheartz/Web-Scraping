const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://toyota-isite.eu/");

    await page.waitForSelector("#label_input_1");
    await page.type("#label_input_1", "exsuyat1", { delay: 100 });
    await page.type("#label_input_2", "Donut5821270015", { delay: 100 });
    await page.click(".credentials_input_submit",{ waitUntil: 'load', timeout: 100000 });
    // await page.authenticate({ username: 'external\exsuyat1', password: 'Donut5821270015' });
    // await page.waitForSelector('body > header > div > div.menu-bar')
    // await page.goto('https://toyota-isite.eu/Utilization/Index?menu=Utilization');
    
    

    // await browser.close();

})();


































