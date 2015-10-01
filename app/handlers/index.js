'use strict';

module.exports = {
  showIndex: function *(next) {
    this.body = yield this.render('index');
  }
};
