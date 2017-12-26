const UsersModel = require('../services/users');

function getUsers(req, res) {
  UsersModel.getUsers(req, res)
  .then(results => res.json({ users: results }))
  .catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
}

module.exports = { getUsers };
