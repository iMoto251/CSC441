var ifCurr = function(str){
    let re = /[+-]?\$[1-9]{1,3}[KMB]/ig;
    if (re.test(str)){
        console.log(str.match(re))
        return true;
    } else {
        re = /[+-]?\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?/ig;
        if (re.test(str)){
            console.log(str.match(re))
            return true;
        } else{
            re = /[+-]?USD[1-9]{1,3}[KMB]/ig;
            if (re.test(str)){
                console.log(str.match(re))
                return true;
            } else {
                return false;
            }
        }
    }
}

module.exports = {
    ifCurr: ifCurr
};