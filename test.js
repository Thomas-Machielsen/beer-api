const mysql         = require('mysql');
const Sequelize     = require('sequelize');
const jwt           = require('jsonwebtoken');


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

const Beer = sequelize.define('Beer', {
  user_id: Sequelize.INTEGER,
  style: Sequelize.STRING,
  brewer: Sequelize.STRING,
  desc: Sequelize.TEXT,
})

// User
//   .findOne({ 
//     where: { username: 'thomas' },
//     attributes: ['username', 'createdAt', 'updatedAt'],
//   })
//   .then((user, err) => {
//     if (user) {
//       console.log(user.get({
//         plain: true,
//       }))
//     } else {
//       console.log(err);
//     }
//   });

function getUsers(req) {
  return new Promise((resolve, reject) => {
    User
      .findAll()
      .then((users, err) => {
        const results = JSON.stringify(users)
        console.log(users ? results : err);
      })
  })
}

// getUsers();


function  getBeers(req) {
  return new Promise((resolve, reject) => {
    Beer
      .findAll()
      .then((beers, err) => {
        beers ? resolve(users) : reject(err);
      })
  });
}

// getBeers();





