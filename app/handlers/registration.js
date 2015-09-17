'use strict';

const render = require('app/render');
const bcrypt = require('co-bcrypt');
const db = require('app/db');

let nextId = 1;

module.exports = {
  showSignup: function *(next) {
    this.body = yield render('signup');
  },
  doSignup: function *(next) {
    // submitted credentials
    const username = this.request.body.username;
    const email = this.request.body.email;
    const password = this.request.body.password;

    const salt = yield bcrypt.genSalt(10);
    const hash = yield bcrypt.hash(password, salt)

    db.user.push({
      id: nextId++,
      username: username,
      email: email,
      hash: hash
    });

    this.redirect('/');
  }
};
