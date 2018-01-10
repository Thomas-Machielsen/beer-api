const dbConfig = require('../config/db');
const Sequelize = require('sequelize');
const authHelper = require('../utils/authHelper');


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
                    attributes: ['username']
                })
                .then((user) => {
                    authHelper.returnToken(user, resolve, reject);
                });
        });
    }

    authenticate(req, res, next) {
        return new Promise((reject) => {
                // check header or url parameters or post parameters for token
                const token = req.body.token || req.query.token || req.headers['xaccess-token'] || req.headers.authorization;
                authHelper.authToken(res, next, token, reject);
            }
        );
    }

}();

