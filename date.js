const puppeteer = require("puppeteer");
const { hostname } = require('os');
const path = require('path');
var mysql = require('mysql');
const { Console } = require("console");

const scapeinfiniscroll = async (page, itemTargetCount) => {
    let items = [];
    while ((itemTargetCount - 1) >= items.length) {

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

    let currentDate = new Date();
    console.log(currentDate.toLocaleDateString());
    let days = 3;

    for (let x = 1; x < days; x++) {

        if (x <= 1) {
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
            await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');
        }

        if (x > 1) {
            currentDate.setDate(currentDate.getDate() - 1);
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
            await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');

        }

        let element_total = await page.waitForSelector(`#totalsummary_Machines > span.total-summary__summary-item-value`)
        let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
        text_total = parseInt(text_total)
        console.log('Total=>' + text_total)


        let countitemflesh = 0;
        let countdata = 0;

        var text_cusSite = [];
        var SerialMachine = [];
        var OperatingTime = [];
        var Utilization = [];
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
                        let element_cusSite = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 1000 })
                        text_cusSite[i] = await page.evaluate(element_cusSite => element_cusSite.textContent, element_cusSite)
                        text_cusSite[i] = text_cusSite[i].replace(/\s/g, '');
                        text_cusSite[i] = text_cusSite[i].replace('Site:', '');

                        let element_SerialMachine = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span > a`, { timeout: 1000 })
                        SerialMachine[i] = await page.evaluate(element_SerialMachine => element_SerialMachine.textContent, element_SerialMachine)

                        let element_OperatingTime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column100 > span > a`, { timeout: 1000 })
                        OperatingTime[i] = await page.evaluate(element_OperatingTime => element_OperatingTime.textContent, element_OperatingTime)

                        let elemant_Utilization = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div:nth-child(5) > span`, { timeout: 1000 })
                        Utilization[i] = await page.evaluate(elemant_Utilization => elemant_Utilization.textContent, elemant_Utilization)

                        let element_City = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 1000 })
                        City[i] = await page.evaluate(element_City => element_City.textContent, element_City)
                        City[i] = City[i].replace(/\s/g, '');
                        City[i] = City[i].replace('City:', '');

                        console.log(currentDate.toLocaleString());
                    }

                    else if (countdata > 20) {
                        try {
                            let element_cusSite = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 1000 })
                            text_cusSite[countdata] = await page.evaluate(element_cusSite => element_cusSite.textContent, element_cusSite)
                            text_cusSite[countdata] = text_cusSite[countdata].replace(/\s/g, '');
                            text_cusSite[countdata] = text_cusSite[countdata].replace('Site:', '');
                            // console.log(text_cusSite[countdata]);

                            let element_SerialMachine = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span`, { timeout: 1000 })
                            SerialMachine[countdata] = await page.evaluate(element_SerialMachine => element_SerialMachine.textContent, element_SerialMachine)
                            // console.log(SerialMachine[countdata]);

                            let element_OperatingTime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column100 > span > a`, { timeout: 1000 })
                            OperatingTime[countdata] = await page.evaluate(element_OperatingTime => element_OperatingTime.textContent, element_OperatingTime)
                            // console.log(OperatingTime[countdata]);

                            let elemant_Utilization = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div:nth-child(5) > span`, { timeout: 1000 })
                            Utilization[countdata] = await page.evaluate(elemant_Utilization => elemant_Utilization.textContent, elemant_Utilization)
                            // console.log(Utilization[countdata]);

                            let element_City = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 1000 })
                            City[countdata] = await page.evaluate(element_City => element_City.textContent, element_City)
                            City[countdata] = City[countdata].replace(/\s/g, '');
                            City[countdata] = City[countdata].replace('City:', '');
                            // console.log(City[countdata]);

                            console.log(currentDate.toLocaleString());
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
            con.query("SELECT * FROM userlogin", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                console.log("data get already now!");
            });
            let countdata = 0;
            // var currentDate = new Date();
            // var Last_Update = currentDate;
            while (countdata <= text_total) {
                countdata++;
                if (countdata <= 20) {
                    var sql = `INSERT INTO userlogin (text_cusSite, SerialMachine,OperatingTime,Utilization,City,Last_Update) VALUES ('${text_cusSite[countdata]}', '${SerialMachine[countdata]}','${OperatingTime[countdata]}','${Utilization[countdata]}','${City[countdata]}','${currentDate.toLocaleString()}')`;
                }
                else if (countdata > 20) {
                    var sql = `INSERT INTO userlogin (text_cusSite, SerialMachine,OperatingTime,Utilization,City,Last_Update) VALUES ('${text_cusSite[countdata]}', '${SerialMachine[countdata]}','${OperatingTime[countdata]}','${Utilization[countdata]}','${City[countdata]}','${currentDate.toLocaleString()}')`;
                }
                con.query(sql, function (err, result) {
                    if (err) throw err;
                });
            }
        });

    }
})
    ();



