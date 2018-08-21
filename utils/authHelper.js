const {ERROR, TOKEN} = require("../constants");

const returnToken = (user, jwt) => {
  return new Promise((resolve, reject) => {
    return user ? resolve(jwt.sign(user, process.env.SECRET, {expiresIn: TOKEN.EXPIRING_TIME})) : reject({
      success: false,
      message: ERROR.LOGIN_FAILED
    });
  });
};

const findToken = req => {
  return (
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers.authorization
  );
};

const generateTokenToValidate = (token, validations) => {
  return {
    data: token,
    validations
  };
};

module.exports = {
  returnToken,
  generateTokenToValidate,
  findToken
};
