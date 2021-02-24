var ifDate = function(str){
    let re = /\w+\s+\d{1,2},\s\d{4}/g;
    if (re.test(str)){
        console.log(str.match(re))
        return true;
    } else {
        re = /\d{1,2}\/\d{1,2}\/\d{2}/g;
        if(re.test(str)){
            console.log(str.match(re))
            return true;
        } else{
            re = /\d{2}-[a-zA-Z]{3},\s\d{4}/g;
            if (re.test(str)){
                console.log(str.match(re))
                return true;
            }else{
                re = /\d{4}-\d{2}-\d{2}/g;
                if (re.test(str)){
                    console.log(str.match(re))
                    return true;
                } else{
                    return false;
                }
            }
        }
    }
}

module.exports = {
    ifDate: ifDate
};