const dbConfig = require("../config/db");
const Sequelize = require("sequelize");
const authHelper = require("../utils/authHelper");
const Validator = require("../utils/validator/Validator");
const validations = require("../utils/validator/validations/validations");
const { buildHashPassword } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const { isPasswordCorrect } = require('../libs/hashPassword/salt-hash-password');
const { LOGIN_FAILED } = require("../constants").ERROR;
const { DB_DOWN } = require("../constants").STATUSCODES;

const User = dbConfig.db.define("User", {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = new class UsersModel {
  getToken(req) {
    const iterations = parseInt(process.env.HASH_ITERATIONS, 10);
    const keylen = parseInt(process.env.HASH_KEYLEN, 10);
    const digest = process.env.HASH_DIGEST;
    const splitString = process.env.SPLIT_STRING;

    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          username: req.body.username
        },
        raw: true,
        attributes: ["username", "role", "password"]
      })
        .then(user => {
          const passwordToCheck = buildHashPassword(user.password, splitString, iterations, keylen, digest);

          isPasswordCorrect(passwordToCheck, req.body.password)
            .then(passwordIsCorrect => {
              if (!passwordIsCorrect) { reject(LOGIN_FAILED) }

              authHelper.returnToken(user, jwt)
                .then(value => resolve(value))
                .catch(value => reject(value))
            });
        })
        .catch(() => reject(DB_DOWN));
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
