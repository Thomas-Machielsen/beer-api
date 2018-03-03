/**
 * Validations
 */
const jwt = require('jsonwebtoken');
const localConfig = require('../../../config/localConfig');
const { ERROR, ROLES } = require('../../../constants');

const isTokenDefined = token => {
    const tokenAsString = token.toString();
    return new Promise(resolve => {
        tokenAsString ? resolve({ success: true }) : resolve({ success: false, message: ERROR.NO_TOKEN });
    })
};

const verifyToken = token => {
    const tokenAsString = token.toString();
    return new Promise(resolve => {
        jwt.verify(tokenAsString, localConfig.secret, err => {
            err ? resolve({ success: false, message: ERROR.FAILED }) : resolve({ success: true });
        });
    })
};

const authorizeToken = token => {
    const tokenAsString = token.toString();
    return new Promise(resolve => {
        jwt.verify(tokenAsString, localConfig.secret, (err, decoded) => {
            err ? resolve({ success: false, message: ERROR.FAILED }) : resolve(isAdmin(decoded.role));
        });
    })
};

const isAdmin = role => {
    return new Promise(resolve => {
        role === ROLES.ADMIN ? resolve({ success: true }) : resolve({ success: false, message: ERROR.NO_PERMISSION})
    });
};

module.exports = { verifyToken, isTokenDefined, authorizeToken };
