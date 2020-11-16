const bunyan = require('bunyan');
const path = require('path');
const { name } = require('../package.json');
const { logs, environment } = require('../config');
const Environment = require('./enums/environment');
const { getCurrentIsoDate } = require('./date');

// add uuid with continuation local storage (cls-hooked)

const streams = [
  {
    type: 'rotating-file',
    period: logs.fileLog.rotatePeriod, // period of rotation
    count: 10, // number of files rotated to be kept
    path: path.join(__dirname, `../${logs.logsPath}`, `log-${getCurrentIsoDate()}.log`),
  },
];

if (environment === Environment.DEV) {
  streams.push({
    level: 'info',
    stream: process.stdout,
  });
}

const log = bunyan.createLogger({
  name,
  streams,
});

module.exports = log;
