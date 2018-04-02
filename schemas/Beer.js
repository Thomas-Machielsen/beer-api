const dbConfig = require("../config/db");
const Sequelize = require("sequelize");

const Beer = dbConfig.db.define("Beer", {
  name: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  style: Sequelize.STRING,
  brewer: Sequelize.STRING,
  desc: Sequelize.TEXT
});

/**
 * function assocations, couples Rating & Beer
 * @param {Object} Rating - the Rating class
 */
function associations(Rating) {
  Beer.hasMany(Rating);
}

module.exports = { Beer, associations };
