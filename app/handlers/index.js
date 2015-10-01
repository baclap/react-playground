'use strict';

const render = require('app/render');

module.exports = {
  showIndex: function *(next) {
    this.body = yield this.render('index');
  }
};
