const dbConfig = require("../config/db");
const Sequelize = require("sequelize");
const authHelper = require("../utils/authHelper");
const Validator = require("../utils/validator/Validator");
const validations = require("../utils/validator/validations/validations");
const jwt = require('jsonwebtoken');

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
        .then(user => {
          authHelper.returnToken(user, jwt)
            .then(value => resolve(value))
            .catch(value => reject(value))
        })
        .catch(value => reject(value));
    });
  }

  isLoggedin(req) {
      const token = authHelper.findToken(req);

      const tokenWithValidations = authHelper.generateTokenToValidate(
        token,
        [
          { validation: validations.isTokenDefined },
          { validation: validations.verifyToken, params: [jwt] }
        ]
      );

      return this.callValidator(tokenWithValidations);
  }

  //@todo find a way to pass token to this function rather than the whole req thing
  isAdmin(req) {
    const token = authHelper.findToken(req);

    const tokenWithValidations = authHelper.generateTokenToValidate(
        token,
        [
          { validation: validations.authorizeToken, params: [jwt] }
        ]
      );

      return this.callValidator(tokenWithValidations);
  }

  callValidator(tokenWithValidations) {
    return new Promise((resolve, reject) => {
      Validator.validate(tokenWithValidations).then(value => {
        return value.success ? resolve() : reject(value);
      });
    });
  }

}();
