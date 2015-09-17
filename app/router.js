'use strict';

const router = require('koa-router')();
const parse = require('koa-body')();

// handlers
const index = require('app/handlers/index');
const registration = require('app/handlers/registration');
const authentication = require('app/handlers/authentication');

module.exports = router

.get('/', index.showIndex)

.get('/signup', registration.showSignup)
.post('/signup', parse, registration.doSignup)

.get('/login', authentication.showLogin)
.post('/login', parse, authentication.doLogin)
