const Promise = require('bluebird');
const fetch = require('node-fetch');
fetch.Promise = Promise;
const fs = require('fs');

const urlcc = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json';
const urlca = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json';
const urlcapc = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json';
const cc = fs.createWriteStream(`${__dirname}/countrycontinent.json`);
const ca = fs.createWriteStream(`${__dirname}/countryabbreviation.json`);
const capc = fs.createWriteStream(`${__dirname}/countrycapital.json`);


const main = async () => {
    const responsecc = await fetch(urlcc);
    responsecc.body.pipe(cc);
    cc.on('close', () =>{
        console.log('Continent.json is closed');
    });
    
    const responseca = await fetch(urlca);
    responseca.body.pipe(ca);
    ca.on('close', () =>{
        console.log('Abbreviation.json is closed');
    });

    const responsecapc = await fetch(urlcapc);
    responsecapc.body.pipe(capc);
    capc.on('close', () =>{
        console.log('Capital.json is closed');
    });
}

main();