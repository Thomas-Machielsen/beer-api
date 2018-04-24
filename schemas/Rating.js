const dbConfig = require("../config/db");
const Sequelize = require("sequelize");

const Rating = dbConfig.db.define("Rating", {
  rating: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  beerId: Sequelize.INTEGER
});

const associations = (Beer) => {
  Rating.belongsTo(Beer);
};

module.exports = { Rating, associations };
