const config = require("../utils/config");
const dbOptions = config.config.dbOptions; //eslint-disable-line prefer-destructuring

const Sequelize = require("sequelize");
const db = new Sequelize(
  dbOptions.database,
  dbOptions.user,
  dbOptions.password,
  {
    host: "localhost",
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

module.exports = { db };
