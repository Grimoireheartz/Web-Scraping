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

        // let element_total = await page.waitForSelector(`#totalsummary_TotalShocks_Short > span.total-summary__summary-item-value`)
        // let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
        // text_total = parseInt(text_total)
        // console.log()



        var date = [];
        var driver = [];
        var serialmachine = [];
        var xthreshold = [];
        var ythreshold = [];
        var site = [];
        var city = [];
        var speed = [];
        var bdi = [];
        var fleetnumber = [];
        var tmhfleetnumber = [];
        var machinefamily = [];
        var model = [];
        console.log("start ");
        while (countdata < items.length) {
            console.log("start to get data from isite !");
            countitemflesh++;
            for (let i = 1; i <= 20; i++) {
                countdata++;
                if (countdata <= items.length) {
                    if (countdata <= 20) {
                        let element_date = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[1]/div[3]/span`, { timeout: 1000 })
                        date[i] = await page.evaluate(element_date => element_date.textContent, element_date)
                        console.log(date[i]);

                        let element_driver = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[1]/div[4]/span`, { timeout: 1000 })
                        driver[i] = await page.evaluate(element_driver => element_driver.textContent, element_driver)
                        console.log(driver[i]);

                        let element_serialmachine = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[1]/div[5]/span/a`, { timeout: 1000 })
                        serialmachine[i] = await page.evaluate(element_serialmachine => element_serialmachine.textContent, element_serialmachine)
                        console.log(serialmachine[i]);

                        let element_xthreshold = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[1]/div[6]`, { timeout: 1000 })
                        xthreshold[i] = await page.evaluate(element_xthreshold => element_xthreshold.textContent, element_xthreshold)
                        xthreshold[i] = xthreshold[i].replace(/\s/g, '');
                        console.log(xthreshold[i]);

                        let element_ythreshold = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[1]/div[7]`, { timeout: 1000 })
                        ythreshold[i] = await page.evaluate(element_ythreshold => element_ythreshold.textContent, element_ythreshold)
                        ythreshold[i] = ythreshold[i].replace(/\s/g, '');
                        console.log(ythreshold[i]);

                        let element_site = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[1]`, { timeout: 1000 })
                        site[i] = await page.evaluate(element_site => element_site.textContent, element_site)
                        site[i] = site[i].replace(/\s/g, '');
                        site[i] = site[i].replace('Site:', '');
                        console.log(site[i]);

                        let element_city = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[3]`, { timeout: 1000 })
                        city[i] = await page.evaluate(element_city => element_city.textContent, element_city)
                        city[i] = city[i].replace(/\s/g, '');
                        city[i] = city[i].replace('City:', '');
                        console.log(city[i]);

                        let element_speed = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[9]`, { timeout: 1000 })
                        speed[i] = await page.evaluate(element_speed => element_speed.textContent, element_speed)
                        speed[i] = speed[i].replace(/\s/g, '');
                        speed[i] = speed[i].replace('Speed:', '');
                        console.log(speed[i]);

                        let element_bdi = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[10]`, { timeout: 1000 })
                        bdi[i] = await page.evaluate(element_bdi => element_bdi.textContent, element_bdi)
                        bdi[i] = bdi[i].replace(/\s/g, '');
                        // bdi[i] = bid[i].replace('BDI:', '');
                        console.log(bdi[i]);

                        try {
                            let element_fleetnumber = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[${i}]/div[2]/div[16]`, { timeout: 1000 })
                            fleetnumber[i] = await page.evaluate(element_fleetnumber => element_fleetnumber.textContent, element_fleetnumber)
                            fleetnumber[i] = fleetnumber[i].replace(/\s/g, '');
                            fleetnumber[i] = fleetnumber[i].replace('FleetNumber:', '');
                            console.log(fleetnumber[i]);
                        }
                        catch {
                            let element_fleetnumber = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[1]/div[${i}]/div[2]/div[10]`, { timeout: 1000 })
                            fleetnumber[i] = await page.evaluate(element_fleetnumber => element_fleetnumber.textContent, element_fleetnumber)
                            fleetnumber[i] = fleetnumber[i].replace(/\s/g, '');
                            fleetnumber[i] = fleetnumber[i].replace('FleetNumber:', '');
                            console.log(fleetnumber[i]);
                        }


                        try {
                            let element_tmhfleetnumber = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[17]`, { timeout: 1000 })
                            tmhfleetnumber[i] = await page.evaluate(element_tmhfleetnumber => element_tmhfleetnumber.textContent, element_tmhfleetnumber)
                            tmhfleetnumber[i] = tmhfleetnumber[i].replace(/\s/g, '');
                            tmhfleetnumber[i] = tmhfleetnumber[i].replace('TMHFleetNumber:', '');
                            console.log(tmhfleetnumber[i]);
                        } catch {
                            let element_tmhfleetnumber = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[11]`, { timeout: 1000 })
                            tmhfleetnumber[i] = await page.evaluate(element_tmhfleetnumber => element_tmhfleetnumber.textContent, element_tmhfleetnumber)
                            tmhfleetnumber[i] = tmhfleetnumber[i].replace(/\s/g, '');
                            tmhfleetnumber[i] = tmhfleetnumber[i].replace('TMHFleetNumber:', '');
                            console.log(tmhfleetnumber[i]);
                        }


                        try {
                            let element_machinefamily = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[18]`, { timeout: 1000 })
                            machinefamily[i] = await page.evaluate(element_machinefamily => element_machinefamily.textContent, element_machinefamily)
                            machinefamily[i] = machinefamily[i].replace(/\s/g, '');
                            machinefamily[i] = machinefamily[i].replace('MachineFamily:', '');
                            console.log(machinefamily[i]);
                        } catch {
                            let element_machinefamily = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[12]`, { timeout: 1000 })
                            machinefamily[i] = await page.evaluate(element_machinefamily => element_machinefamily.textContent, element_machinefamily)
                            machinefamily[i] = machinefamily[i].replace(/\s/g, '');
                            machinefamily[i] = machinefamily[i].replace('MachineFamily:', '');
                            console.log(machinefamily[i]);
                        }

                        try {
                            let element_model = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[19]`, { timeout: 1000 })
                            model[i] = await page.evaluate(element_model => element_model.textContent, element_model)
                            model[i] = model[i].replace(/\s/g, '');
                            model[i] = model[i].replace('Model:', '');
                            console.log(model[i]);
                        } catch {
                            let element_model = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div/div[${i}]/div[2]/div[13]`, { timeout: 1000 })
                            model[i] = await page.evaluate(element_model => element_model.textContent, element_model)
                            model[i] = model[i].replace(/\s/g, '');
                            model[i] = model[i].replace('Model:', '');
                            console.log(model[i]);
                        }





                    }
                    else if (countdata > 20) {
                        try {
                            console.log('In counerwerwer loop');

                            let element_date = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[1]/div[3]/span`, { timeout: 1000 })
                            date[countdata] = await page.evaluate(element_date => element_date.textContent, element_date)
                            console.log(date[countdata]);

                            let element_driver = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[1]/div[4]/span`, { timeout: 1000 })
                            driver[countdata] = await page.evaluate(element_driver => element_driver.textContent, element_driver)
                            console.log(driver[countdata]);

                            let element_serialmachine = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[1]/div[5]/span/a`, { timeout: 1000 })
                            serialmachine[countdata] = await page.evaluate(element_serialmachine => element_serialmachine.textContent, element_serialmachine)
                            console.log(serialmachine[countdata]);

                            let element_xthreshold = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[1]/div[6]`, { timeout: 1000 })
                            xthreshold[countdata] = await page.evaluate(element_xthreshold => element_xthreshold.textContent, element_xthreshold)
                            xthreshold[countdata] = xthreshold[countdata].replace(/\s/g, '');
                            console.log(xthreshold[countdata]);

                            let element_ythreshold = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[1]/div[7]`, { timeout: 1000 })
                            ythreshold[countdata] = await page.evaluate(element_ythreshold => element_ythreshold.textContent, element_ythreshold)
                            ythreshold[countdata] = ythreshold[countdata].replace(/\s/g, '');
                            console.log(ythreshold[countdata]);

                            let element_site = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[1]`, { timeout: 1000 })
                            site[countdata] = await page.evaluate(element_site => element_site.textContent, element_site)
                            site[countdata] = site[countdata].replace(/\s/g, '');
                            site[countdata] = site[countdata].replace('Site:', '');
                            console.log(site[countdata]);

                            let element_city = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[3]`, { timeout: 1000 })
                            city[countdata] = await page.evaluate(element_city => element_city.textContent, element_city)
                            city[countdata] = city[countdata].replace(/\s/g, '');
                            city[countdata] = city[countdata].replace('City:', '');
                            console.log(city[countdata]);

                            let element_speed = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[9]`, { timeout: 1000 })
                            speed[countdata] = await page.evaluate(element_speed => element_speed.textContent, element_speed)
                            speed[countdata] = speed[countdata].replace(/\s/g, '');
                            speed[countdata] = speed[countdata].replace('Speed:', '');
                            console.log(speed[countdata]);

                            let element_bdi = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[10]`, { timeout: 1000 })
                            bdi[countdata] = await page.evaluate(element_bdi => element_bdi.textContent, element_bdi)
                            bdi[countdata] = bdi[countdata].replace(/\s/g, '');
                            // bdi[countdata] = bid[countdata].replace('BDI:', '');
                            console.log(bdi[countdata]);


                            try {
                                let element_fleetnumber = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[16]`, { timeout: 100 })
                                fleetnumber[countdata] = await page.evaluate(element_fleetnumber => element_fleetnumber.textContent, element_fleetnumber)
                                fleetnumber[countdata] = fleetnumber[countdata].replace(/\s/g, '');
                                fleetnumber[countdata] = fleetnumber[countdata].replace('FleetNumber:', '');
                                console.log(fleetnumber[countdata]);
                            }
                            catch {
                                console.log('Not found fleetnumber selector');
                                let element_fleetnumber = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[10]`, { timeout: 100 })
                                fleetnumber[countdata] = await page.evaluate(element_fleetnumber => element_fleetnumber.textContent, element_fleetnumber)
                                fleetnumber[countdata] = fleetnumber[countdata].replace(/\s/g, '');
                                fleetnumber[countdata] = fleetnumber[countdata].replace('FleetNumber:', '');
                                console.log(fleetnumber[countdata]);
                            }

                            try {
                                let element_tmhfleetnumber = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[17]`, { timeout: 100 })
                                tmhfleetnumber[countdata] = await page.evaluate(element_tmhfleetnumber => element_tmhfleetnumber.textContent, element_tmhfleetnumber)
                                tmhfleetnumber[countdata] = tmhfleetnumber[countdata].replace(/\s/g, '');
                                tmhfleetnumber[countdata] = tmhfleetnumber[countdata].replace('TMHFleetNumber:', '');
                                console.log(tmhfleetnumber[countdata]);
                            } catch {
                                // console.log('Not found  selector');
                                let element_tmhfleetnumber = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[11]`, { timeout: 100 })
                                tmhfleetnumber[countdata] = await page.evaluate(element_tmhfleetnumber => element_tmhfleetnumber.textContent, element_tmhfleetnumber)
                                tmhfleetnumber[countdata] = tmhfleetnumber[countdata].replace(/\s/g, '');
                                tmhfleetnumber[countdata] = tmhfleetnumber[countdata].replace('TMHFleetNumber:', '');
                                console.log(tmhfleetnumber[countdata]);
                            }


                            try {
                                let element_machinefamily = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[18]`, { timeout: 100 })
                                machinefamily[countdata] = await page.evaluate(element_machinefamily => element_machinefamily.textContent, element_machinefamily)
                                machinefamily[countdata] = machinefamily[countdata].replace(/\s/g, '');
                                machinefamily[countdata] = machinefamily[countdata].replace('MachineFamily:', '');
                                console.log(machinefamily[countdata]);
                            } catch {
                                let element_machinefamily = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[12]`, { timeout: 100 })
                                machinefamily[countdata] = await page.evaluate(element_machinefamily => element_machinefamily.textContent, element_machinefamily)
                                machinefamily[countdata] = machinefamily[countdata].replace(/\s/g, '');
                                machinefamily[countdata] = machinefamily[countdata].replace('MachineFamily:', '');
                                console.log(machinefamily[countdata]);
                            }

                            try {
                                let element_model = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[19]`, { timeout: 100 })
                                model[countdata] = await page.evaluate(element_model => element_model.textContent, element_model)
                                model[countdata] = model[countdata].replace(/\s/g, '');
                                model[countdata] = model[countdata].replace('Model:', '');
                                console.log(model[countdata]);
                            } catch {
                                let element_model = await page.waitForXPath(`/html/body/div[1]/section/div/div/div[2]/div[2]/div[2]/div[2]/div[${countitemflesh}]/div[${i}]/div[2]/div[13]`, { timeout: 100 })
                                model[countdata] = await page.evaluate(element_model => element_model.textContent, element_model)
                                model[countdata] = model[countdata].replace(/\s/g, '');
                                model[countdata] = model[countdata].replace('Model:', '');
                                console.log(model[countdata]);
                            }




                            // console.log('End of get data ');


                        } catch (error) {
                            console.log('Error get data');
                            continue;
                        }

                    }
                }
                else {
                    console.log("Get data over")
                }
            }
        }

        let dateData = '';
        let driverData = '';
        let serialmachineData = '';
        let xthresholdData = '';
        let ythresholdData = '';
        let siteData = '';
        let cityData = '';
        let speedData = '';
        let bdiData = '';
        let fleetnumberData = '';
        let tmhfleetnumberData = '';
        let machinefamilyData = '';
        let modelData = '';
        let insertdateData = '';
        let itemslengthData = '';

        while (newdata < items.length) {

            // console.log("This pass is clear !");
            newdata++;

            dateData += date[newdata] + ',';
            driverData += driver[newdata] + ',';
            serialmachineData += serialmachine[newdata] + ',';
            xthresholdData += xthreshold[newdata] + ',';
            ythresholdData += ythreshold[newdata] + ',';
            siteData += site[newdata] + ',';
            cityData += city[newdata] + ',';
            speedData += speed[newdata] + ',';
            bdiData += bdi[newdata] + ',';
            fleetnumberData += fleetnumber[newdata] + ',';
            tmhfleetnumberData += tmhfleetnumber[newdata] + ',';
            machinefamilyData += machinefamily[newdata] + ',';
            modelData += model[newdata] + ',';
            insertdateData += referencedate + ',';
            itemslengthData += items.length + ',';

        }

        var request = require('request');

        request.post(
            'https://www.btmexpertsales.com/btconnect_dbapi/isite_datacenter_project/shockdetails_receive_isite.php',
            {
                json: {
                    date: dateData,
                    driver: driverData,
                    serialmachine: serialmachineData,
                    xthreshold: xthresholdData,
                    ythreshold: ythresholdData,
                    site: siteData,
                    city: cityData,
                    speed: speedData,
                    bdi: bdiData,
                    fleetnumber: fleetnumberData,
                    tmhfleetnumber: tmhfleetnumberData,
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
    await page.click(".credentials_input_submit", { waitUntil: 'load', timeout: 3000 });
    await page.authenticate({ username: 'external\exsuyat1', password: 'Donut5821270015' });


    let currentDate = new Date();
    let inputDate = currentDate;

    console.log(currentDate.toLocaleDateString());
    console.log(currentDate.toString());
    console.log(inputDate.toLocaleDateString());



    let days = 8;


    for (let x = 1; x < days; x++) {

        if (x <= 1) {

            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/ShockDetails/?menu=Shocks&FromDate=6/14/2023%2012:00:00%20AM&EndDate=6/21/2023%2012:00:00%20AM');
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
            console.log("SiteSelectorAction");
            // await page.click('#selectAllSites', { delay: 50 })
            // await page.click('//*[@id="selectAllSites"]', { delay: 50 })
            console.log("selectAllSites");
            // await page.click('.dimmedCaption', { delay: 50 })
            await page.click('#searchButton', { delay: 50 })
            console.log('pass click');
            await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');



        }

        else if (x > 1) {


            inputDate.setDate(inputDate.getDate() - 1);



            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/ShockDetails/?menu=Shocks&FromDate=6/14/2023%2012:00:00%20AM&EndDate=6/21/2023%2012:00:00%20AM');
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
            // await page.click('.dimmedCaption', { delay: 50 })
            await page.click('#searchButton', { delay: 50 })
            await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');

        }

        let element_total = await page.waitForSelector(`#totalsummary_TotalShocks > span.total-summary__summary-item-value`)
        let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
        text_total = parseInt(text_total)
        console.log('Total=>' + text_total)


        // console.log(site_get);




        await scapeinfiniscroll(page, text_total, inputDate.toLocaleDateString())

    }
})
    ();