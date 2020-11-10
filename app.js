'use strict';
// all logs should have an application id
// ADD eslint with airbnb (https://www.npmjs.com/package/eslint-config-airbnb-base) and check eslint-plugin-node-security and eslint-plugin-mocha
// eslint unicorn https://github.com/sindresorhus/eslint-plugin-unicorn
// eslint prettier?

// SECURITY
// https://ajinabraham.github.io/nodejsscan/
// sonarqube, https://medium.com/swlh/nodejs-code-evaluation-using-jest-sonarqube-and-docker-f6b41b2c319d

// CI/CD online better 4 me
// Jenkins vs CircleCI vs Travis

// PM2 with all cores

// APM use sentry.io

// Security
// limit concurrent requests, (nginx rate limiting)
// add helmet
// passwords with bcrypt
// validate with schemas
// support blacklisting JWT (if one of those is compromised, a way to avoid access must be set) express-jwt-blacklist
// avoid brute force login https://www.npmjs.com/package/rate-limiter-flexible
// Limit payload size (nginx)
// remove all headers that we don't want (anything that tells you the technology)

require('dotenv').config();
const express = require('express');
const { morganInstanceToFile, morganInstanceToConsole } = require('./lib/middleware/requestLogger');
const { environment } = require('./config');
const EnvironmentEnum = require('./lib/enums/environment');
const logger = require('./lib/logger');

// const { getId } = require('./lib/session');
// const Sentry = require('@sentry/node'); // init everything required
// const userRoutes = require('./components/users/usersRoutes');

const app = express();

app.use(morganInstanceToFile);

if (environment === EnvironmentEnum.DEV) {
  app.use(morganInstanceToConsole);
}

// here add routes
// app.use('/users', userRoutes);
app.get('/', (req, res) => {
  // req.log.info('here it is, something amazing, special!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  logger.info('here is another one -------------------------------------------------');
  res.send({
    asdsadsa: 12,
  });
});

module.exports = app;

process.on('unhandledRejection', (reason, p) => {
  // I just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  throw reason;
});

process.on('uncaughtException', (error) => {
  // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
  // errorManagement.handler.handleError(error);
  // if (!errorManagement.handler.isTrustedError(error)) process.exit(1);
});
