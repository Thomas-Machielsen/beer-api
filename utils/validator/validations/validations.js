/**
 * Validations
 */
const jwt = require('jsonwebtoken');
const localConfig = require('../../../config/localConfig');
const {ERROR, ROLES} = require('../../../constants');

const isTokenDefined = token => {
  const tokenAsString = token.toString();
  return new Promise(resolve => {
    return tokenAsString ? resolve({success: true}) : resolve({
      success: false,
      message: ERROR.NO_TOKEN
    });
  })
};

const verifyToken = token => {
  const tokenAsString = token.toString();
  return new Promise(resolve => {
    jwt.verify(tokenAsString, localConfig.secret, err => {
      return err ? resolve({
        success: false,
        message: ERROR.FAILED
      }) : resolve({success: true});
    });
  })
};

const isAdmin = role => {
  return new Promise(resolve => {
    return role === ROLES.ADMIN ? resolve({success: true}) : resolve({
      success: false,
      message: ERROR.NO_PERMISSION
    })
  });
};

const authorizeToken = token => {
  const tokenAsString = token.toString();
  return new Promise(resolve => {
    jwt.verify(tokenAsString, localConfig.secret, (err, decoded) => {
      return err ? resolve({
        success: false,
        message: ERROR.FAILED
      }) : resolve(isAdmin(decoded.role));
    });
  })
};

module.exports = {
  verifyToken,
  isTokenDefined,
  authorizeToken
};
