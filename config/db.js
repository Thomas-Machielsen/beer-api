const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABSE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

module.exports = { db };
