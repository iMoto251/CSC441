//1
true

//2
return rp({
    method: 'GET',
    url: "https://test.url/testurl", 
    headers: {
       'X-CSRF-Token': "yv34nYKZTUH63nEvuQ1bf48E5KLHz8scspsqDHgm"
    }
}).then(function (html) {
})

//4
async function getData(url = '', data = {}) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {'X-CSRF-Token'
      });
  
      var cookie = response.headers.get('Set-Cookie');
      var xCsrfToken = response.headers.get('X-CSRF-Token');
      return {cookie, xCsrfToken};
    } catch (e) {
      console.log('postData:Exception: ', e);
    }
  }

//6
app.post('/signup', csrfProtection, (req, res) => {
    const body = req.body;
    console.log('body: ', JSON.stringify(body))
    res.send(`${JSON.stringify(body)}\n`)
  })

//8
app.post('/', function (req,res) {
    try{
        JSON.parse(req.body);
    } catch (e) {
        return false;
    }
    return res.body;
})

//9
app.get('/', function(req, res){
    let re = /(\d[\s-]?)?[\(\[\s-]{0,3}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}/g;
    if (re.test(req.body)){
        return res.body;
    } else {
        return false;
    }
})

//10
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('images'));

app.listen(3000);