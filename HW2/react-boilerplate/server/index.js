/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

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

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
const options = {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
}

const { fsInMem } = setup(app, options);
const isProd = process.env.NODE_ENV === 'production';


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

app.get('/test',(req, res) => {
  res.json({course: 'csc441'}).end();
})

app.get('/gitget/:username',(req, res) => {
  const {username} = req.params;
  const response = fetch(`https://api.github.com/users/${username}/repos?type=all&sort=updated`, {
    method: 'GET'
  });
  
  //res => res.json();
  //const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  //const repos = yield call(request, requestURL);
  //console.log(`repos: ${JSON.stringify(repos)}`)
  //yield put(reposLoaded(repos, username));
  //res.json(ghrepos).end();
})


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
