'use strict';

const render = require('app/render');
const bcrypt = require('co-bcrypt');
const jwt = require('koa-jwt');

module.exports = {
  showProfile: function *(next) {
    this.body = yield render('profile', {
      user: this.state.user,
      profile: {
        username: this.params.username
      }
    });
  }
};
