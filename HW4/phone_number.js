var ifPNum = function(str){
    let re = /(\d[\s-]?)?[\(\[\s-]{0,3}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}/g;
    if (re.test(str)){
        console.log(str.match(re))
        return true;
        //return str.match(re);
    } else {
        return false;
    }
};

module.exports = {
    ifPNum: ifPNum
};