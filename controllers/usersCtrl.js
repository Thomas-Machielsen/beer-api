const Sequelize = require("sequelize");
const UsersService = require("../services/users");
const UserSchema = require('../schemas/User');
const { STATUSCODES } = require('../constants');

const Users = new UsersService(Sequelize, UserSchema);

const getUsers = (req, res) => {
  Users.getUsers(req, res)
    .then(results => res.json({ users: results }))
    .catch(err => {
      res.status(STATUSCODES.NOT_FOUND);
      res.json({ error: err });
    });
};

const addUser = (req, res) => {
  Users.addUser(req, res)
    .then(results => res.json(results))
    .catch(err => {
      res.json({ error: err });
    });
};

module.exports = { getUsers, addUser };
