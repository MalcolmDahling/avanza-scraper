const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const server = express();
server.use(cors());
server.listen(3001, () => console.log('Server is running on port 3001.'));


server.get('/', async(req, res) => {
    await pupp();
    res.send(funds);
});


const funds = [
    {url:'https://www.avanza.se/fonder/om-fonden.html/1236399/aktiespararna-smabolag-edge',            date:'', oneDay:'', oneMonth:'', threeMonths:'', thisYear:'', oneYear:''},
    {url:'https://www.avanza.se/fonder/om-fonden.html/512559/handelsbanken-hallbar-energi-a1-sek',     date:'', oneDay:'', oneMonth:'', threeMonths:'', thisYear:'', oneYear:''},
    {url:'https://www.avanza.se/fonder/om-fonden.html/551035/ikc-fastighetsfond-a',                    date:'', oneDay:'', oneMonth:'', threeMonths:'', thisYear:'', oneYear:''},
    {url:'https://www.avanza.se/fonder/om-fonden.html/70331/ms-invf-us-growth-a-usd',                  date:'', oneDay:'', oneMonth:'', threeMonths:'', thisYear:'', oneYear:''},
    {url:'https://www.avanza.se/fonder/om-fonden.html/1276725/odin-fastighet-c-sek',                   date:'', oneDay:'', oneMonth:'', threeMonths:'', thisYear:'', oneYear:''},
    {url:'https://www.avanza.se/fonder/om-fonden.html/325406/spiltan-aktiefond-investmentbolag',       date:'', oneDay:'', oneMonth:'', threeMonths:'', thisYear:'', oneYear:''}
];


async function pupp(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    
    for(let i = 0; i < funds.length; i++){
        await page.goto(funds[i].url, { waitUntil: 'networkidle0' });

        //DATE
        let date = await page.evaluate( () => document.querySelector("body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div.main-column.ng-tns-c294-5 > aza-card.ng-tns-c294-5.full-width-mobile > div.chart-development.ng-tns-c294-5.ng-star-inserted > section:nth-child(1) > div:nth-child(2) > span:nth-child(1)").outerHTML );
        date = date.slice(69, 75);
        funds[i].date = date;
        //DATE

        //ONE DAY
        let oneDay = await page.evaluate( () => document.querySelector("body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div.main-column.ng-tns-c294-5 > aza-card.ng-tns-c294-5.full-width-mobile > div.chart-development.ng-tns-c294-5.ng-star-inserted > section:nth-child(1) > div:nth-child(2) > span:nth-child(2)").outerHTML );
        funds[i].oneDay = getPercentage(oneDay);
        //ONE DAY

        //ONE MONTH
        let oneMonth = await page.evaluate( () => document.querySelector("body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div > aza-card > div.chart-wrapper > aza-area-chart > div > aza-period-picker > div > aza-period-button:nth-child(1) > button > span:nth-child(2)").outerHTML );
        funds[i].oneMonth = getPercentage(oneMonth);
        //ONE MONTH

        //THREE MONTHS
        let threeMonths = await page.evaluate( () => document.querySelector("body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div > aza-card > div.chart-wrapper > aza-area-chart > div > aza-period-picker > div > aza-period-button:nth-child(2) > button > span:nth-child(2)").outerHTML );
        funds[i].threeMonths = getPercentage(threeMonths);
        //THREE MONTHS

        //THIS YEAR
        let thisYear = await page.evaluate( () => document.querySelector("body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div > aza-card > div.chart-wrapper > aza-area-chart > div > aza-period-picker > div > aza-period-button:nth-child(3) > button > span:nth-child(2)").outerHTML );
        funds[i].thisYear = getPercentage(thisYear);
        //THIS YEAR

        //ONE YEAR
        let oneYear = await page.evaluate( () => document.querySelector("body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div > aza-card > div.chart-wrapper > aza-area-chart > div > aza-period-picker > div > aza-period-button:nth-child(3) > button > span:nth-child(2)").outerHTML );
        funds[i].oneYear = getPercentage(oneYear);
        //ONE YEAR
    }

    console.log(funds);

    await browser.close();
}



function getPercentage(str){
    str = />(.+)/.exec(str)[1]; //Remove first part of string
    str = str.slice(0, -7); //Remove second part of string
    return str;
}

