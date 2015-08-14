'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const views = require('koa-views');
const serve = require('koa-static');

const app = koa();

app.use(logger());
app.use(views('app/views'));

// koa-static used to serve static assets in assets directory
app.use(serve('app/assets'));

// response
router
  .get('/', function *(next) {
    yield this.render('home')
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
  .get('/json', function *(next) {
    this.body = {
      name: 'brett',
      number: 83,
      isProgrammer: true
    };
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
