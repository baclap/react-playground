'use strict';

const render = require('app/render');
const Post = require('app/models/post');

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
    if (!this.state.user) {
      this.response.status = 403;
    } else {
      const post = new Post({
        title: this.request.body.title,
        date: this.request.body.date,
        content: this.request.body.content,
        unpublished: this.request.body.unpublished
      });
      const doc = yield post.save();
      this.redirect('/');
    }
  }
};
