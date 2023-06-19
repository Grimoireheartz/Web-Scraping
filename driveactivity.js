const { hostname } = require('os');
const path = require('path');
const puppeteer = require('puppeteer')

const scapeinfiniscroll = async (page, itemTargetCount) => {
    let items = [];
    while (itemTargetCount > items.length) {
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

async function scrape() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;

        else interceptedRequest.continue();
    });

    await page.goto('https://toyota-isite.eu/');


    await page.waitForSelector('#input_1');

    await page.type('#input_1', 'extesir1', { delay: 50 })



    await page.type('#input_2', 'Te0846374624', { delay: 50 })
    await page.click('.credentials_input_submit', { waitUntil: 'load', timeout: 100000 })

    await page.authenticate({ username: 'external\extesir1', password: 'Te0846374624' });


    await page.waitForSelector('body > header > div > div.menu-bar')
    await page.goto('https://toyota-isite.eu/Utilization/Index?menu=Utilization');
    await page.focus('#fromDate');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type('#fromDate', '6/8/2023', { delay: 50 })

    await page.focus('#endDate');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type('#endDate', '6/8/2023', { delay: 50 })
    await page.click('#SiteSelectorAction', { delay: 50 })
    await page.click('#selectAllSites', { delay: 50 })
    await page.click('.dimmedCaption', { delay: 50 })
    await page.click('#searchButton', { delay: 50 })
    await page.waitForSelector('#searchResultContainer > div.search-top-container > div > div.searchResultSummary > div.total-summary');


    let element_total = await page.waitForSelector(`#totalsummary_Machines > span.total-summary__summary-item-value`)
    let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
    text_total = parseInt(text_total)
    console.log('Total=>' + text_total)



    let countitemflesh = 1;
    let countdata = 0;

    let serialMachine = ''
    let cusSite = ''
    let utilizationData = ''
    let contractTypeData = ''
    let familyData = ''
    let modelData = ''
    let lastupdateData = ''

    await scapeinfiniscroll(page, 100)
    while (countdata < 100) {
        countitemflesh++
        for (let i = 1; i <= 20; i++) {

            countdata++;

            if (countdata <= 20) {
                let element = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span > a`)
                let text = await page.evaluate(element => element.textContent, element)

                let element_operatiomtime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column100 > span > a`)
                let text_operatiomtime = await page.evaluate(element_operatiomtime => element_operatiomtime.textContent, element_operatiomtime)

                let element_utilize = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div:nth-child(5) > span`)
                let text_utilize = await page.evaluate(element_utilize => element_utilize.textContent, element_utilize)

                let element_cussite = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`)
                let text_cussite = await page.evaluate(element_cussite => element_cussite.textContent, element_cussite)
                text_cussite = text_cussite.replace(/\s/g, '');
                text_cussite = text_cussite.replace('Site:', '');

                let element_contracttype = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(4)`)
                let text_contracttype = await page.evaluate(element_contracttype => element_contracttype.textContent, element_contracttype)
                text_contracttype = text_contracttype.replace(/\s/g, '');
                text_contracttype = text_contracttype.replace('Owner:', '');

                let element_family = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(5)`)
                let text_family = await page.evaluate(element_family => element_family.textContent, element_family)
                text_family = text_family.replace(/\s/g, '');
                text_family = text_family.replace('MachineFamily:', '');

                let element_model = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(6)`)
                let text_model = await page.evaluate(element_model => element_model.textContent, element_model)
                text_model = text_model.replace(/\s/g, '');
                text_model = text_model.replace('Model:', '');

                let element_lastupdate = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(9)`)
                let text_lastupdate = await page.evaluate(element_lastupdate => element_lastupdate.textContent, element_lastupdate)
                text_lastupdate = text_lastupdate.replace(/\s/g, '');
                text_lastupdate = text_lastupdate.replace('LastUpdated:', '');

                serialMachine += text + ','
                cusSite += text_cussite + ','
                utilizationData += text_utilize + ','
                contractTypeData += text_contracttype + ','
                familyData += text_family + ','
                modelData += text_model + ','
                lastupdateData += text_lastupdate + ','


                console.log(countdata + ': ' + text + ' ' + text_operatiomtime + ' ' + text_utilize + ' ' + text_cussite + ' ' + text_contracttype + '' + text_family + ' ' + text_model + ' ' + text_lastupdate)



            }




            else if (countdata > 20) {

                let element = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span > a`)
                let text = await page.evaluate(element => element.textContent, element)

                let element_operatiomtime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column100 > span > a`)
                let text_operatiomtime = await page.evaluate(element_operatiomtime => element_operatiomtime.textContent, element_operatiomtime)

                let element_utilize = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div:nth-child(5) > span`)
                let text_utilize = await page.evaluate(element_utilize => element_utilize.textContent, element_utilize)

                let element_cussite = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`)
                let text_cussite = await page.evaluate(element_cussite => element_cussite.textContent, element_cussite)
                text_cussite = text_cussite.replace(/\s/g, '');
                text_cussite = text_cussite.replace('Site:', '');

                let element_contracttype = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(4)`)
                let text_contracttype = await page.evaluate(element_contracttype => element_contracttype.textContent, element_contracttype)
                text_contracttype = text_contracttype.replace(/\s/g, '');
                text_contracttype = text_contracttype.replace('Owner:', '');

                let element_family = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(5)`)
                let text_family = await page.evaluate(element_family => element_family.textContent, element_family)
                text_family = text_family.replace(/\s/g, '');
                text_family = text_family.replace('MachineFamily:', '');

                let element_model = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(6)`)
                let text_model = await page.evaluate(element_model => element_model.textContent, element_model)
                text_model = text_model.replace(/\s/g, '');
                text_model = text_model.replace('Model:', '');

                let element_lastupdate = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(9)`)
                let text_lastupdate = await page.evaluate(element_lastupdate => element_lastupdate.textContent, element_lastupdate)
                text_lastupdate = text_lastupdate.replace(/\s/g, '');
                text_lastupdate = text_lastupdate.replace('LastUpdated:', '');

                serialMachine += text + ','
                cusSite += text_cussite + ','
                utilizationData += text_utilize + ','
                contractTypeData += text_contracttype + ','
                familyData += text_family + ','
                modelData += text_model + ','
                lastupdateData += text_lastupdate + ','


                console.log(countdata + ': ' + text + ' ' + text_operatiomtime + ' ' + text_utilize + ' ' + text_cussite + ' ' + text_contracttype + ' ' + text_family + ' ' + text_model + ' ' + text_lastupdate)

            }

        }
    }

    console.log('Finish Get data')

    var request = require('request');

    request.post(
        'https://www.btmexpertsales.com/isite_webscapping_server/update_utilization.php',
        {
            json: {
                serial: serialMachine,
                cussite: cusSite,
                utiliz : utilizationData,
                contract : contractTypeData,
                family : familyData,
                model : modelData,
                lastup : lastupdateData
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );






}
scrape()




















    


