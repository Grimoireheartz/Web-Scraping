const puppeteer = require("puppeteer");
const { hostname } = require('os');
const path = require('path');
var mysql = require('mysql');
const { Console } = require("console");

const scapeinfiniscroll = async (page, itemTargetCount) => {
    let items = [];
    while ((itemTargetCount - 1) >= items.length) {
        // console.log("Count before=>"+items.length);

        items = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll("#resultItems > div > div"));
            return items.map((item) => item.innerText);
        });

        previousHeight = await page.evaluate("document.body.scrollHeight");
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(items.length);

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
    await page.click(".credentials_input_submit", { waitUntil: 'load', timeout: 100000 });
    await page.authenticate({ username: 'external\exsuyat1', password: 'Donut5821270015' });



    let currentDate = new Date().toLocaleDateString();
    console.log(currentDate);
    let endDate = new Date(); // กำหนดวันที่เป็นวันปัจจุบัน
    let days = 7; // กำหนดจำนวนวันที่ต้องการวนลูป


    for (let x = 1; x < days; x++) {

        if (x <= 1) {
            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Utilization/Driver?menu=Utilization');
            await page.focus('#fromDate');
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await page.type('#fromDate', currentDate, { delay: 50 })

            await page.focus('#endDate');
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await page.type('#endDate', currentDate, { delay: 50 })
            await page.click('#SiteSelectorAction', { delay: 50 })
            await page.click('#selectAllSites', { delay: 50 })
            await page.click('.dimmedCaption', { delay: 50 })
            await page.click('#searchButton', { delay: 50 })
            await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');
        }

        if (x > 1) {
            endDate.setDate(endDate.getDate() - 1); // ลดวันที่ลง 1 วัน
            console.log(endDate.toLocaleDateString());
            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Utilization/Driver?menu=Utilization');
            await page.focus('#fromDate');
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await page.type('#fromDate', endDate.toLocaleDateString(), { delay: 50 })

            await page.focus('#endDate');
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');
            await page.type('#endDate', endDate.toLocaleDateString(), { delay: 50 })
            await page.click('#SiteSelectorAction', { delay: 50 })
            await page.click('#selectAllSites', { delay: 50 })
            await page.click('.dimmedCaption', { delay: 50 })
            await page.click('#searchButton', { delay: 50 })
            await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');

        }

        let element_total = await page.waitForSelector(`#totalsummary_Drivers > span.total-summary__summary-item-value`)
        let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
        text_total = parseInt(text_total)
        console.log('Total=>' + text_total)



        let countitemflesh = 0;
        let countdata = 0;

        var Driver = [];
        var ExpectedHours = [];
        var OpTime = [];
        var Utilization = [];
        var HighShocks = [];
        var Site = [];
        var City = [];


        await scapeinfiniscroll(page, text_total)
        while (countdata <= text_total) {
            countitemflesh++;
            for (let i = 1; i <= 20; i++) {
                countdata++;
                console.log("count=>" + countitemflesh);
                console.log(countdata)
                if (countdata <= text_total) {
                    if (countdata <= 20) {
                        let element_Driver = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column260.first-column > span > a`, { timeout: 1000 })
                        Driver[i] = await page.evaluate(element_Driver => element_Driver.textContent, element_Driver)


                        let element_ExpectedHours = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(2) > span`, { timeout: 1000 })
                        ExpectedHours[i] = await page.evaluate(element_ExpectedHours => element_ExpectedHours.textContent, element_ExpectedHours)


                        let element_OpTime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(3) > span > a`, { timeout: 1000 })
                        OpTime[i] = await page.evaluate(element_OpTime => element_OpTime.textContent, element_OpTime)


                        let elemant_Utilization = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(4) > span`, { timeout: 1000 })
                        Utilization[i] = await page.evaluate(elemant_Utilization => elemant_Utilization.textContent, elemant_Utilization)


                        let elemant_HighShocks = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(5) > span`, { timeout: 1000 })
                        HighShocks[i] = await page.evaluate(elemant_HighShocks => elemant_HighShocks.textContent, elemant_HighShocks)


                        let element_Site = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 1000 })
                        Site[i] = await page.evaluate(element_Site => element_Site.textContent, element_Site)
                        Site[i] = Site[i].replace(/\s/g, '');
                        Site[i] = Site[i].replace('Site:', '');


                        let element_City = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 1000 })
                        City[i] = await page.evaluate(element_City => element_City.textContent, element_City)
                        City[i] = City[i].replace(/\s/g, '');
                        City[i] = City[i].replace('City:', '');

                        console.log("countdatai===>" + i);
                        console.log(Driver[i]);
                        console.log(Site[i]);

                    }

                    else if (countdata > 20) {
                        try {
                            let element_Driver = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column260.first-column > span > a`, { timeout: 1000 })
                            Driver[countdata] = await page.evaluate(element_Driver => element_Driver.textContent, element_Driver)
                            // console.log(Driver[countdata]);


                            let element_ExpectedHours = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(2) > span`, { timeout: 1000 })
                            ExpectedHours[countdata] = await page.evaluate(element_ExpectedHours => element_ExpectedHours.textContent, element_ExpectedHours)
                            // console.log(ExpectedHours[countdata]);

                            let element_OpTime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(3) > span > a`, { timeout: 1000 })
                            OpTime[countdata] = await page.evaluate(element_OpTime => element_OpTime.textContent, element_OpTime)
                            // console.log(OpTime[countdata]);

                            let elemant_Utilization = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(4) > span`, { timeout: 1000 })
                            Utilization[countdata] = await page.evaluate(elemant_Utilization => elemant_Utilization.textContent, elemant_Utilization)
                            // console.log(Utilization[countdata]);

                            let elemant_HighShocks = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(5) > span > a`, { timeout: 1000 })
                            HighShocks[countdata] = await page.evaluate(elemant_HighShocks => elemant_HighShocks.textContent, elemant_HighShocks)
                            // console.log(HighShocks[countdata]);

                            let element_Site = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 1000 })
                            Site[countdata] = await page.evaluate(element_Site => element_Site.textContent, element_Site)
                            Site[countdata] = Site[countdata].replace(/\s/g, '');
                            Site[countdata] = Site[countdata].replace('Site:', '');
                            // console.log(Site[countdata]);

                            let element_City = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 1000 })
                            City[countdata] = await page.evaluate(element_City => element_City.textContent, element_City)
                            City[countdata] = City[countdata].replace(/\s/g, '');
                            City[countdata] = City[countdata].replace('City:', '');
                            // console.log(City[countdata]);

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


        var con = mysql.createConnection({
            host: "localhost",
            user: "supanut",
            password: "donut31880",
            database: "test01",
        });


        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            let countdata = 0;
            // console.log(Driver);
            // console.log(ExpectedHours);
            // console.log(OpTime);
            // console.log(Utilization);
            // console.log(HighShocks);
            // console.log(Site);
            // console.log(City);
            while (countdata <= text_total) {
                countdata++;
                if (countdata <= 20) {
                    var sql = `INSERT INTO driveut (Driver, ExpectedHours,OpTime,Utilization,HighShocks,Site,City) VALUES ('${Driver[countdata]}', '${ExpectedHours[countdata]}','${OpTime[countdata]}','${Utilization[countdata]}','${HighShocks[countdata]}','${Site[countdata]}','${City[countdata]}')`;
                }
                else if (countdata > 20) {
                    var sql = `INSERT INTO driveut (Driver, ExpectedHours,OpTime,Utilization,HighShocks,Site,City) VALUES ('${Driver[countdata]}', '${ExpectedHours[countdata]}','${OpTime[countdata]}','${Utilization[countdata]}','${HighShocks[countdata]}','${Site[countdata]}','${City[countdata]}')`;
                }
                con.query(sql, function (err, result) {
                    if (err) throw err;
                });
            }

        });

    }
})

    ();



