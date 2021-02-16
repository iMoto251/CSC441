const fs = require("fs");
const Promise = require('bluebird');
const fetch = require('node-fetch');
const { EventEmitter } = require('events');
fetch.Promise = Promise;

    url1 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json';
    url2 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json';
    url3 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json';

    let continentsData = {};
    let conStr = '';
    let abbreviationsData = {};
    let abbStr = '';
    let citiesData = {};
    let citStr = '';

    myEmitter = new EventEmitter();

    const ws = fs.createWriteStream(`${__dirname}/continents.json`);
    const ws2 = fs.createWriteStream(`${__dirname}/abbreviations.json`);
    const ws3 = fs.createWriteStream(`${__dirname}/cities.json`);

    // const rs = fs.createReadStream(`${__dirname}/continents.json`);
    // const rs2 = fs.createReadStream(`${__dirname}/abbreviations.json`);
    // const rs3 = fs.createReadStream(`${__dirname}/cities.json`);

    // rs.on('data', (stri) => {
    //     conStr += stri;
    //     console.log('Made it');
    // });
    // rs2.on('data', (stri) => abbStr += stri);
    // rs3.on('data', (stri) => citStr += stri);
 
    

    myEmitter.on('conts', () => {
        const rs = fs.createReadStream(`${__dirname}/continents.json`);
        const rs2 = fs.createReadStream(`${__dirname}/abbreviations.json`);
        const rs3 = fs.createReadStream(`${__dirname}/cities.json`);
        rs.on('data', (stri) => {
            conStr += stri;
            //console.log('Made it');
        });
        rs2.on('data', (stri) => abbStr += stri);
        rs3.on('data', (stri) => citStr += stri);
        console.log('continents: ', JSON.stringify(conStr));
       // continentsData = JSON.parse(conStr);
    });




    async function continents() {
        const response = await fetch(url1);
        response.body.pipe(ws);
        ws.on('close', () => {
            console.log('continents transfer complete');
            myEmitter.emit('conts');
        });
    }

    async function abbrev() {
        const response = await fetch(url2);
        response.body.pipe(ws2);
        ws2.on('close', () => {
            console.log('abbreviations transfer complete');
            myEmitter.emit('abbr');
        });
    }

    async function cities() {
        const response = await fetch(url3);
        response.body.pipe(ws3);
        ws2.on('close', () => {
            console.log('cities transfer complete');
            // myEmitter.emit('cities');
        });
    }

    continents();
    abbrev();
    cities();

/*const ws = fs.createWriteStream(`${__dirname}/test.json`);

const obj = { 'class': 'CSC 441', 'term': 'Spring 2021' }

ws.write(JSON.stringify(obj));
ws.end();

const rs = fs.createReadStream(`${__dirname}/test.json`);

let body ='';

rs.on('data', (str) => body += str);

rs.on('close', () => {
    console.log('body: ', body);
    let o = JSON.parse(body);
    Object.keys(o).forEach((key, i) => {
        console.log(key, o[key]);
    });
})*/