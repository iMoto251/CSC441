/* eslint consistent-return:0 import/order:0 */

const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const argon2 = require('argon2');

const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();
const client = redis.createClient();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
const options = {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
}

const { fsInMem } = setup(app, options);

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// app.get('/test', (req, res)=>{
//   res.json({course: 'csc441'}).end();
// });

app.get('/gitget/:username', (req, res)=>{
  const {username} = req.params;
  // make a request using fetch to api.github.com and pass username
  fetch(`https://api.github.com/users/${username}/repos?type=all&sort=updated`).then(res => res.json()).then(json => res.send(json));
  //next();
  // take the json from the responce and send it to the client
  //res.json({course: 'csc441', username: username}).end();
});

app.get('/argon2/:pw', async (req, res) => {
  const {pw} = req.params;
  try{
    const enc_pw = await argon2.hash(pw);
    const result = await client.setAsync(pw, enc_pw);
    console.log('result: ', result);
    res.send('OK\n');
  } catch (e) {
    res.sendStatus(500);
  }
});

app.get('/argon2/verify/:pw', async (req, res) => {
  const {pw} = req.params;
  try {
    const enc_pw = await client.getAsync(pw);
    const verified_pw = await argon2.verify(enc_pw, pw);
    if (verified_pw) {
      res.send(`${JSON.stringify({pw, verified_pw})}\n`);
    } else {
      res.send('you are a stranger');
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

app.post('/signup', (req, res) => {
  const body = req.body;
  
});

app.post('/signin', (req, res) => {
  
});

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(outputPath, 'index.html')),
  );
} else {
  app.get('*', (req, res) => {
    fsInMem.readFile(path.join(options.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
}

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
