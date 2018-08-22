const AuthenticateModel = require("../services/authentication");

const getToken = (req, res) => {
  AuthenticateModel.getToken(req)
    .then(results => res.json({ data: results }))
    .catch(err => res.json(err));
};

const isLoggedin = (req, res, next) => {
  AuthenticateModel.isLoggedin(req, next)
    .then(() => next())
    .catch(err => res.json(err));
};

const isAdmin = (req, res, next) => {
  AuthenticateModel.isAdmin(req, next)
    .then(() => next())
    .catch(err => res.json(err));
};

module.exports = { getToken, isAdmin, isLoggedin };
