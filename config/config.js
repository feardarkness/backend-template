// read everything from environment
const configs = {
  username: 'root',
  password: null,
  database: 'database_development',
  host: '127.0.0.1',
  dialect: 'mysql',
};
module.exports = {
  development: configs,
  test: configs,
  production: configs,
};
