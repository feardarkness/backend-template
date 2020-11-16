// TODO All logs should have an application id

// SECURITY
// https://ajinabraham.github.io/nodejsscan/
// sonarqube, https://medium.com/swlh/nodejs-code-evaluation-using-jest-sonarqube-and-docker-f6b41b2c319d

// CI/CD online better 4 me
// Jenkins vs CircleCI vs Travis

// PM2 with all cores

// APM use sentry.io

// Security
// limit concurrent requests, (nginx rate limiting)
// passwords with bcrypt
// validate with schemas
// support blacklisting JWT (if one of those is compromised, a way to avoid access must be set) express-jwt-blacklist
// avoid brute force login https://www.npmjs.com/package/rate-limiter-flexible
// Limit payload size (nginx)
// remove all headers that we don't want (anything that tells you the technology)

// TODO setting an id for all logs

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { morganInstanceToFile, morganInstanceToConsole } = require('./lib/middleware/request-logger');
const { environment } = require('./config');
const EnvironmentEnum = require('./lib/enums/environment');
const logger = require('./lib/logger').child({
  from: 'app.js',
});

// const { getId } = require('./lib/session');
// const Sentry = require('@sentry/node'); // init everything required
// const userRoutes = require('./components/users/usersRoutes');

const app = express();

app.use(helmet()); // setting a few security headers

// setting limits on payload
app.use(express.urlencoded({ limit: '1kb' })); // limit url encoded content
app.use(
  bodyParser.json({
    limit: '1kb',
    extended: false,
  })
); // limit json content

// app.use(express.multipart({ limit: '10mb' })); // limit multipart content (files)

app.use(morganInstanceToFile);

if (environment === EnvironmentEnum.DEV) {
  app.use(morganInstanceToConsole);
}

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
