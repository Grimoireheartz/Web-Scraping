const puppeteer = require("puppeteer");
const { hostname } = require('os');
const path = require('path');
var mysql = require('mysql');
const { Console } = require("console");

const scapeinfiniscroll = async (page, itemTargetCount, referencedate) => {
    let items = [];
    let countitemflesh = 0;
    let countdata = 0;
    let newdata = 0;

    while ((itemTargetCount - 1) >= items.length) {

        previousHeight = await page.evaluate("document.body.scrollHeight");
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await new Promise((resolve) => setTimeout(resolve, 1500)).then((value) => console.log('Scoll ready'));

        items = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll("#resultItems > div > div"));
            return items.map((item) => item.innerText);
        });

        console.log(items.length);

        let element_total = await page.waitForSelector(`#totalsummary_TotalShocks_Short > span.total-summary__summary-item-value`)
        let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
        text_total = parseInt(text_total)



        var Driver = [];
        var TotalShocks = [];
        var HighShocks = [];
        var MediumShocks = [];
        var LowShocks = [];
        var Lockouts = [];
        var optimeandhighshocks = [];
        var site = [];
        var city = [];

        while (countdata < items.length) {
            countitemflesh++;
            for (let i = 1; i <= 20; i++) {
                countdata++;
                if (countdata <= items.length) {
                    if (countdata <= 20) {
                        let element_Driver = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column200.first-column > span > a`, { timeout: 300 })
                        Driver[i] = await page.evaluate(element_Driver => element_Driver.textContent, element_Driver)

                        let element_TotalShocks = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(2) > a`, { timeout: 300 })
                        TotalShocks[i] = await page.evaluate(element_TotalShocks => element_TotalShocks.textContent, element_TotalShocks)

                        let element_HighShocks = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(3)`, { timeout: 300 })
                        HighShocks[i] = await page.evaluate(element_HighShocks => element_HighShocks.textContent, element_HighShocks)

                        let element_MediumShocks = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(4)`, { timeout: 300 })
                        MediumShocks[i] = await page.evaluate(element_MediumShocks => element_MediumShocks.textContent, element_MediumShocks)

                        let element_LowShocks = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(5)`, { timeout: 300 })
                        LowShocks[i] = await page.evaluate(element_LowShocks => element_LowShocks.textContent, element_LowShocks)

                        let element_Lockouts = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(6)`, { timeout: 300 })
                        Lockouts[i] = await page.evaluate(element_Lockouts => element_Lockouts.textContent, element_Lockouts)

                        let element_optimeandhighshocks = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column100`, { timeout: 300 })
                        optimeandhighshocks[i] = await page.evaluate(element_optimeandhighshocks => element_optimeandhighshocks.textContent, element_optimeandhighshocks)

                        let element_site = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 300 })
                        site[i] = await page.evaluate(element_site => element_site.textContentm, element_site)
                        // site[i] = site[i].replace(/\s/g, '');
                        // site[i] = site[i].replace('Site:', '');

                        let element_city = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 300 })
                        city[i] = await page.evaluate(element_city => element_city.textContent, element_city)
                        city[i] = city[i].replace(/\s/g, '');
                        city[i] = city[i].replace('City:', '');



                    }
                    else if (countdata > 20) {
                        try {
                            let element_Driver = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column200.first-column > span > a`, { timeout: 300 })
                            Driver[countdata] = await page.evaluate(element_Driver => element_Driver.textContent, element_Driver)

                            let element_TotalShocks = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(2) > a`, { timeout: 300 })
                            TotalShocks[countdata] = await page.evaluate(element_TotalShocks => element_TotalShocks.textContent, element_TotalShocks)

                            let element_HighShocks = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(3)`, { timeout: 300 })
                            HighShocks[countdata] = await page.evaluate(element_HighShocks => element_HighShocks.textContent, element_HighShocks)

                            let element_MediumShocks = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(4)`, { timeout: 300 })
                            MediumShocks[countdata] = await page.evaluate(element_MediumShocks => element_MediumShocks.textContent, element_MediumShocks)

                            let element_LowShocks = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(5)`, { timeout: 300 })
                            LowShocks[countdata] = await page.evaluate(element_LowShocks => element_LowShocks.textContent, element_LowShocks)

                            let element_Lockouts = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(6)`, { timeout: 300 })
                            Lockouts[countdata] = await page.evaluate(element_Lockouts => element_Lockouts.textContent, element_Lockouts)

                            let element_optimeandhighshocks = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column100`, { timeout: 300 })
                            optimeandhighshocks[countdata] = await page.evaluate(element_optimeandhighshocks => element_optimeandhighshocks.textContent, element_optimeandhighshocks)

                            let element_site = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 300 })
                            site[countdata] = await page.evaluate(element_site => element_site.textContentm, element_site)
                            site[countdata] = site[countdata].replace(/\s/g, '');
                            site[countdata] = site[countdata].replace('Site:', '');

                            let element_city = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 300 })
                            city[countdata] = await page.evaluate(element_city => element_city.textContent, element_city)
                            city[countdata] = city[countdata].replace(/\s/g, '');
                            city[countdata] = city[countdata].replace('City:', '');


                        } catch (error) {
                            continue;
                        }

                    }
                }
                else {
                    console.log("Get data over")
                }
            }
        }

        let DriverData = '';
        let TotalShocksData = '';
        let HighShocksData = '';
        let MediumShocksData = '';
        let LowShocksData = '';
        let LockoutsData = '';
        let optimeandhighshocksData = '';
        let siteData = '';
        let cityData = '';
        let insertdateData = '';
        let itemslengthData = '';

        while (newdata < items.length) {

            // console.log("This pass is clear !");
            newdata++;

            DriverData += Driver[newdata] + ',';
            TotalShocksData += TotalShocks[newdata] + ',';
            HighShocksData += HighShocks[newdata] + ',';
            MediumShocksData += MediumShocks[newdata] + ',';
            LowShocksData += LowShocks[newdata] + ',';
            LockoutsData += Lockouts[newdata] + ',';
            optimeandhighshocksData += optimeandhighshocks[newdata] + ',';
            siteData += site[newdata] + ',';
            cityData += city[newdata] + ',';
            insertdateData += referencedate + ',';
            itemslengthData += items.length + ',';

        }

        var request = require('request');

        request.post(
            'https://www.btmexpertsales.com/btconnect_dbapi/isite_datacenter_project/drivershocks_receive_isite.php',
            {
                json: {
                    Driver: DriverData,
                    TotalShocks: TotalShocksData,
                    HighShocks: HighShocksData,
                    MediumShocks: MediumShocksData,
                    LowShocks: LowShocksData,
                    Lockouts: LockoutsData,
                    optimeandhighshocks: optimeandhighshocksData,
                    site: siteData,
                    city: cityData,
                    insertdata: insertdateData,
                    itemslength: itemslengthData,

                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                }
            }
        );



    }
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
    await page.type("#label_input_1", "exsuyat1", { delay: 100 });
    await page.type("#label_input_2", "Donut5821270015", { delay: 100 });
    await page.click(".credentials_input_submit", { waitUntil: 'load', timeout: 3000 });
    await page.authenticate({ username: 'external\exsuyat1', password: 'Donut5821270015' });


    let currentDate = new Date();
    let inputDate = currentDate;

    console.log(currentDate.toLocaleDateString());
    console.log(currentDate.toString());
    console.log(inputDate.toLocaleDateString());



    let days = 3;


    for (let x = 1; x < days; x++) {

        if (x <= 1) {

            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Shocks/Drivers?menu=Shocks');
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
            await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');
        }

        else if (x > 1) {


            inputDate.setDate(inputDate.getDate() - 1);



            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Shocks/Drivers?menu=Shocks');
            await page.focus('#fromDate');
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await page.type('#fromDate', inputDate.toLocaleDateString(), { delay: 50 })

            await page.focus('#endDate');
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await page.type('#endDate', inputDate.toLocaleDateString(), { delay: 50 })
            await page.click('#SiteSelectorAction', { delay: 50 })
            await page.click('#selectAllSites', { delay: 50 })
            await page.click('.dimmedCaption', { delay: 50 })
            await page.click('#searchButton', { delay: 50 })
            await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');

        }

        let element_total = await page.waitForSelector(`#totalsummary_TotalShocks_Short > span.total-summary__summary-item-value`)
        let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
        text_total = parseInt(text_total)
        console.log('Total=>' + text_total)


        await scapeinfiniscroll(page, text_total, inputDate.toLocaleDateString())

    }
})
    ();