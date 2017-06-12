const dbConfig        = require('../config/db');
const Sequelize       = require('sequelize');
const RatingSchema    = require('./Rating');

const Beer = dbConfig.db.define('Beer', {
    name: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    style: Sequelize.STRING,
    brewer: Sequelize.STRING,
    desc: Sequelize.TEXT
  }
);

RatingSchema.Rating.belongsTo(Beer);
Beer.hasMany(RatingSchema.Rating);

module.exports = { Beer };