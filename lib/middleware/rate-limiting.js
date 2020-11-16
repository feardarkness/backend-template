const rateLimit = require('express-rate-limit');

module.exports = (windowInMinutes = 15, maxRequestPerWindow = 100, message) => {
  const limiter = rateLimit({
    windowMs: windowInMinutes * 60 * 1000,
    max: maxRequestPerWindow,
    message,
  });
  return limiter;
};
