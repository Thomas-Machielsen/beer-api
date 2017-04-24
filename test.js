const mysql         = require('mysql');
const Sequelize     = require('sequelize');


const sequelize = new Sequelize('beer_api', 'root', 'ikbengoed', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

User
  .find({ 
    where: { username: 'thomas' },
    attributes: ['username', 'createdAt', 'updatedAt'],
  })
  .then(function(user, err) {
    if (user) {
      console.log(user.get({
        plain: true,
      }))
    } else {
      console.log(err);
    }
  });