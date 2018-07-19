/**
 * Validations
 */
const {ERROR, ROLES} = require('../../../constants');

const isTokenDefined = token => {
  return new Promise(resolve => {
    return token ? resolve({success: true}) : resolve({
      success: false,
      message: ERROR.NO_TOKEN
    });
  })
};

const verifyToken = (token, jwt) => {
  return new Promise(resolve => {
    jwt.verify(token, process.env.SECRET, err => {
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

const authorizeToken = (token, jwt) => {
  return new Promise(resolve => {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
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
