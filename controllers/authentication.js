const AuthenticateModel = require('../services/authentication');

function getToken(req, res) {
    AuthenticateModel.getToken(req, res)
        .then(results => res.json({ data: results }))
        .catch((err) => {
            res.json({ error: err });
        });
}

function authenticate(req, res, next) {
    AuthenticateModel.authenticate(req, res, next)
        .then(results => res.json({ data: results }))
        .catch((err) => {
            res.json({ error: err });
        });
}

module.exports = { getToken, authenticate };
