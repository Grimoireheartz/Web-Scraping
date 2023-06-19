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
    
    while ((itemTargetCount - 1) >= items.length){

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



        var SerialMacine = [];
        var TotalShocks = [];
        var HighShocks = [];
        var NediumShocks = [];
        var LowShocks = [];
        var Lockouts = [];
        var optimeandhighshocks = [];
        var site = [];
        var city = [];
        var MachineFamily = [];
        var Model = [];

        while (countdata < items.length) {
            countitemflesh++;
            for (let i = 1; i <= 20; i++) {
                countdata++;
                if (countdata <= items.length) {
                    if (countdata <= 20) {
                        let element_SerialMachine = await page.waitForSelector(`` , { timeout: 300 })
                        SerialMacine[i] = await page.evaluate(element_SerialMachine => element_SerialMachine.textContent, element_SerialMachine)
                    }
                }
            }
        }
    }
}