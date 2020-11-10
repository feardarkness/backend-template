const bunyan = require('bunyan');
const path = require('path');
const name = require('../package.json').name;
const { logs, environment } = require('../config');
const Environment = require('./enums/environment');

const streams = [
  {
    type: 'rotating-file',
    period: logs.fileLog.rotatePeriod, // period of rotation
    count: 10, // number of files rotated to be kept
    path: path.join(__dirname, `../${logs.logsPath}`, ''),
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
