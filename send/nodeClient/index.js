const fetch = require('node-fetch');

async function postData(url='', data={}) {
  try {
    const responce = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cashe',
      credentials: 'same origin',
      headers: { 'Content-Type':'application/json' },
      redirect: 'follow',
      referPolicy: 'no-referrer',
      body: JSON.strigify(data)
    });
    const result = await responce.json();
    return result;
  } catch (e) {
    console.log('postData:Exception: ', e);
  }
}

const result = postData('http://localhost:3000/signup', {username:'rtgrantland', password:'tmp123'});
