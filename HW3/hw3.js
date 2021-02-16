const Promise = require('bluebird');
const fetch = require('node-fetch');
fetch.Promise = Promise;
const fs = require('fs');

const urlcc = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json';
const urlca = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json';
const urlcapc = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json';
const ccfs = fs.createWriteStream(`${__dirname}/countrycontinent.json`);
const cafs = fs.createWriteStream(`${__dirname}/countryabbreviation.json`);
const capcfs = fs.createWriteStream(`${__dirname}/countrycapital.json`);

const ccrs = fs.createReadStream(`${__dirname}/countrycontinent.json`);
const cars = fs.createReadStream(`${__dirname}/countryabbreviation.json`);
const capcrs = fs.createReadStream(`${__dirname}/countrycapital.json`);


const readIn = async () => {
    const responsecc = await fetch(urlcc);
    responsecc.body.pipe(ccfs);
    ccfs.on('close', () =>{
        console.log('Continent.json is closed');
    });
    
    const responseca = await fetch(urlca);
    responseca.body.pipe(cafs);
    cafs.on('close', () =>{
        console.log('Abbreviation.json is closed');
    });

    const responsecapc = await fetch(urlcapc);
    responsecapc.body.pipe(capcfs);
    capcfs.on('close', () =>{
        console.log('Capital.json is closed');
    });
}



const writeTo = async () => {
    await console.log(ccrs);
    await console.log(cars);
    await console.log(capcrs);

}

readIn();
