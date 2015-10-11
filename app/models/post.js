'use strict';

const config = require('app/config');
const thinky = require('thinky')(config.db);
const type = thinky.type;
const User = require('app/models/user');

const Post = thinky.createModel('Post', {
  id: type.string(),
  userId: type.string().required(),
  date: type.date().required(),
  title: type.string().required(),
  content: type.string().required()
});

Post.ensureIndex('date');

Post.belongsTo(User, 'user', 'userId', 'id');

module.exports = Post;
