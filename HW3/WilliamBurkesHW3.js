//William Burkes HW3
//You have to delete each of the JSON files each time for it to work.
//command to remove and run .js file
//rm Africa.json Antarctica.json Asia.json Europe.json North\ America.json Oceania.json South\ America.json countryabbreviation.json countrycapital.json countrycontinent.json; node WilliamBurkesHW3.js

const Promise = require('bluebird');
const fetch = require('node-fetch');
fetch.Promise = Promise;
const fs = require('fs');
const { EventEmitter } = require('events');

const main = async () => {
    const myEmitter = new EventEmitter();
    const url1 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json';
    const url2 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json';
    const url3 = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json';

    const ws1 = fs.createWriteStream(`${__dirname}/countrycapital.json`);
    const ws2 = fs.createWriteStream(`${__dirname}/countryabbreviation.json`);
    const ws3 = fs.createWriteStream(`${__dirname}/countrycontinent.json`);

    let capStr = '';
    let capObj = {};
    let conStr = '';
    let conObj = {};
    let abrStr = '';
    let abrObj = {};

    const capResponse = await fetch(url1);
    capResponse.body.pipe(ws1);
    const abrResponse = await fetch(url2);
    abrResponse.body.pipe(ws2);
    const conResponse = await fetch(url3);
    conResponse.body.pipe(ws3);
    ws3.on('close', () =>{
        myEmitter.emit('ws3Close');
    })

    myEmitter.on('ws3Close', () =>{
        const rs1 = fs.createReadStream(`${__dirname}/countrycapital.json`);
        const rs2 = fs.createReadStream(`${__dirname}/countryabbreviation.json`);
        const rs3 = fs.createReadStream(`${__dirname}/countrycontinent.json`);
        
        rs1.on('data', (str) => capStr += str);
        rs2.on('data', (str) => abrStr += str);
        rs3.on('data', (str) => conStr += str);

        rs3.on('end', () => {
            capObj = JSON.parse(capStr);
            abrObj = JSON.parse(abrStr);
            conObj = JSON.parse(conStr);
    
            conObj.forEach(ele =>{
                let temp = {};
    
                myEmitter.emit(ele.continent, ele, capObj, abrObj, temp);

                if(!fs.existsSync(`${__dirname}/${ele.continent}.json`)){
                    fs.createWriteStream(`${__dirname}/${ele.continent}.json`);

                    fs.appendFile(`${__dirname}/${ele.continent}.json`, '[\n', 'utf8', () =>{})
                    fs.appendFile(`${__dirname}/${ele.continent}.json`, JSON.stringify(temp), 'utf8', () =>{
                        //do nothing
                    })
                } else {
                    fs.appendFile(`${__dirname}/${ele.continent}.json`, ',\n' + JSON.stringify(temp), 'utf8', () =>{
                        //do nothing
                    })
                }
                for(var member in temp) delete temp[member];
            })
            myEmitter.emit('complete')
        })
    })

    myEmitter.on('complete', () =>{
        //This just finishes the file to make it .json compliant
        fs.appendFile(`${__dirname}/Africa.json`, '\n]', 'utf8', () =>{});
        fs.appendFile(`${__dirname}/Antarctica.json`, '\n]', 'utf8', () =>{});
        fs.appendFile(`${__dirname}/Asia.json`, '\n]', 'utf8', () =>{});
        fs.appendFile(`${__dirname}/Europe.json`, '\n]', 'utf8', () =>{});
        fs.appendFile(`${__dirname}/North America.json`, '\n]', 'utf8', () =>{});
        fs.appendFile(`${__dirname}/Oceania.json`, '\n]', 'utf8', () =>{});
        fs.appendFile(`${__dirname}/South America.json`, '\n]', 'utf8', () =>{});
    })

    
    myEmitter.on('Antarctica', (ele, capObj, abrObj, temp) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temp.country_name = capObj[i].country;
                temp.country_abbreviation = abrObj[i].abbreviation;
                temp.capital = capObj[i].city;
            }
        }        
    })

    myEmitter.on('Africa', (ele, capObj, abrObj, temp) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temp.country_name = capObj[i].country;
                temp.country_abbreviation = abrObj[i].abbreviation;
                temp.capital = capObj[i].city;
            }
        }        
    })

    myEmitter.on('Asia', (ele, capObj, abrObj, temp) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temp.country_name = capObj[i].country;
                temp.country_abbreviation = abrObj[i].abbreviation;
                temp.capital = capObj[i].city;
            }
        }        
    })

    myEmitter.on('Europe', (ele, capObj, abrObj, temp) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temp.country_name = capObj[i].country;
                temp.country_abbreviation = abrObj[i].abbreviation;
                temp.capital = capObj[i].city;
            }
        }        
    })

    myEmitter.on('North America', (ele, capObj, abrObj, temp) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temp.country_name = capObj[i].country;
                temp.country_abbreviation = abrObj[i].abbreviation;
                temp.capital = capObj[i].city;
            }
        }        
    })

    myEmitter.on('Oceania', (ele, capObj, abrObj, temp) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temp.country_name = capObj[i].country;
                temp.country_abbreviation = abrObj[i].abbreviation;
                temp.capital = capObj[i].city;
            }
        }        
    })

    myEmitter.on('South America', (ele, capObj, abrObj, temp) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temp.country_name = capObj[i].country;
                temp.country_abbreviation = abrObj[i].abbreviation;
                temp.capital = capObj[i].city;
            }
        }        
    })
    
}

main();