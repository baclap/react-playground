'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const views = require('koa-views');

const app = koa();

app.use(logger());
app.use(views('views'));

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
  });
app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;

// start app if it isn't being required into another module
if (!module.parent) {
  const port = process.env.PORT;
  app.listen(port);
  console.log('Listening on port ' + port);
}
