'use strict';

const render = require('app/render');

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
