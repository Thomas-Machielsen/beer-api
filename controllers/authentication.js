const AuthenticateModel = require('../services/authentication');
const validations = require('../utils/validator/validations/validations');

// Should these validations be in the controller?

function getToken(req, res) {
    AuthenticateModel.getToken(req, res)
        .then(results => res.json({ data: results }))
        .catch(err => res.json({ error: err }));
}

function authenticate(req, res, next) {
    AuthenticateModel.authenticate(req, res, next, [validations.isTokenDefined, validations.verifyToken])
        .then(results => res.json({data: results}))
        .catch(err => res.json({error: err}));
}

function authorize(req, res, next) {
    AuthenticateModel.authenticate(req, res, next, [validations.isTokenDefined, validations.verifyToken, validations.authorizeToken])
        .then(results => res.json({data: results}))
        .catch(err => res.json({error: err}));
}

module.exports = { getToken, authenticate, authorize };