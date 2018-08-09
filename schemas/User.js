const Sequelize = require("sequelize");
const dbConfig = require("../config/db");
const { createHashPasswordFn } = require('../libs/hashPassword/salt-hash-password');

const hashPassword = createHashPasswordFn(parseInt(process.env.HASH_SALTLEN, 10), parseInt(process.env.HASH_ITERATIONS, 10), parseInt(process.env.HASH_KEYLEN, 10), process.env.HASH_DIGEST);

const User = dbConfig.db.define("User", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

User.beforeCreate(user => {
  const pw = hashPassword(user.password);
  return pw.then(value => {
    user.password = `${value.hash}${process.env.SPLIT_STRING}${value.salt}`;
  });
});

module.exports = { User };