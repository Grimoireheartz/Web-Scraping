const puppeteer = require("puppeteer");
const { hostname } = require('os');
const path = require('path');
var mysql = require('mysql');
const { Console } = require("console");


async function autoScroll(page) {
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
    let newdate = new Date();
    console.log(currentDate.toLocaleDateString());
    let days = 2;

    for (let x = 1; x < days; x++) {

        if (x <= 1) {
            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Activity/Machines?menu=Utilization');
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
        }

        else if (x > 1) {

            currentDate.setDate(currentDate.getDate() - 1);
            console.log(currentDate.toLocaleDateString());
            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Activity/Machines?menu=Utilization');
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
        }

        let countitemflesh = 0;
        let countdata = 0;

        var serialmachine = [];
        var fromtime = [];
        var totime = [];
        var keytime = [];
        var drivetime = [];
        var lifttime = [];
        var optime = [];
        var opratio = [];


        await autoScroll(page);
        console.log("Sequence ======= " + page);
        console.log("Finish to Search data ! ");


        for (let i = 1; i <= 20; i++) {
            countitemflesh++;
            countdata++;
            console.log("CountData ===>" + countdata);
            if (countdata <= 20) {
                console.log("This way is clear ! ");
                let element_serialmachine = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column120.first-column > span > span > a`, { timeout: 1000 })
                serialmachine[i] = await page.evaluate(element_serialmachine => element_serialmachine.textContent, element_serialmachine)
                console.log(serialmachine[i]);

                let element_fromtime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(3) > span`, { timeout: 1000 })
                fromtime[i] = await page.evaluate(element_fromtime => element_fromtime.textContent, element_fromtime)
                console.log(fromtime[i]);

                let element_totime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(4) > span`, { timeout: 1000 })
                totime[i] = await page.evaluate(element_totime => element_totime.textContent, element_totime)
                console.log(totime[i]);

                let element_keytime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(5) > span`, { timeout: 1000 })
                keytime[i] = await page.evaluate(element_keytime => element_keytime.textContent, element_keytime)
                console.log(keytime[i]);

                let element_drivetime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(6) > span`, { timeout: 1000 })
                drivetime[i] = await page.evaluate(element_drivetime => element_drivetime.textContent, element_drivetime)
                console.log(drivetime[i]);

                let element_lifttime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(7) > span`, { timeout: 1000 })
                lifttime[i] = await page.evaluate(element_lifttime => element_lifttime.textContent, element_lifttime)
                console.log(lifttime[i]);

                let element_optime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(8) > span`, { timeout: 1000 })
                optime[i] = await page.evaluate(element_optime => element_optime.textContent, element_optime)
                console.log(optime[i]);

                let element_opratio = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(9) > span`, { timeout: 1000 })
                opratio[i] = await page.evaluate(element_opratio => element_opratio.textContent, element_opratio)
                console.log(opratio[i]);

                console.log(currentDate.toLocaleDateString());
            }
            else if (countdata > 20) {
                try {
                let element_serialmachine = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column120.first-column > span > span > a`, { timeout: 1000 })
                serialmachine[countdata] = await page.evaluate(element_serialmachine => element_serialmachine.textContent, element_serialmachine)

                let element_fromtime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(3) > span`, { timeout: 1000 })
                fromtime[countdata] = await page.evaluate(element_fromtime => element_fromtime.textContent, element_fromtime)

                let element_totime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(4) > span`, { timeout: 1000 })
                totime[countdata] = await page.evaluate(element_totime => element_totime.textContent, element_totime)

                let element_keytime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(5) > span`, { timeout: 1000 })
                keytime[countdata] = await page.evaluate(element_keytime => element_keytime.textContent, element_keytime)

                let element_drivetime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(6) > span`, { timeout: 1000 })
                drivetime[countdata] = await page.evaluate(element_drivetime => element_drivetime.textContent, element_drivetime)

                let element_lifttime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(7) > span`, { timeout: 1000 })
                lifttime[countdata] = await page.evaluate(element_lifttime => element_lifttime.textContent, element_lifttime)

                let element_optime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(8) > span`, { timeout: 1000 })
                optime[countdata] = await page.evaluate(element_optime => element_optime.textContent, element_optime)

                let element_opratio = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(9) > span`, { timeout: 1000 })
                opratio[countdata] = await page.evaluate(element_opratio => element_opratio.textContent, element_opratio)
                } catch (error) {
                    continue;
                }          
            }

        }

        var con = mysql.createConnection({
            host: "localhost",
            user: "supanut",
            password: "donut31880",
            database: "test01",
        });
        await con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            console.log("CurrentDate Insert to database =====>" + newdate.toLocaleString());

            con.query("SELECT * FROM machine_activity", function (err, result, fields) {
                if (err) throw err;
                // console.log(result);
                console.log("data get already now!");
            });

            let countdata = 0;
            // while (countdata <= text_total) {
                countdata++;
                if (countdata <= 20) {
                    var sql = `INSERT INTO machine_activity (serialmachine, fromtime,totime,keytime,drivetime,lifttime,optime,opratio,Last_Update) VALUES ('${serialmachine[countdata]}', '${fromtime[countdata]}','${totime[countdata]}','${keytime[countdata]}','${drivetime[countdata]}','${lifttime[countdata]}','${optime[countdata]}','${opratio[countdata]}','${newdate.toLocaleString()}')`;
                }
                else if (countdata > 20) {
                    var sql = `INSERT INTO machine_activity (serialmachine, fromtime,totime,keytime,drivetime,lifttime,optime,opratio,Last_Update) VALUES ('${serialmachine[countdata]}', '${fromtime[countdata]}','${totime[countdata]}','${keytime[countdata]}','${drivetime[countdata]}','${lifttime[countdata]}','${optime[countdata]}','${opratio[countdata]}','${newdate.toLocaleString()}')`;
                }
                con.query(sql, function (err, result) {
                    if (err) throw err;
                }); 
                // continue;

            // }
            newdate.setDate(newdate.getDate() - 1);
        });
    }

})

    ();






