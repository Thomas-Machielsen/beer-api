const AuthenticateModel = require("../services/authentication");
const validations = require("../utils/validator/validations/validations");

/**
 * function getToken
 * @param {Object} req
 * @param {Object} res
 */
function getToken(req, res) {
  AuthenticateModel.getToken(req, res)
    .then(results => res.json({ data: results }))
    .catch(err => res.json({ error: err }));
}

/**
 * function authenticate
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function authenticate(req, res, next) {
  AuthenticateModel.authenticate(req, next, [
    validations.isTokenDefined,
    validations.verifyToken
  ])
    .then(results => res.json({ data: results }))
    .catch(err => res.json({ error: err }));
}

/**
 * function getBeer
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function authorize(req, res, next) {
  AuthenticateModel.authenticate(req, next, [
    validations.isTokenDefined,
    validations.verifyToken,
    validations.authorizeToken
  ])
    .then(results => res.json({ data: results }))
    .catch(err => res.json({ error: err }));
}

module.exports = { getToken, authenticate, authorize };
