//const str = '<p><html>i have $300, my number is 001-601-266-4949, and it is January 05, 2021</html></p>';

var isTag = function(str){
    let re = /(&nbsp;|<[^>]+)>)/ig;
    if (re.test(str)){
        return str.match(re);
    } else {
        return 'No tags match';
    }
};

module.exports = {
    isTag: isTag
};