'use strict';

const render = require('app/render');

// post
module.exports = {
  showWriter: function *(next) {
    if (!this.state.user) {
      this.response.status = 403;
    } else {
      this.body = yield render('writer', {
        user: this.state.user
      })
    }
  },
  doSavePost: function *(next) {
    //
  }
};
