const Promise = require('bluebird');
const fetch = require('node-fetch');
fetch.Promise = Promise;
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json';
const ws = fs.createWriteStream(`${__dirname}/test.json`)

const main = async () => {
    const response = await fetch(url);
    response.body.pipe(ws);
    ws.on('close', () =>{
        console.log('test.json is closed');
    })
    //const body = await response.body();
    // let str = '';
    // response.body.on('data', d=> str+=d);
    // response.body.on('end',()=>{
    //     console.log(str);
    //     const ws = fs.createWriteStream(`${__dirname}/test.json`);
    //     ws.write(str);
    //     ws.end
    // })
    //console.log(response);
}

main();