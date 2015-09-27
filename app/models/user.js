'use strict';

const config = require('app/config');
const thinky = require('thinky')(config.db);
const type = thinky.type;

module.exports = thinky.createModel('User', {
  id: type.string(),
  username: type.string().regex('[a-z][a-z0-9_]{2,15}', 'i').required(),
  email: type.string().email().required(),
  hash: type.string().required()
});
