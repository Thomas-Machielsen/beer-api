const jwt = require('jsonwebtoken');
const localConfig = require('../config/localConfig');
const { ERROR, TOKEN } = require('../constants');

const returnToken = user => {
    return new Promise((resolve, reject)=> {
        user ? resolve(jwt.sign(user.get({plain: true}), localConfig.secret, {expiresIn: TOKEN.EXPIRING_TIME}))
            : reject({success: false, message: ERROR.LOGIN_FAILED});
    });
};

const findToken = req => {
    return req.body.token || req.query.token || req.headers['xaccess-token'] || req.headers.authorization;
};

const generateTokenToValidate = (token, validations) => {
    return {
        data: [token],
        validations: validations
    };
};

module.exports = { returnToken, generateTokenToValidate, findToken };
