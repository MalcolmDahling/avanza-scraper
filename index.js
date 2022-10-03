const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');


const app = express();
app.use(cors());
app.use(express.json());


app.post('/', async(req, res) => {
    let data = await pupp(req.body.url);
    res.send(data);
});

app.get('/', (req, res) => {
    res.send('POST your Avanza-fund URL to this page.')
});



async function pupp(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let data = {
        name: '',
        date: '',
        oneDay: '',
        oneMonth: '',
        threeMonths: '',
        oneYear: ''
    }

    await page.goto(url, { waitUntil: 'networkidle0' });

    //NAME
    let name = await page.evaluate( () => document.querySelector('body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.page-header.ng-tns-c294-5.ng-star-inserted > h1').outerHTML );
    name = name.slice(50, -13);
    data.name = name;
    //NAME

    //DATE
    let date = await page.evaluate( () => document.querySelector('body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div.main-column.ng-tns-c294-5 > aza-card.ng-tns-c294-5.full-width-mobile > div.chart-development.ng-tns-c294-5.ng-star-inserted > section:nth-child(1) > div:nth-child(2) > span:nth-child(1)').outerHTML );
    date = date.slice(69, 75);
    data.date = date;
    //DATE

    //ONE DAY
    let oneDay = await page.evaluate( () => document.querySelector('body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div.main-column.ng-tns-c294-5 > aza-card.ng-tns-c294-5.full-width-mobile > div.chart-development.ng-tns-c294-5.ng-star-inserted > section:nth-child(1) > div:nth-child(2) > span:nth-child(2)').outerHTML );
    data.oneDay = getPercentage(oneDay);
    //ONE DAY

    //ONE MONTH
    let oneMonth = await page.evaluate( () => document.querySelector('body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div > aza-card > div.chart-wrapper > aza-area-chart > div > aza-period-picker > div > aza-period-button:nth-child(1) > button > span:nth-child(2)').outerHTML );
    data.oneMonth = getPercentage(oneMonth);
    //ONE MONTH

    //THREE MONTHS
    let threeMonths = await page.evaluate( () => document.querySelector('body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div > aza-card > div.chart-wrapper > aza-area-chart > div > aza-period-picker > div > aza-period-button:nth-child(2) > button > span:nth-child(2)').outerHTML );
    data.threeMonths = getPercentage(threeMonths);
    //THREE MONTHS

    //THIS YEAR
    let thisYear = await page.evaluate( () => document.querySelector('body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div > aza-card > div.chart-wrapper > aza-area-chart > div > aza-period-picker > div > aza-period-button:nth-child(3) > button > span:nth-child(2)').outerHTML );
    data.thisYear = getPercentage(thisYear);
    //THIS YEAR

    //ONE YEAR
    let oneYear = await page.evaluate( () => document.querySelector('body > aza-app > aza-shell > div > main > div > aza-fund-guide > aza-subpage > div > div > div > div.column-wrapper.ng-tns-c294-5 > div > aza-card > div.chart-wrapper > aza-area-chart > div > aza-period-picker > div > aza-period-button:nth-child(3) > button > span:nth-child(2)').outerHTML );
    data.oneYear = getPercentage(oneYear);
    //ONE YEAR
    

    await browser.close();

    return data;
}



function getPercentage(str){
    str = />(.+)/.exec(str)[1]; //Remove first part of string
    str = str.slice(0, -7); //Remove second part of string
    return str;
}



app.listen(3000, '0.0.0.0', () => console.log('Server is running on port 3000.'));