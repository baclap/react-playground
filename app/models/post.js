'use strict';

const config = require('app/config');
const thinky = require('thinky')(config.db);
const type = thinky.type;

module.exports = thinky.createModel('Post', {
  id: type.string(),
  date: type.date().required(),
  title: type.string().required(),
  content: type.string().required(),
  unpublished: type.boolean()
});
