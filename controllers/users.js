const UsersModel = require('./../models/users');

function getUsers(req, res) {
  UsersModel.getUsers(req, res)
  .then(results => res.json({ users: results }))
  .catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
}

function getToken(req, res) {
  UsersModel.getToken(req, res)
  .then(results => res.json({ data: results }))
  .catch((err) => {
    res.json({ err });
  });
}

function authenticate(req, res, next) {
  UsersModel.authenticate(req, res, next)
  .then(results => res.json({ data: results }))
  .catch((err) => {
    res.json({ data: err });
  });
}

module.exports = { getUsers, getToken, authenticate };