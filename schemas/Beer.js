const dbConfig        = require('../config/db');
const Sequelize       = require('sequelize');

const Beer = dbConfig.db.define('Beer', {
    name: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    style: Sequelize.STRING,
    brewer: Sequelize.STRING,
    desc: Sequelize.TEXT
  }
);

module.exports = { Beer };