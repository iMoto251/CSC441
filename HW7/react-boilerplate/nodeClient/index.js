const fetch = require('node-fetch');

async function getRequests(){
  var res = await fetch('http://localhost:3000', {method: 'GET'});
  console.log("___Request 1___\n")
  console.log("Request 1 Headers:\n", res.headers);
  console.log("Request 1 Response:\n", res);
  console.log("Request 1 Cookie:\n", res.headers.get('set-cookie'));
  console.log("_______________\n\n");

  var cookie = res.headers.get('set-cookie');
  var x_csrf_token = res.headers.get('X_CSRF_Token');

  var res2 = await fetch('http://localhost:3000/signup', {method: 'POST', headers: {'Cookie': cookie, 'Content-Type': 'application/json'}, body: JSON.stringify({username: 'wburkes', password: 'wlb123'})});
  console.log("___Request 2___\n")
  console.log("Request 2 Headers:\n", res2.headers);
  console.log("Request 2 Response:\n", res2);
  console.log("Request 2 Cookie:\n", res2.headers.get('set-cookie'));
  console.log("_______________\n\n");


  var res3 = await fetch('http://localhost:3000/signup', {method: 'POST', headers: {'Cookie': cookie, 'x-csrf-token':x_csrf_token, 'Content-Type': 'application/json'}, body: JSON.stringify({username: 'wburkes', password: 'wlb123'})});
  console.log("___Request 3___\n")
  console.log("Request 3 Headers:\n", res3.headers);
  console.log("Request 3 Response:\n", res3);
  console.log("Request 3 Cookie:\n", res3.headers.get('set-cookie'));
  console.log("_______________");
}

getRequests();