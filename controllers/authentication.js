const AuthenticateModel = require("../services/authentication");

// @todo de validaties moeten naar de service want dat is domeinspecifieke kennis
/**
 * function getToken
 * @param {Object} req
 * @param {Object} res
 */
function getToken(req, res) {
  AuthenticateModel.getToken(req)
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
  AuthenticateModel.authenticate(req, next)
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
  AuthenticateModel.authenticate(req, next)
    .then(results => res.json({ data: results }))
    .catch(err => res.json({ error: err }));
}

module.exports = { getToken, authenticate, authorize };
