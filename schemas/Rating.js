const dbConfig        = require('../config/db');
const Sequelize       = require('sequelize');

const Rating = dbConfig.db.define('Rating', {
    rating: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    beerId: Sequelize.INTEGER
  }
);

module.exports = { Rating };