'use strict';

// read: users "db" ;)
const usersDB = [
  {
    id: 1,
    username: 'john',
    password: 'password'
  },
  {
    id: 2,
    username: 'suzy',
    password: 'abc123'
  }
]

//allows you to load in jsx
require('babel/register');
const React = require('react');
const underscore = require('underscore');

const koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body')();
const views = require('koa-views');
const serve = require('koa-static');
const jwt = require('koa-jwt');

const app = koa();

// all request pass through authentication layer
// will set this.state.user if the JWT verifies
// if this.state.user is not set then you know the user is not authenticated
app.use(jwt({
  secret: 'secret', // TODO change to use RS256 https://sendgrid.com/blog/json-web-tokens-koa-js/
  cookie: 'jwt', // the name of the cookie where auth token is saved
  passthrough: true // will allow request to continue through middleware stack with ctx.state.user set to null
}));

app.use(logger());
app.use(views('app/views', {
  map: {
    html: 'underscore'
  }
}));

// koa-static used to serve static assets in assets directory
app.use(serve('app/assets'));

// response
router
  .get('/', function *(next) {
    yield this.render('home', {
      user: this.state.user
    })
  })
  .get('/hello', function *(next) {
    yield this.render('hello')
  })
  .get('/about', function *(next) {
    this.body = "<!DOCTYPE html><head><title>About</title></head><body>About Us</body></html>";
  })
  .get('/react', function *(next) {
    yield this.render('react')
  })
  .get('/react-iso', function *(next) {
    const Button = React.createFactory( require('./app/src/js/components/button.jsx') );

    yield this.render('react-iso', {
      button: React.renderToString(Button({}))
    })
  })
  .get('/json', function *(next) {
    this.body = {
      name: 'brett',
      number: 83,
      isProgrammer: true
    };
  })

  // login
  .get('/login', function *(next) {
    yield this.render('login');
  })
  .post('/login', koaBody, function *(next) {
    // submitted credentials
    const username = this.request.body.username;
    const password = this.request.body.password;

    // find user from "database"
    let user = null;
    usersDB.forEach(userRecord => {
      if (
        userRecord.username === username
        && userRecord.password === password
      ) {
        user = userRecord;
      }
    })

    if (user) {
      // user successfully logged in

      // create token
      const token = jwt.sign(user, 'secret');

      // set token cookie
      this.cookies.set('jwt', token);

      // send user to homepage
      this.redirect('/');
    } else {
      // user login unsuccessful
      this.redirect('/');
    }

  });

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;

// start app if it isn't being required into another module
if (!module.parent) {
  const port = process.env.PORT || 9999;
  app.listen(port);
  console.log('Listening on port ' + port);
}
