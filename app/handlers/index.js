'use strict';

const render = require('app/render');

module.exports = {
  showIndex: function *(next) {
    this.body = yield render('index', {
      user: this.state.user
    });
  }
};
