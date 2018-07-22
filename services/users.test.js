const UserService = require('./users');
const Sequelize = require("sequelize");
const UserSchema = require('../schemas/User');
const { UNDEFINED } = require('../constants').ERROR;
const { REGISTERED } = require('../constants').SUCCESS;

describe('Userservice to output data', () => {

  describe('addUser', () => {

    it('should be callable', () => {
      const Users = new UserService(Sequelize, UserSchema);

      expect(typeof Users.addUser).toBe('function');
    });

    it('should return an error when no name or password is provided', () => {
      const Users = new UserService(Sequelize, UserSchema);

      const req = {};
      const mockData = req.body = {
         username: '', password: ''
      };

      const result = Users.addUser(req);
      const expectedResult = {
        "success": false,
        "message": UNDEFINED
      };

      expect(result).rejects.toEqual(expectedResult);
    })
  });

  it('should return a success message on succces', () => {
    const UserSchemaMock = {
      User: {
        create: () => {
          return Promise.resolve(mockData)
        }
      }
    };

    const Users = new UserService(Sequelize, UserSchemaMock);

    const req = {};
    const mockData = req.body = {
      username: 'admin',
      password: 'superAdmin'
    };

    const result = Users.addUser(req);
    const expectedResult = {
      "success": true,
      "message": REGISTERED
    };

    expect(result).resolves.toEqual(expectedResult);
  })

});