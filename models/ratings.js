const Sequelize     = require('sequelize');
const dbConfig      = require('../config/db');

const Rating = dbConfig.db.define('Rating', {
  rating: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  beer_id: Sequelize.INTEGER,
  } , {
    classMethods: {
      associate: (models) => {
        Rating.belongsTo(models.Beer, {
          foreignKey: beer_id,
        })
      },
    },
  return Rating;
  }
);