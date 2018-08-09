const { UNDEFINED, ERR } = require('../constants').ERROR;
const { REGISTERED } = require('../constants').SUCCESS;

module.exports = class UsersModel {
  constructor(Sequelize, UserSchema) {
    this.Sequelize = Sequelize;
    this.UserSchema = UserSchema;
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.UserSchema.User.findAll({
        attributes: ["username", "role"],
      })
        .then(users => resolve(users))
        .catch(reject);
    });
  }

  addUser(req) {
    const { username } = req.body;
    const { password } = req.body;

    return new Promise((resolve, reject) => {
      // @todo this is a validation
      if (username === "" || password === "") {
        reject({
          success: false,
          message: UNDEFINED
        });
      }

      this.UserSchema.User.create({
        username,
        password
      }, {
        individualHooks: true
      })
        .then(() => {
          resolve({
            "success": true,
            "message": REGISTERED
          })
        })
        .catch(err => {
          reject(ERR, err);
      })
    });
  }
};
