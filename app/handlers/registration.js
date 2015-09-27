'use strict';

const render = require('app/render');
const bcrypt = require('co-bcrypt');
const User = require('app/models/user');
const r = require('thinky')().r;

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

    // ensure username is available and email isn't in db
    const results = yield User.filter(
      r.row('username').match('(?i)^' + username + '$')
      .or(r.row('email').match('(?i)^' + email + '$'))
    ).run();

    if (results.length) {
      // dupe found
      // TODO: better error handling
      console.log('Error: dupe found');
      this.body = yield render('signup');
    } else {
      // hash password and save user
      const salt = yield bcrypt.genSalt(10);
      const hash = yield bcrypt.hash(password, salt)
      const user = new User({
        username: username,
        email: email,
        hash: hash
      });
      const doc = yield user.save();
      this.redirect('/');
    }
  }
};
