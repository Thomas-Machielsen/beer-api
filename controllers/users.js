const UsersModel = require("../services/users");
const { STATUSCODES } = require('../constants');

const getUsers = (req, res) => {
  UsersModel.getUsers(req, res)
    .then(results => res.json({ users: results }))
    .catch(err => {
      res.status(STATUSCODES.NOT_FOUND);
      res.json({ error: err });
    });
};

module.exports = { getUsers };
