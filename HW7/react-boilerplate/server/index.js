/* eslint consistent-return:0 import/order:0 */
const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'))
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const argon2 = require('argon2');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
const csurf = require('csurf');

const logger = require('./logger');

var csrfProtection = csurf();

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');

const client = redis.createClient();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  session({
    store: new RedisStore({ client: client }),
    secret: 'aee7d3d9aa69972eb2f767d41be45f8e1d71618a817232c2e08d8129f218f0a4',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365*24*60*60
    }
  })
)

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

app.get('/test',(req, res) => {
  res.json({course: 'csc441'}).end();
})

app.get('/gitget/:username', async (req, res) => {
  const {username} = req.params;
  const re = /^[a-z]{1,128}$/i
  if(re.test(username)) {
    //make a request to api.github.com and pass username
    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
    const fetch_res = await fetch(requestURL);
    fetch_res.body.pipe(res);
    return;
  }
  res.status(404).send('invalid username! (only letters are allowed)')
  //take the json from the response and send it to the client
  //res.json({course: 'csc441', username}).end();
})

app.get('/ab+*e',(req, res)=>{
  res.send(`${req.url}\n`)
})

app.get(/^\/main~([a-z0-9]{8})\.([a-z0-9]{20})\.js(\.gz|\.LICENSE\.txta)?$/,(req, res)=>{
  console.log(`handler-1:${req.url}\n`)
  res.send(`${req.url}\n`)
})

app.post('/signup', csrfProtection, (req, res) => {
  const body = req.body;
  console.log('signup:body: ', body)
  res.json(body)
})


app.post('/signin', (req, res) => {
  const body = req.body;
  console.log('signin:body: ', body);
  res.json(body);
})

app.get('/argon2/:pw', async (req, res) => {
  const {pw} = req.params;
  console.log('pw: ', pw)
  try {
    const enc_pw = await argon2.hash(pw)
    console.log('enc_pw: ', enc_pw)
    const result = await client.setAsync(pw, enc_pw);
    console.log('result: ', result)
    //res.json({pw, enc_pw})
    //res.send(`${JSON.stringify({pw, enc_pw})}\n`)
    res.send('OK\n')
  } catch(e){
    res.sendStatus(500)
  }
})

//const enctmp123 = "$argon2i$v=19$m=4096,t=3,p=1$pMNKVUhKCL4NbUABWPXVgQ$8ZTz3NHldaxC+wyqVFetAkuR+4y2f/Rkdl+rBPmphVM"

app.get('/argon2/verify/:pw', async (req, res) => {
  const {pw} = req.params;
  console.log('pw: ', pw)
  try {
    console.log('client.getAsync: ', client.getAsync)
    const enc_pw = await client.getAsync(pw);
    console.log('enc_pw: ', enc_pw)
    const verified_pw = await argon2.verify(enc_pw, pw)
    if(verified_pw) {
    //res.json({pw, enc_pw})
      res.send(`${JSON.stringify({pw, verified_pw})}\n`)
    } else {
      res.send('you are a stranger!\n')
    }
  } catch(e){
    console.log('/argon2/verify/:pw:Exception: ',e)
    res.sendStatus(500)
  }
})



const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
  app.get('*', (req, res) => {
    console.log(`wildcard:${req.url}`)

    res.sendFile(path.resolve(outputPath, 'index.html'))
  });
} else {

  app.get('*', csrfProtection, (req, res) => {
    console.log('options: ', options)
    console.log('url: ', req.url)
    if (req.session.views){
      req.session.views++;
    } else {
      req.session.views = 1;
    } console.log('session: ', req.session)
    const csrf_token = req.csrfToken();
    console.log('csrf_token: ', csrf_token);
    res.setHeader('X-CSRF-Token', csrf_token)
    const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
    fsInMem.readFile(path.join(options.outputPath, 'index.html'), (err, file) => {
      if (err) { console.log('err: ', err) }
      //console.log('file: ', file)
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString().replace("{{csrfToken}}", csrf_token));
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
