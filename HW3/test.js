const fetch = require('node-fetch');
const fs = require('fs');
const EventEmitter = require('events');
//Lane Burkes

const main = async () => {
    const myEmitter = new EventEmitter();
    const capResponse = await fetch('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json');
    const abrResponse = await fetch('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json');
    const conResponse = await fetch('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json');

    let conStr = '';
    let conObj = {};

    let capStr = '';
    let capObj = {}

    let abrStr = '';
    let abrObj = {};

    conResponse.body.on('data', (str) => conStr += str);



    capResponse.body.on('data', (str) => capStr += str);



    abrResponse.body.on('data', (str) => abrStr += str);



    myEmitter.on('Asia', (ele, capObj, abrObj, temObj) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temObj[ele.country] = "Capital City: " + capObj[i].city;
            }
        }

        for(j in abrObj){
            if(abrObj[j].country == ele.country){
                temObj[ele.country] += " Abbreviation: " + abrObj[j].abbreviation;
            }
        }
        
    })

    myEmitter.on('Africa', (ele, capObj, abrObj, temObj) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temObj[ele.country] = "Capital City: " + capObj[i].city;
            }
        }

        for(j in abrObj){
            if(abrObj[j].country == ele.country){
                temObj[ele.country] += " Abbreviation: " + abrObj[j].abbreviation;
            }
        }
    })

    myEmitter.on('Antarctica', (ele, capObj, abrObj, temObj) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temObj[ele.country] = "Capital City: " + capObj[i].city;
            }
        }

        for(j in abrObj){
            if(abrObj[j].country == ele.country){
                temObj[ele.country] += " Abbreviation: " + abrObj[j].abbreviation;
            }
        }
    })

    myEmitter.on('Europe', (ele, capObj, abrObj, temObj) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temObj[ele.country] = "Capital City: " + capObj[i].city;
            }
        }

        for(j in abrObj){
            if(abrObj[j].country == ele.country){
                temObj[ele.country] += " Abbreviation: " + abrObj[j].abbreviation;
            }
        }
    })

    myEmitter.on('North America', (ele, capObj, abrObj, temObj) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temObj[ele.country] = "Capital City: " + capObj[i].city;
            }
        }

        for(j in abrObj){
            if(abrObj[j].country == ele.country){
                temObj[ele.country] += " Abbreviation: " + abrObj[j].abbreviation;
            }
        }
    })

    myEmitter.on('Oceania', (ele, capObj, abrObj, temObj) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temObj[ele.country] = "Capital City: " + capObj[i].city;
            }
        }

        for(j in abrObj){
            if(abrObj[j].country == ele.country){
                temObj[ele.country] += " Abbreviation: " + abrObj[j].abbreviation;
            }
        }
    })

    myEmitter.on('South America', (ele, capObj, abrObj, temObj) =>{
        for(i in capObj){
            if(capObj[i].country == ele.country){
                temObj[ele.country] = "Capital City: " + capObj[i].city;
            }
        }

        for(j in abrObj){
            if(abrObj[j].country == ele.country){
                temObj[ele.country] += " Abbreviation: " + abrObj[j].abbreviation;
            }
        }
    })


    conResponse.body.on('end', () => {
        conObj = JSON.parse(conStr);
        abrObj = JSON.parse(abrStr);
        capObj = JSON.parse(capStr);
        conObj.forEach(ele =>{

            let temObj = {};

            myEmitter.emit(ele.continent, ele, capObj, abrObj, temObj);

            if(!fs.existsSync(`${__dirname}/${ele.continent}.json`)){
                fs.createWriteStream(`${__dirname}/${ele.continent}.json`)

                fs.appendFile(`${__dirname}/${ele.continent}.json`, JSON.stringify(temObj) + '\n', 'utf8', () =>{
                    console.log(`${__dirname}/${ele.continent}.json appended`)
                })
            } else {
                fs.appendFile(`${__dirname}/${ele.continent}.json`, JSON.stringify(temObj) + '\n', 'utf8', () =>{
                    console.log(`${__dirname}/${ele.continent}.json appended`)
                })
            }
            for(var member in temObj) delete temObj[member];
        });

    })

}

main();