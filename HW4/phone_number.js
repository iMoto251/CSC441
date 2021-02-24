var isPNum = function(str){
    let re = /(\d[\s-]?)?[\(\[\s-]{0,3}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}/ig;
    if (re.test(str)){
        return str.match(re);
    } else {
        return 'No Phone Match';
    }
};

module.exports = {
    isPNum: isPNum
};