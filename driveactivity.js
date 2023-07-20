const { hostname } = require('os');
const path = require('path');
const puppeteer = require('puppeteer')

const scapeinfiniscroll = async (page, referencedate) => {
    let items = [];
    let countitemflesh = 0;
    let countdata = 0;
    let newdata = 0;
    while (1) {

        previousHeight = await page.evaluate("document.body.scrollHeight");
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        items = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll("#resultItems > div > div"));
            return items.map((item) => item.innerText);
        });
        console.log(items.length);

        var driver = [];
        var fromtime = [];
        var totime = [];
        var keytime = [];
        var drivetime = [];
        var lifttime = [];
        var optime = [];
        var opratio = [];
        var logoffMethod = [];
        var serialmachine = [];
        var machinefamily = [];
        var model = [];

        while (countdata < items.length) {
            countitemflesh++;
            for (let i = 1; i <= 20; i++) {
                countdata++;
                if (countdata <= items.length) {
                    if (countdata <= 20) {
                        let element_driver = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column120.first-column > span > a`, { timeout: 1000 })
                        driver[i] = await page.evaluate(element_driver => element_driver.textContent, element_driver)
                        console.log(driver[i]);

                        let element_fromtime = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 1000 })
                        fromtime[i] = await page.evaluate(element_fromtime => element_fromtime.textContent, element_fromtime)
                        fromtime[i] = fromtime[i].replace(/\s/g, '');
                        fromtime[i] = fromtime[i].replace('FromDate:', '');
                        fromtime[i] = fromtime[i].split("/")[0] + '/' + fromtime[i].split("/")[1] + '/' + fromtime[i].split("/")[2].slice(0, 4) + ' ' + fromtime[i].split("/")[2].slice(4);
                        console.log(fromtime[i]);

                        let element_totime = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(2)`, { timeout: 1000 })
                        totime[i] = await page.evaluate(element_totime => element_totime.textContent, element_totime)
                        totime[i] = totime[i].replace(/\s/g, '');
                        totime[i] = totime[i].replace('ToDate:', '');
                        totime[i] = totime[i].split("/")[0] + '/' + totime[i].split("/")[1] + '/' + totime[i].split("/")[2].slice(0, 4) + ' ' + totime[i].split("/")[2].slice(4);
                        console.log(totime[i]);

                        let element_keytime = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(4) > span`, { timeout: 1000 })
                        keytime[i] = await page.evaluate(element_keytime => element_keytime.textContent, element_keytime)
                        console.log(keytime[i]);

                        let element_drivetime = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(5) > span`, { timeout: 1000 })
                        drivetime[i] = await page.evaluate(element_drivetime => element_drivetime.textContent, element_drivetime)
                        console.log(drivetime[i]);

                        let element_lifttime = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(6) > span`, { timeout: 1000 })
                        lifttime[i] = await page.evaluate(element_lifttime => element_lifttime.textContent, element_lifttime)
                        console.log(lifttime[i]);

                        let element_optime = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(7) > span`, { timeout: 1000 })
                        optime[i] = await page.evaluate(element_optime => element_optime.textContent, element_optime)
                        console.log(optime[i]);

                        let element_opratio = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(8) > span`, { timeout: 1000 })
                        opratio[i] = await page.evaluate(element_opratio => element_opratio.textContent, element_opratio)
                        console.log(opratio[i]);

                        let element_logoffMethod = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 1000 })
                        logoffMethod[i] = await page.evaluate(element_logoffMethod => element_logoffMethod.textContent, element_logoffMethod)
                        logoffMethod[i] = logoffMethod[i].replace(/\s/g, '');
                        logoffMethod[i] = logoffMethod[i].replace('LogoffMethod:', '');
                        console.log(logoffMethod[i]);

                        let element_serialmachine = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(5)`, { timeout: 1000 })
                        serialmachine[i] = await page.evaluate(element_serialmachine => element_serialmachine.textContent, element_serialmachine)
                        serialmachine[i] = serialmachine[i].replace(/\s/g, '');
                        serialmachine[i] = serialmachine[i].replace('Machine:', '');
                        console.log(serialmachine[i]);

                        let element_machinefamily = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(8)`, { timeout: 1000 })
                        machinefamily[i] = await page.evaluate(element_machinefamily => element_machinefamily.textContent, element_machinefamily)
                        machinefamily[i] = machinefamily[i].replace(/\s/g, '');
                        machinefamily[i] = machinefamily[i].replace('MachineFamily:', '');
                        console.log(machinefamily[i]);

                        let element_model = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(9)`, { timeout: 1000 })
                        model[i] = await page.evaluate(element_model => element_model.textContent, element_model)
                        model[i] = model[i].replace(/\s/g, '');
                        model[i] = model[i].replace('Model:', '');
                        console.log(model[i]);






                    }
                    else if (countdata > 20) {
                        try {
                            let element_driver = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div.column120.first-column > span > a`, { timeout: 1000 })
                            driver[countdata] = await page.evaluate(element_driver => element_driver.textContent, element_driver)
                            console.log(driver[countdata]);

                            let element_fromtime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 1000 })
                            fromtime[countdata] = await page.evaluate(element_fromtime => element_fromtime.textContent, element_fromtime)
                            fromtime[countdata] = fromtime[countdata].replace(/\s/g, '');
                            fromtime[countdata] = fromtime[countdata].replace('FromDate:', '');
                            fromtime[countdata] = fromtime[countdata].split("/")[0] + '/' + fromtime[countdata].split("/")[1] + '/' + fromtime[countdata].split("/")[2].slice(0, 4) + ' ' + fromtime[countdata].split("/")[2].slice(4);
                            console.log(fromtime[countdata]);

                            let element_totime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(2)`, { timeout: 1000 })
                            totime[countdata] = await page.evaluate(element_totime => element_totime.textContent, element_totime)
                            totime[countdata] = totime[countdata].replace(/\s/g, '');
                            totime[countdata] = totime[countdata].replace('ToDate:', '');
                            totime[countdata] = totime[countdata].split("/")[0] + '/' + totime[countdata].split("/")[1] + '/' + totime[countdata].split("/")[2].slice(0, 4) + ' ' + totime[countdata].split("/")[2].slice(4);
                            console.log(totime[countdata]);

                            let element_keytime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(4) > span`, { timeout: 1000 })
                            keytime[countdata] = await page.evaluate(element_keytime => element_keytime.textContent, element_keytime)
                            console.log(keytime[countdata]);

                            let element_drivetime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(5) > span`, { timeout: 1000 })
                            drivetime[countdata] = await page.evaluate(element_drivetime => element_drivetime.textContent, element_drivetime)
                            console.log(drivetime[countdata]);

                            let element_lifttime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(6) > span`, { timeout: 1000 })
                            lifttime[countdata] = await page.evaluate(element_lifttime => element_lifttime.textContent, element_lifttime)
                            console.log(lifttime[countdata]);

                            let element_optime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(7) > span`, { timeout: 1000 })
                            optime[countdata] = await page.evaluate(element_optime => element_optime.textContent, element_optime)
                            console.log(optime[countdata]);

                            let element_opratio = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.result-row-title > div:nth-child(8) > span`, { timeout: 1000 })
                            opratio[countdata] = await page.evaluate(element_opratio => element_opratio.textContent, element_opratio)
                            console.log(opratio[countdata]);

                            let element_logoffMethod = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 1000 })
                            logoffMethod[countdata] = await page.evaluate(element_logoffMethod => element_logoffMethod.textContent, element_logoffMethod)
                            logoffMethod[countdata] = logoffMethod[countdata].replace(/\s/g, '');
                            logoffMethod[countdata] = logoffMethod[countdata].replace('LogoffMethod:', '');
                            console.log(logoffMethod[countdata]);

                            let element_serialmachine = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(5)`, { timeout: 1000 })
                            serialmachine[countdata] = await page.evaluate(element_serialmachine => element_serialmachine.textContent, element_serialmachine)
                            serialmachine[countdata] = serialmachine[countdata].replace(/\s/g, '');
                            serialmachine[countdata] = serialmachine[countdata].replace('Machine:', '');
                            console.log(serialmachine[countdata]);

                            let element_machinefamily = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(8)`, { timeout: 1000 })
                            machinefamily[countdata] = await page.evaluate(element_machinefamily => element_machinefamily.textContent, element_machinefamily)
                            machinefamily[countdata] = machinefamily[countdata].replace(/\s/g, '');
                            machinefamily[countdata] = machinefamily[countdata].replace('MachineFamily:', '');
                            console.log(machinefamily[countdata]);

                            let element_model = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(9)`, { timeout: 1000 })
                            model[countdata] = await page.evaluate(element_model => element_model.textContent, element_model)
                            model[countdata] = model[countdata].replace(/\s/g, '');
                            model[countdata] = model[countdata].replace('Model:', '');
                            console.log(model[countdata]);



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

        let driverData = '';
        let fromtimeData = '';
        let totimeData = '';
        let keytimeData = '';
        let drivetimeData = '';
        let lifttimeData = '';
        let optimeData = '';
        let opratioData = '';
        let logoffMethodData = '';
        let serialmachineData = '';
        let machinefamilyData = '';
        let modelData = '';
        let insertdateData = '';
        let itemslengthData = '';

        while (newdata < items.length) {
            newdata++;
            driverData += driver[newdata] + ',';
            fromtimeData += fromtime[newdata] + ',';
            totimeData += totime[newdata] + ',';
            keytimeData += keytime[newdata] + ',';
            drivetimeData += drivetime[newdata] + ',';
            lifttimeData += lifttime[newdata] + ',';
            optimeData += optime[newdata] + ',';
            opratioData += opratio[newdata] + ',';
            logoffMethodData += logoffMethod[newdata] + ',';
            serialmachineData += serialmachine[newdata] + ',';
            machinefamilyData += machinefamily[newdata] + ',';
            modelData += model[newdata] + ',';
            insertdateData += referencedate + ',';
            itemslengthData += items.length + ',';

        }
        var request = require('request');

        request.post(
            'https://www.btmexpertsales.com/btconnect_dbapi/isite_datacenter_project/driveractivity_receive_isite.php',
            {
                json: {
                    driver: driverData,
                    fromtime: fromtimeData,
                    totime: totimeData,
                    keytime: keytimeData,
                    drivetime: drivetimeData,
                    lifttime: lifttimeData,
                    optime: optimeData,
                    opratio: opratioData,
                    logoffMethod: logoffMethodData,
                    serialmachine: serialmachineData,
                    machinefamily: machinefamilyData,
                    model: modelData,
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
    await page.click(".credentials_input_submit", { waitUntil: 'load', timeout: 100000 });
    await page.authenticate({ username: 'external\exsuyat1', password: 'Donut5821270015' });


    let currentDate = new Date();
    let inputDate = currentDate;
    // let newdate = new Date();
    console.log(currentDate.toLocaleDateString());
    console.log(currentDate.toString());
    console.log(inputDate.toLocaleDateString());
    // inputDate.setDate(inputDate.getDate() - 1);
    // console.log(inputDate.toLocaleDateString());
    let days = 3;

    for (let x = 2; x < days; x++) {

        if (x <= 1) {
            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Activity/Drivers?menu=Utilization');
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
            // await page.click('#selectAllSites', { delay: 50 })
            await page.click('.dimmedCaption', { delay: 50 })
            await page.click('#searchButton', { delay: 50 })
            // await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');
        }

        else if (x > 1) {

            currentDate.setDate(currentDate.getDate() - 1);
            console.log(currentDate.toLocaleDateString());
            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Activity/Drivers?menu=Utilization');
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
            // await page.click('#selectAllSites', { delay: 50 })
            await page.click('.dimmedCaption', { delay: 50 })
            await page.click('#searchButton', { delay: 50 })
            // await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');
        }




        await scapeinfiniscroll(page, inputDate.toLocaleDateString());


    }

})

    ();























