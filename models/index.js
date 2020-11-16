const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const { database: config } = require('../config');

const databaseObjects = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// eslint-disable-next-line security/detect-non-literal-fs-filename
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require, security/detect-non-literal-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    databaseObjects[model.name] = model;
  });

Object.keys(databaseObjects).forEach((modelName) => {
  // eslint-disable-next-line security/detect-object-injection
  if (databaseObjects[modelName].associate) {
    // eslint-disable-next-line security/detect-object-injection
    databaseObjects[modelName].associate(databaseObjects);
  }
});

databaseObjects.sequelize = sequelize;
databaseObjects.Sequelize = Sequelize;

module.exports = databaseObjects;
