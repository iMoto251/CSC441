//import ifCurr from './currency.js';

var ifCurr = require('./currency').ifCurr;
var ifTag = require('./tags').ifTag;
var ifDate = require('./dates').ifDate;
var ifPNum = require('./phone_number').ifPNum;
const fs = require('fs');
const readline = require('readline');

const main = async() => {
        const rl = readline.createInterface({
        input: fs.createReadStream(`${__dirname}/input.txt`),
        crlfDelay: Infinity
    });
    rl.on('line', (line) =>{
        if(ifTag(line)){
            console.log("This line has HTML elements, so it was ignored for regex");
        }else{
            ifCurr(line);
            ifDate(line);
            ifPNum(line);
        }
    })
}

main();