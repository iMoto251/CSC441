var ifTag = function(str){
    let re = /<[^>]*>/ig;
    if (re.test(str)){
        return true;
    } else {
        return false;
    }
};

module.exports = {
    ifTag: ifTag
};