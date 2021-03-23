const fetch = require('node-fetch');

async function postData(url='', data={}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cashe',
      credentials: 'same origin',
      headers: { 'Content-Type':'application/json' },
      redirect: 'follow',
      referPolicy: 'no-referrer',
      //body: JSON.strigify(data)
    });
    const result = response.json();
    return result;
  } catch (e) {
    console.log('postData:Exception: ', e);
  }
}

const result = postData('http://localhost:3000/signup', {username:'wlburkes', password:'temp123'});
