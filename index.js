const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const getFundData = require('./getFundData');
const path = require('path');
app.use(cors());
app.use(express.json());


const funds = [
    'https://www.avanza.se/fonder/om-fonden.html/1236399/aktiespararna-smabolag-edge',
    'https://www.avanza.se/fonder/om-fonden.html/512559/handelsbanken-hallbar-energi-a1-sek',
    'https://www.avanza.se/fonder/om-fonden.html/551035/ikc-fastighetsfond-a',
    'https://www.avanza.se/fonder/om-fonden.html/70331/ms-invf-us-growth-a-usd',
    'https://www.avanza.se/fonder/om-fonden.html/1276725/odin-fastighet-c-sek',
    'https://www.avanza.se/fonder/om-fonden.html/325406/spiltan-aktiefond-investmentbolag'
];


async function getFunds(){

    let date = new Date();
    let data = [];

    for(let i = 0; i < funds.length; i++){
        data.push( await getFundData.getFundData(funds[i]) );
    }

    fs.writeFile('./funds.txt', JSON.stringify(data), err => {
        if(err){
            console.log(err);
        }
    });

    fs.writeFile('./update.txt', JSON.stringify(date.getTime()), err => {
        if(err){
            console.log(err);
        }
    })
}

//update once at startup.
getFunds();

//update every hour.
setInterval(() => {
    getFunds();
}, 3600000);


let options = {root: path.join(__dirname)};

app.get('/funds', (req, res) => {
    res.sendFile('./funds.txt', options);
});

app.get('/update', (req, res) => {
    res.sendFile('./update.txt', options);
});


//RAILWAY
// PORT = process.env.PORT;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

app.listen(3030, () => console.log(`Server is running on port 3030.`));