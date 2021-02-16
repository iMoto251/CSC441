const Promise = require('bluebird');
const fetch = require('node-fetch');
fetch.Promise = Promise;
const fs = require('fs');

const urlcc = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json';
const urlca = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json';
const urlcapc = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json';
const ccws = fs.createWriteStream(`${__dirname}/countrycontinent.json`);
const caws = fs.createWriteStream(`${__dirname}/countryabbreviation.json`);
const capcws = fs.createWriteStream(`${__dirname}/countrycapital.json`);

const readIn = async () => {
    const responsecc = await fetch(urlcc);
    responsecc.body.pipe(ccws);
    ccws.on('close', () =>{
        console.log('Continent.json is closed');
    });
    
    const responseca = await fetch(urlca);
    responseca.body.pipe(caws);
    caws.on('close', () =>{
        console.log('Abbreviation.json is closed');
    });

    const responsecapc = await fetch(urlcapc);
    responsecapc.body.pipe(capcws);
    capcws.on('close', () =>{
        console.log('Capital.json is closed');
    });
}

//const ccrs = fs.createReadStream(`${__dirname}/countrycontinent.json`);


readIn();
