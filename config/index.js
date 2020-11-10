'use strict';

const database = require('./config');
const logs = require('./logs');
const locale = require('./locale');

module.exports = {
  database,
  logs,
  locale,
  environment: process.env.NODE_ENV || 'development',
};
