const Sequelize = require("sequelize");
const dbConfig = require("../config/db");

const User = dbConfig.db.define("User", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = { User };