const jwt = require('jsonwebtoken');
const localConfig = require('../config/localConfig');
const ERROR = require('../constants');

const expiringTime = '10h';

const returnToken = user => {
    return new Promise((resolve, reject)=> {
        user ? resolve(jwt.sign(user.get({plain: true}), localConfig.secret, {expiresIn: expiringTime}))
            : reject({success: false, message: ERROR.LOGIN_FAILED});
    });
};

module.exports = { returnToken };
