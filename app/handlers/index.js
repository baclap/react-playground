'use strict';

const Post = require('app/models/post');
const r = require('thinky')().r;

module.exports = {
  showIndex: function *(next) {
    const results = yield Post.orderBy({index: r.desc('date')}).getJoin({user: true}).run();
    this.body = yield this.render('index',{
      posts: results
    });
  }
};
