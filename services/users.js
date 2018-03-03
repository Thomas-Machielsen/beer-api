const dbConfig = require('../config/db');
const Sequelize = require('sequelize');


const User = dbConfig.db.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = new class UsersModel {

    getUsers() {
        return new Promise((resolve, reject) => {
            User
                .findAll({
                    attributes: ['username', 'role']
                })
                .then(users => resolve(users))
                .catch(reject);
        })
    }

}();

