const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const { logs } = require('../../config');
const { getCurrentIsoDate } = require('../date');

const accessLogStream = rfs.createStream(`access-${getCurrentIsoDate()}.log`, {
  interval: logs.fileLog.rotatePeriod,
  path: path.join(__dirname, `../../${logs.logsPath}`),
  compress: 'gzip',
});

// eslint-disable-next-line no-unused-vars
const skip = (req, res) => {
  // here we can check which url should be logged
  return false;
};

// setup the logger
const morganInstanceToFile = morgan('combined', {
  stream: accessLogStream,
  flags: 'a',
  skip,
});

const morganInstanceToConsole = morgan('dev', {});

module.exports = {
  morganInstanceToFile,
  morganInstanceToConsole,
};
