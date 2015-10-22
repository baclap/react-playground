'use strict';

const koa = require('koa');
const logger = require('koa-logger');

const app = koa();
app.use(logger());
app.use(serve('public'));
app.listen(3333);
console.log('Listening on 3333...');
