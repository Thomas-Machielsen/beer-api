const dbConfig = require("../config/db");
const Sequelize = require("sequelize");
const authHelper = require("../utils/authHelper");
const Validator = require("../utils/validator/Validator");

const User = dbConfig.db.define("User", {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = new class UsersModel {
  getToken(req) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          username: req.body.username,
          password: req.body.password
        },
        raw: true,
        attributes: ["username", "role"]
      })
        .then(user =>
          authHelper.returnToken(user, null).then(value => resolve(value))
        )
        .catch(value => reject(value));
    });
  }

  authenticate(req, next, validations) {
    return new Promise(reject => {
      const token = authHelper.findToken(req);
      const tokenWithValidations = authHelper.generateTokenToValidate(
        token,
        validations
      );

      Validator.validate(tokenWithValidations).then(value => {
        return value.success ? next() : reject(value);
      });
    });
  }
}();
