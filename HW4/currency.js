//const str = '<p><html>i have $300, my number is 001-601-266-4949, and it is January 05, 2021</html></p>';

var isCurrency = function(str){
    let re = /[+-]?\$[1-9]{1,3}[KMB]/ig;
    if (re.test(str)){
        return str.match(re);
    } else {
        re = /[+-]?\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?/ig;
        if (re.test(str)){
            return str.match(re);
        } else{
            re = /[+-]?USD[1-9]{1,3}[KMB]/ig;
            if (re.test(str)){
                return str.match(re);
            } else {
                return 'No currency match';
            }
        }
    }
}

module.exports = {
    isCurrency: isCurrency
};