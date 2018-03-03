const dbConfig = require('../config/db');
const Sequelize = require('sequelize');
const authHelper = require('../utils/authHelper');
const Validator = require('../utils/validator/Validator');
const validations = require('../utils/validator/validations/validations');

const User = dbConfig.db.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = new class UsersModel {

    getToken(req) {
        return new Promise((resolve, reject) => {
            User
                .findOne({
                    where: {
                        username: req.body.username,
                        password: req.body.password
                    },
                    attributes: ['username', 'role']
                })
                .then((user) => authHelper.returnToken(user)
                    .then((value) => resolve(value)))
                    .catch((value) => reject(value));
        });
    }

    // @todo these functions are too much the same think of something better
    authenticate(req, res, next) {
        return new Promise((reject) => {
            // @todo getToken function
            const token = req.body.token || req.query.token || req.headers['xaccess-token'] || req.headers.authorization;

            // @todo build tokenToValidate
            const tokenToValidate = {
                data: [token],
                validations: [validations.isTokenDefined, validations.verifyToken]
            };

            Validator.validate(tokenToValidate).then((value) => {
                value.success ? next() : reject(value);
            });
        });
    }

    authorize(req, res, next) {
        return new Promise((reject) => {
            const token = req.body.token || req.query.token || req.headers['xaccess-token'] || req.headers.authorization;

            const tokenToValidate = {
                data: [token],
                validations: [validations.isTokenDefined, validations.verifyToken, validations.authorizeToken]
            };

            Validator.validate(tokenToValidate).then((value) => {
                value.success ? next() : reject(value);
            });
        });
    }

}();

