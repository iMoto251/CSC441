const { dir } = require('console');
const fs = require('fs');

const ws = fs.createWriteStream(`${__dirname}/firsttest.json`);

const obj = {'class': 'CSC441', 'term': 'spring2021'};

ws.write(JSON.stringify(obj));
ws.end();

const rs = fs.createReadStream(`${__dirname}/firsttest.json`);

let body = '';

rs.on('data', (str) => body+=str);

rs.on('close',() => {
    console.log('body: ', body);
    let o = JSON.parse(body);
    Object.keys(o).forEach((key) =>{
        console.log(key, o[key]);
    })
})