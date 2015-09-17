'use strict';

const render = require('app/render');
const bcrypt = require('co-bcrypt');
const jwt = require('koa-jwt');
const db = require('app/db');

module.exports = {
  showLogin: function *(next) {
    this.body = yield render('login');
  },
  doLogin: function *(next) {
    // submitted credentials
    const username_email = this.request.body.username_email;
    const password = this.request.body.password;

    // db lookup
    let user = null;
    const lookupByEmail = (username_email.indexOf('@') != -1);
    for (let i in db.user) {
      const userRecord = db.user[i];
      if (lookupByEmail) {
        if (userRecord.email = username_email) {
          user = userRecord;
          break;
        }
      } else {
        if (userRecord.username = username_email) {
          user = userRecord;
          break;
        }
      }
    }

    let error = false;
    if (user) {
      // now check if the submitted password is correct
      const success = yield bcrypt.compare(password, user.hash)
      if (success) {
        console.log('success');
        // create token
        const token = jwt.sign({
          id: user.id,
          username: user.username,
          email: user.email
        }, 'secret');

        // set token cookie
        this.cookies.set('jwt', token);

        // send user to homepage
        this.redirect('/')
      } else {
        error = "Incorrect password";
      }
    } else {
      error = "User not found";
    }

    if (error) {
      // ensure token is not set... might not be needed, will think on it
      this.cookies.set('jwt', null);
      this.body = yield render('login', {
        failed: true
      });
    }
  }
};
