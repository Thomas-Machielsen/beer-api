const UsersModel = require("../services/users");
const {STATUS_CODES} = require('../constants');

/**
 * function getUsers - get all the users from the database
 * @param {Object} req
 * @param {Object} res
 */
function getUsers(req, res) {
  UsersModel.getUsers(req, res)
    .then(results => res.json({ users: results }))
    .catch(err => {
      res.status(STATUS_CODES.NOT_FOUND);
      res.json({ error: err });
    });
}

module.exports = { getUsers };
