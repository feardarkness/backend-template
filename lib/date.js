'use strict';

const { DateTime } = require('luxon');
const { locale } = require('../config');

const getInstanceWithLocale = () => {
  const dt = DateTime.local();
  dt.setLocale(locale.format);
  return dt;
};

const getCurrentIsoDate = () => {
  const dt = getInstanceWithLocale();
  return dt.toISODate();
};

module.exports = {
  getCurrentIsoDate,
};
