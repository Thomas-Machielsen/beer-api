const jwt = require('jsonwebtoken');
const localConfig = require('../config/localConfig');
const { ERROR, TOKEN } = require('../constants');

const returnToken = (user, jwtMock) => {
    if (jwtMock) {
        jwt.sign = jwtMock.sign;
    }

    return new Promise((resolve, reject) => {
        user ? resolve(jwt.sign(user, localConfig.secret, {expiresIn: TOKEN.EXPIRING_TIME}))
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
