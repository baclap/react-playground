'use strict';

const router = require('koa-router')();
const parse = require('koa-body')();

// handlers
const index = require('app/handlers/index');
const registration = require('app/handlers/registration');
const authentication = require('app/handlers/authentication');
const user = require('app/handlers/user');
const post = require('app/handlers/post');

module.exports = router

.get('/', index.showIndex)

.get('/signup', registration.showSignup)
.post('/signup', parse, registration.doSignup)

.get('/login', authentication.showLogin)
.post('/login', parse, authentication.doLogin)
.get('/logout', authentication.doLogout)

.get('/writer', post.showWriter)
.post('/writer', post.doSavePost)

.get('/profile/:username', user.showProfile)
