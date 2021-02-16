const Promise = require('bluebird');
const fetch = require('node-fetch');
fetch.Promise = Promise;
const fs = require('fs');
const { EventEmitter } = require('events');

const myEmitter = new EventEmitter();
const url1 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json';
const url2 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json';
const url3 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json';

const ws1 = fs.createWriteStream(`${__dirname}/countrycapital.json`);
const ws2 = fs.createWriteStream(`${__dirname}/countryabbreviation.json`);
const ws3 = fs.createWriteStream(`${__dirname}/countrycontinent.json`);

let conStr = '';
let conObj = {};

let capStr = '';
let capObj = {}

let abrStr = '';
let abrObj = {};

conResponse.body.on('data', (str) => conStr += str);
capResponse.body.on('data', (str) => capStr += str);
abrResponse.body.on('data', (str) => abrStr += str);

const rs2 = fs.createReadStream(`${__dirname}/countryabbreviation.json`);
const rs3 = fs.createReadStream(`${__dirname}/countrycontinent.json`);

myEmitter.on('ws1Close', () =>{
    const rs1 = fs.createReadStream(`${__dirname}/countrycapital.json`);
    let body = '';
    rs1.on('data', (str) => {
        body += str
    })
    rs1.on('close', () => {
        let o = JSON.parse(body);
        Object.keys(o).forEach((key) =>{
            console.log(key, key.country);
        })
    })
})

const readIn = async () => {
    const response1 = await fetch(url1);
    response1.body.pipe(ws1);
    ws1.on('close', () =>{
        console.log('Capital.json is closed');
        myEmitter.emit('ws1Close');
    });
    
    const response2 = await fetch(url2);
    response2.body.pipe(ws2);
    ws2.on('close', () =>{
        console.log('Abbreviation.json is closed');
        myEmitter.emit('ws2Close');
    });

    const response3 = await fetch(url3);
    response3.body.pipe(ws3);
    ws3.on('close', () =>{
        console.log('Continent.json is closed');
        myEmitter.emit('ws3Close');
    });
}

readIn();