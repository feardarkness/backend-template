// TODO All logs should have an application id

// SECURITY
// https://ajinabraham.github.io/nodejsscan/
// sonarqube, https://medium.com/swlh/nodejs-code-evaluation-using-jest-sonarqube-and-docker-f6b41b2c319d

// CI/CD online better 4 me
// Jenkins vs CircleCI vs Travis

// PM2 with all cores

// APM use sentry.io

// Security
// passwords with bcrypt
// validate with schemas
// support blacklisting JWT (if one of those is compromised, a way to avoid access must be set) express-jwt-blacklist

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { environment } = require('./config');
const { morganInstanceToFile, morganInstanceToConsole } = require('./lib/middleware/request-logger');
const EnvironmentEnum = require('./lib/enums/environment');
const logger = require('./lib/logger').child({
  from: 'app.js',
});
const rateLimitingMiddleware = require('./lib/middleware/rate-limiting');

// const { getId } = require('./lib/session');
// const Sentry = require('@sentry/node'); // init everything required
// const userRoutes = require('./components/users/usersRoutes');

const app = express();

app.use(helmet()); // setting a few security headers

// (security) remove x-powered-by express, security through obscurity?
app.disable('x-powered-by');

// START LIMITS ------------------------------------------------------------------------------
// setting limits on payload
app.use(
  bodyParser.urlencoded({
    limit: '1kb',
    extended: true,
  })
); // limit url encoded content

app.use(
  bodyParser.json({
    limit: '1kb',
    extended: false,
  })
); // limit json content
// app.use(express.multipart({ limit: '10mb' })); // limit multipart content (files)
// END LIMITS ------------------------------------------------------------------------------

// START LOGS --------------------------------------------------------------------------------
app.use(morganInstanceToFile);

if (environment === EnvironmentEnum.DEV) {
  app.use(morganInstanceToConsole);
}
// END LOGS --------------------------------------------------------------------------------

// START RATE-LIMITING -----------------------------------------------------------------------
// use only if no other option can be implemented, nginx is great doing this (https://www.nginx.com/blog/rate-limiting-nginx/)
// this should be implemented always for login (avoid brute force)
// TODO usually, better to use an external store (redis, memcached)
// app.set('trust proxy', 1); // if behind proxy

app.use(rateLimitingMiddleware(15, 100));
// app.use("/login", rateLimitingMiddleware(20, 100)); // using only for a few routes
// END RATE-LIMITING -----------------------------------------------------------------------

// here add routes
// app.use('/users', userRoutes);
app.get('/', (req, res) => {
  logger.info('here is another one -------------------------------------------------');
  res.send({
    asdsadsa: 12,
    end: process.env.NODE_ENV,
  });
});

module.exports = app;

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error) => {
  setTimeout(() => {
    logger.error('Fatal Error!!!', error);
    process.exit(1);
  }, 1000); // wait until the logger finally writes the error
});
