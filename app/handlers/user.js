'use strict';

module.exports = {
  showProfile: function *(next) {
    this.body = yield this.render('profile', {
      profile: {
        username: this.params.username
      }
    });
  }
};
