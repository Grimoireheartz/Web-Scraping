const date = new Date()

async function scrape() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;

        else interceptedRequest.continue();
    });
}

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

const currentDate = `${day}-${month}-${year}`;
console.log(currentDate);

currentDate--;

await page.waitForSelector('body > header > div > div.menu-bar')
await page.goto('https://toyota-isite.eu/Utilization/Index?menu=Utilization');
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


let element_total = await page.waitForSelector(`#totalsummary_Machines > span.total-summary__summary-item-value`)
let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
text_total = parseInt(text_total)
console.log('Total=>' + text_total)



let countitemflesh = 0;
let countdata = 0;


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

                console.log("countdatai===>" + i);
                // console.log("count=>" + countitemflesh);
                console.log(text_cusSite[i]);
                console.log(SerialMachine[i]);

            }

            else if (countdata > 20) {
                try {
                    let element_cusSite = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 1000 })
                    text_cusSite[countdata] = await page.evaluate(element_cusSite => element_cusSite.textContent, element_cusSite)
                    text_cusSite[countdata] = text_cusSite[countdata].replace(/\s/g, '');
                    text_cusSite[countdata] = text_cusSite[countdata].replace('Site:', '');
                    console.log(text_cusSite[countdata]);

                    let element_SerialMachine = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span`, { timeout: 1000 })
                    SerialMachine[countdata] = await page.evaluate(element_SerialMachine => element_SerialMachine.textContent, element_SerialMachine)
                    console.log(SerialMachine[countdata]);

                    let element_OperatingTime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column100 > span > a`, { timeout: 1000 })
                    OperatingTime[countdata] = await page.evaluate(element_OperatingTime => element_OperatingTime.textContent, element_OperatingTime)
                    console.log(OperatingTime[countdata]);

                    let elemant_Utilization = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div:nth-child(5) > span`, { timeout: 1000 })
                    Utilization[countdata] = await page.evaluate(elemant_Utilization => elemant_Utilization.textContent, elemant_Utilization)
                    console.log(Utilization[countdata]);

                    let element_City = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 1000 })
                    City[countdata] = await page.evaluate(element_City => element_City.textContent, element_City)
                    City[countdata] = City[countdata].replace(/\s/g, '');
                    City[countdata] = City[countdata].replace('City:', '');
                    console.log(City[countdata]);

                    // cusSite += text_cusSite + ','
                    // Serialdata += SerialMachine + ','
                    // operatingdata += OperatingTime + ','
                    // utilizationData += Utilization + ','
                    // citydata += City + ','
                    // console.log(countdata + ': ' + text_cusSite + ' ' + SerialMachine + ' ' + OperatingTime + ' ' + Utilization + ' ' + City )

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
    database: "test01"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let countdata = 0;
    // console.log(text_cusSite);
    // console.log(SerialMachine);
    // console.log(OperatingTime);
    // console.log(Utilization);
    // console.log(City);
    while (countdata <= 1139) {
        countdata++;
        if (countdata <= 20) {
            var sql = `INSERT INTO userlogin (text_cusSite, SerialMachine,OperatingTime,Utilization,City) VALUES ('${text_cusSite[countdata]}', '${SerialMachine[countdata]}','${OperatingTime[countdata]}','${Utilization[countdata]}','${City[countdata]}')`;
        }
        else if (countdata > 20) {
            var sql = `INSERT INTO userlogin (text_cusSite, SerialMachine,OperatingTime,Utilization,City) VALUES ('${text_cusSite[countdata]}', '${SerialMachine[countdata]}','${OperatingTime[countdata]}','${Utilization[countdata]}','${City[countdata]}')`;
        }
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    }

});






