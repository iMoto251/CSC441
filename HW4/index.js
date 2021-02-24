var isCurrency = require('./currency').isCurrency;
var isTag = require('./tags').isTag;
var isDate = require('./dates').isDate;
var isPNum = require('./phone_number').isPNum;

const fs = require('fs');
//const readline = require('readline');

const main = async() => {
    let body = '';
    const rs = fs.createReadStream('input.txt');
    rs.on('data', (str) => body += str);

    rs.on('end', () => {
        console.log(isCurrency(body));
        console.log(isTag(body));
        console.log(isDate(body));
        console.log(isPNum(body));
    })
}

main();