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
    console.log("finished looping");
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




    await page.waitForSelector('body > header > div > div.menu-bar')
    await page.goto('https://toyota-isite.eu/Utilization/Index?menu=Utilization');
    await page.focus('#fromDate');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type('#fromDate', '10/1/2022', { delay: 50 })

    await page.focus('#endDate');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type('#endDate', '10/30/2022', { delay: 50 })
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


    var text_cusSite = [];
    var SerialMachine = [];
    var OperatingTime = [];
    var Utilization = [];
    var City = [];

    // #resultItems > div:nth-child(2) > div:nth-child(3) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span > a

    const items = await scapeinfiniscroll(page, 1139)
    while (countdata <= 1119) {
        countitemflesh++;
        console.log("count=>" + countitemflesh);
        for (let i = 1; i <= 20; i++) {
            countdata++;
            console.log(countdata)
            if (countdata <= 1119) {

                if (countdata <= 20) {
                    let element_cusSite = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`)
                    text_cusSite[i] = await page.evaluate(element_cusSite => element_cusSite.textContent, element_cusSite)
                    text_cusSite[i] = text_cusSite[i].replace(/\s/g, '');
                    text_cusSite[i] = text_cusSite[i].replace('Site:', '');

                    let element_SerialMachine = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span`)
                    SerialMachine[i] = await page.evaluate(element_SerialMachine => element_SerialMachine.textContent, element_SerialMachine)

                    let element_OperatingTime = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column100 > span > a`)
                    OperatingTime[i] = await page.evaluate(element_OperatingTime => element_OperatingTime.textContent, element_OperatingTime)

                    let elemant_Utilization = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div:nth-child(5) > span`)
                    Utilization[i] = await page.evaluate(elemant_Utilization => elemant_Utilization.textContent, elemant_Utilization)

                    let element_City = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`)
                    City[i] = await page.evaluate(element_City => element_City.textContent, element_City)
                    City[i] = City[i].replace(/\s/g, '');
                    City[i] = City[i].replace('City:', '');


                }
                else if (countdata > 20) {
                    let element_cusSite = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`)
                    text_cusSite[i] = await page.evaluate(element_cusSite => element_cusSite.textContent, element_cusSite)
                    text_cusSite[i] = text_cusSite[i].replace(/\s/g, '');
                    text_cusSite[i] = text_cusSite[i].replace('Site:', '');
                    if (element_cusSite !== false) {
                        continue;
                    }
                    let element_SerialMachine = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span`)
                    SerialMachine[i] = await page.evaluate(element_SerialMachine => element_SerialMachine.textContent, element_SerialMachine)
                    if (element_SerialMachine !== false) {
                        continue;
                    }
                    let element_OperatingTime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column100 > span > a`)
                    OperatingTime[i] = await page.evaluate(element_OperatingTime => element_OperatingTime.textContent, element_OperatingTime)
                    if (element_OperatingTime !== false) {
                        continue;
                    }
                    let elemant_Utilization = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div:nth-child(5) > span`)
                    Utilization[i] = await page.evaluate(elemant_Utilization => elemant_Utilization.textContent, elemant_Utilization)
                    if (elemant_Utilization !== false) {
                        continue;
                    }
                    let element_City = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`)
                    City[i] = await page.evaluate(element_City => element_City.textContent, element_City)
                    City[i] = City[i].replace(/\s/g, '');
                    City[i] = City[i].replace('City:', '');
                    if (element_City !== false) {
                        continue;
                    }
                }

            }else{
                console.log("Get data over")
            }

        }
    }

    var con = mysql.createConnection({
        host: "localhost",
        user: "supanut",
        password: "donut31880",
        database: "test01"
    });


    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        for (let x = 1; x <= 1119; x++) {
            var sql = `INSERT INTO userlogin (text_cusSite, SerialMachine,OperatingTime,Utilization,City) VALUES ('${text_cusSite[x]}', '${SerialMachine[x]}','${OperatingTime[x]}','${Utilization[x]}','${City[x]}')`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                // console.log("1 record inserted");
            });
        }
    });



    //         serialMachine += text + ','
    //         cusSite += text_cussite + ','
    //         utilizationData += text_utilize + ','
    //         contractTypeData += text_contracttype + ','
    //         familyData += text_family + ','
    //         modelData += text_model + ','
    //         lastupdateData += text_lastupdate + ','


    //         console.log(countdata + ': ' + text + ' ' + text_operatiomtime + ' ' + text_utilize + ' ' + text_cussite + ' ' + text_contracttype + '' + text_family + ' ' + text_model + ' ' + text_lastupdate)



    //       }




    //       

    // serialMachine += text + ','
    // cusSite += text_cusSite + ','
    //         utilizationData += text_utilize + ','
    //         contractTypeData += text_contracttype + ','
    //         familyData += text_family + ','
    //         modelData += text_model + ','
    //         lastupdateData += text_lastupdate + ','


    //         console.log(countdata + ': ' + text + ' ' + text_operatiomtime + ' ' + text_utilize + ' ' + text_cussite + ' ' + text_contracttype + ' ' + text_family + ' ' + text_model + ' ' + text_lastupdate)

    //       }

    // }
    //   }

    //   console.log('Finish Get data')




    // await browser.close();

})

    ();





























































