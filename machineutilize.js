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
    console.log("Countitemflesh =" + countitemflesh);
    console.log("Data = " + countdata);
    while ((itemTargetCount - 1) >= items.length) {


        previousHeight = await page.evaluate("document.body.scrollHeight");
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await new Promise((resolve) => setTimeout(resolve, 1500)).then((value) => console.log('Scoll ready'));


        console.log('test 00012');
        items = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll("#resultItems > div > div"));
            return items.map((item) => item.innerText);
        });

        console.log(items.length);


        let element_total = await page.waitForSelector(`#totalsummary_Machines > span.total-summary__summary-item-value`)
        let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
        text_total = parseInt(text_total)


        console.log('Total=>' + text_total)



        var text_cusSite = [];
        var SerialMachine = [];
        var OperatingTime = [];
        var Utilization = [];
        var City = [];
        var lastupdate = [];
        var Owner = [];
        var MachineFamily = [];
        var model = [];

        while (countdata < items.length) {
            countitemflesh++;
            for (let i = 1; i <= 20; i++) {
                countdata++;
                // console.log("count=>" + countitemflesh);
                // console.log(countdata)
                if (countdata <= items.length) {
                    if (countdata <= 20) {
                        let element_cusSite = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 300 })
                        text_cusSite[i] = await page.evaluate(element_cusSite => element_cusSite.textContent, element_cusSite)
                        text_cusSite[i] = text_cusSite[i].replace(/\s/g, '');
                        text_cusSite[i] = text_cusSite[i].replace('Site:', '');
                        // console.log(text_cusSite[i]);

                        let element_SerialMachine = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span > a`, { timeout: 300 })
                        SerialMachine[i] = await page.evaluate(element_SerialMachine => element_SerialMachine.textContent, element_SerialMachine)
                        // console.log("Seq =" + countdata + " /MC" + SerialMachine[i]);
                        let element_OperatingTime = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column100 > span`, { timeout: 300 })
                        OperatingTime[i] = await page.evaluate(element_OperatingTime => element_OperatingTime.textContent, element_OperatingTime)
                        // console.log(OperatingTime[i]);
                        let elemant_Utilization = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div:nth-child(5) > span`, { timeout: 300 })
                        Utilization[i] = await page.evaluate(elemant_Utilization => elemant_Utilization.textContent, elemant_Utilization)
                        // console.log(Utilization[i]);
                        let element_City = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 300 })
                        City[i] = await page.evaluate(element_City => element_City.textContent, element_City)
                        City[i] = City[i].replace(/\s/g, '');
                        City[i] = City[i].replace('City:', '');
                        // console.log(City[i]);
                        let element_lastupdate = await page.waitForSelector(`#resultItems > div:nth-child(1) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(9)`, { timeout: 300 })
                        lastupdate[i] = await page.evaluate(element_lastupdate => element_lastupdate.textContent, element_lastupdate)
                        lastupdate[i] = lastupdate[i].replace(/\s/g, '');
                        lastupdate[i] = lastupdate[i].replace('LastUpdated:', '');

                        lastupdate[i] = lastupdate[i].split("/")[0] + '/' + lastupdate[i].split("/")[1] + '/' + lastupdate[i].split("/")[2].slice(0, 4) + ' ' + lastupdate[i].split("/")[2].slice(4);



                        let element_Owner = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(4)`, { timeout: 300 })
                        Owner[i] = await page.evaluate(element_Owner => element_Owner.textContent, element_Owner)
                        Owner[i] = Owner[i].replace(/\s/g, '');
                        Owner[i] = Owner[i].replace('Owner:', '');
                        // console.log(Owner[i]);
                        let element_MachineFamily = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(5)`, { timeout: 300 })
                        MachineFamily[i] = await page.evaluate(element_MachineFamily => element_MachineFamily.textContent, element_MachineFamily)
                        MachineFamily[i] = MachineFamily[i].replace(/\s/g, '');
                        MachineFamily[i] = MachineFamily[i].replace('MachineFamily:', '');
                        // console.log(MachineFamily[i]);
                        let element_model = await page.waitForSelector(`#resultItems > div > div:nth-child(${i}) > div.resultSubRow > div:nth-child(6)`, { timeout: 300 })
                        model[i] = await page.evaluate(element_model => element_model.textContent, element_model)
                        model[i] = model[i].replace(/\s/g, '');
                        model[i] = model[i].replace('Model:', '');
                        // console.log(model[i]);


                        // console.log(currentDate.toLocaleString());
                    }

                    else if (countdata > 20) {
                        try {
                            let element_cusSite = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(1)`, { timeout: 300 })
                            text_cusSite[countdata] = await page.evaluate(element_cusSite => element_cusSite.textContent, element_cusSite)
                            text_cusSite[countdata] = text_cusSite[countdata].replace(/\s/g, '');
                            text_cusSite[countdata] = text_cusSite[countdata].replace('Site:', '');
                            // console.log(text_cusSite[countdata]);

                            let element_SerialMachine = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column160 > span`, { timeout: 300 })
                            SerialMachine[countdata] = await page.evaluate(element_SerialMachine => element_SerialMachine.textContent, element_SerialMachine)
                            // console.log("Seq =" + countdata + " /MC" + SerialMachine[countdata]);

                            let element_OperatingTime = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div.column100 > span`, { timeout: 300 })
                            OperatingTime[countdata] = await page.evaluate(element_OperatingTime => element_OperatingTime.textContent, element_OperatingTime)
                            // console.log(OperatingTime[countdata]);

                            let elemant_Utilization = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultTitleRow.resultIconSpace.result-row-title > div:nth-child(5) > span`, { timeout: 300 })
                            Utilization[countdata] = await page.evaluate(elemant_Utilization => elemant_Utilization.textContent, elemant_Utilization)
                            // console.log(Utilization[countdata]);

                            let element_City = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(3)`, { timeout: 300 })
                            City[countdata] = await page.evaluate(element_City => element_City.textContent, element_City)
                            City[countdata] = City[countdata].replace(/\s/g, '');
                            City[countdata] = City[countdata].replace('City:', '');
                            // console.log(City[countdata]);

                            let element_lastupdate = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(9)`, { timeout: 300 })
                            lastupdate[countdata] = await page.evaluate(element_lastupdate => element_lastupdate.textContent, element_lastupdate)
                            lastupdate[countdata] = lastupdate[countdata].replace(/\s/g, '');
                            lastupdate[countdata] = lastupdate[countdata].replace('LastUpdated:', '');
                            lastupdate[countdata] = lastupdate[countdata].split("/")[0] + '/' + lastupdate[countdata].split("/")[1] + '/' + lastupdate[countdata].split("/")[2].slice(0, 4) + ' ' + lastupdate[countdata].split("/")[2].slice(4);


                            let element_Owner = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(4)`, { timeout: 300 })
                            Owner[countdata] = await page.evaluate(element_Owner => element_Owner.textContent, element_Owner)
                            Owner[countdata] = Owner[countdata].replace(/\s/g, '');
                            Owner[countdata] = Owner[countdata].replace('Owner:', '');
                            // console.log(Owner[countdata]);

                            let element_MachineFamily = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(5)`, { timeout: 300 })
                            MachineFamily[countdata] = await page.evaluate(element_MachineFamily => element_MachineFamily.textContent, element_MachineFamily)
                            MachineFamily[countdata] = MachineFamily[countdata].replace(/\s/g, '');
                            MachineFamily[countdata] = MachineFamily[countdata].replace('MachineFamily:', '');
                            // console.log(MachineFamily[countdata]);

                            let element_model = await page.waitForSelector(`#resultItems > div:nth-child(${countitemflesh}) > div:nth-child(${i}) > div.resultSubRow > div:nth-child(6)`, { timeout: 300 })
                            model[countdata] = await page.evaluate(element_model => element_model.textContent, element_model)
                            model[countdata] = model[countdata].replace(/\s/g, '');
                            model[countdata] = model[countdata].replace('Model:', '');
                            // console.log(model[countdata]);




                            // console.log(currentDate.toLocaleString());
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

        let serialMachine ='';
        let cusSite='';
        let utilizationData='';
        let operatingtimeData='';
        let cityData ='';
        let ownerData ='';
        let familyData='';
        let modelData='';
        let lastupdateData='';
        let insertdateData = '';
        let itemslengthData = '';

        while (newdata < items.length) {

            // console.log("This pass is clear !");
            newdata++;
           


            serialMachine +=SerialMachine[newdata]+','; 
            cusSite +=  text_cusSite[newdata]+',';
            utilizationData +=  Utilization[newdata] +',';
            operatingtimeData += OperatingTime[newdata] +',';
            cityData += City[newdata] +',';
            lastupdateData += lastupdate[newdata] +',';
            ownerData += Owner[newdata] +',';
            familyData += MachineFamily[newdata] +',';
            modelData += model[newdata] +',';
            insertdateData += referencedate +',';
            itemslengthData += items.length + ',';
            
        }  



        var request = require('request');

        request.post(
            'https://www.btmexpertsales.com/btconnect_dbapi/isite_datacenter_project/receive_isite_data_test.php',
            {
                json: {
                    serial: serialMachine,
                    cussite: cusSite,
                    utiliz: utilizationData,
                    operatingTime: operatingtimeData,
                    city: cityData,
                    lastup: lastupdateData,
                    owner: ownerData,
                    family: familyData,
                    model: modelData,
                    insertdate: insertdateData,
                    itemslength: itemslengthData,
                   
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                }
            }
        );


        // var con = mysql.createConnection({
        //     host: "localhost",
        //     user: "supanut",
        //     password: "donut31880",
        //     database: "test01",
        // });
        // let newdate = new Date();

        // await con.connect(function (err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //     console.log("NewDate Insert to database =====>" + newdate.toLocaleString());
        //     console.log("Countdata ===> " + countdata);


        //     let Filterdata = newdata;
        //     var FilterSerailMachine = '';
        //     while (Filterdata < items.length) {
        //         Filterdata++;
        //         FilterSerailMachine += `SerialMachine = '${SerialMachine[Filterdata]}' or `;
        //     }
        //     FilterSerailMachine = FilterSerailMachine.slice(0, -4);
        //     console.log("Serial Machine ==== " + FilterSerailMachine);

        //     if (FilterSerailMachine.length > 0) {
        //         console.log("Data already");
        //         var sql_del = `DELETE FROM userlogin WHERE (${FilterSerailMachine})  and insert_date like '%${referencedate}%'`;
        //         con.query(sql_del, function (err, result) {
        //             if (err) throw err;
        //         });
        //     }


        //     while (newdata < items.length) {
        //         // console.log("This pass is clear !");
        //         newdata++;
        //         var sql = `INSERT INTO userlogin (text_cussite, serialmachine,operatingtime,utilization,city,last_update,owner,machinefamily,model,insert_date) VALUES ('${text_cusSite[newdata]}', '${SerialMachine[newdata]}','${OperatingTime[newdata]}','${Utilization[newdata]}','${City[newdata]}','${lastupdate[newdata]}','${Owner[newdata]}','${MachineFamily[newdata]}','${model[newdata]}','${referencedate}')`;

        //         con.query(sql, function (err, result) {
        //             if (err) throw err;
        //         }); continue;

        //     }
        //     console.log("insert data success ! ");

        //     newdate.setDate(newdate.getDate() - 1);
        // });
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


    for (let x = 2; x < days; x++) {

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

        else if (x > 1) {
           

            inputDate.setDate(inputDate.getDate() - 1);


           
            await page.waitForSelector('body > header > div > div.menu-bar')
            await page.goto('https://toyota-isite.eu/Utilization/Index?menu=Utilization');
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

        let element_total = await page.waitForSelector(`#totalsummary_Machines > span.total-summary__summary-item-value`)
        let text_total = await page.evaluate(element_total => element_total.textContent, element_total)
        text_total = parseInt(text_total)
        console.log('Total=>' + text_total)


        await scapeinfiniscroll(page, text_total, inputDate.toLocaleDateString())

    }
})
    ();
























