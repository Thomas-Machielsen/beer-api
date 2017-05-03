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
  name: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  style: Sequelize.STRING,
  brewer: Sequelize.STRING,
  desc: Sequelize.TEXT,
  } , {
    // classMethods: {
    //   associate: (models) => {
    //     Beer.hasMany(models.Rating, {
    //       foreignKey: beer_id,
    //     })
    //   },
    // },
  }
);

const Rating = sequelize.define('Rating', {
  rating: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  beerId: Sequelize.INTEGER,
  } , {
    // classMethods: {
    //   associate: (models) => {
    //     Rating.belongsTo(models.Beer, {
    //       foreignKey: beer_id,
    //     })
    //   },
    // },
  }
);

Rating.belongsTo(Beer, {
})
Beer.hasMany(Rating, {
});

// User
//   .findOne({ 
//     where: { username: 'thomas' },
//     attributes: ['username', 'createdAt', 'updatedAt'],
//   })
//   .then((user, err) => {
//     if (user) {
//       console.log(user.get({
//         plain: true,< {}
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


function  getBeers() {
  return new Promise((resolve, reject) => {
    Beer
      .findAll({
        // attributes: ['id'],
        include: [{
          model: Rating,
            attributes: [[Rating.sequelize.fn('AVG', Rating.sequelize.col('Ratings.rating')), 'stars']],
        }],
        group: ['id', 'ratings.id']
      })
      .then((beers, err) => {
        console.log(JSON.stringify(beers ? beers : err));
        beers ? resolve(beers) : reject(err);
      })
  });
}


function avgRating() {
  return new Promise((resolve, reject) => {
    Rating.
      findAll({
        required: false,
        attributes: [[Rating.sequelize.fn('AVG', Rating.sequelize.col('Ratings.rating')), 'stars']],
        include: [{
          model: Beer,
        }],
        required: false,
        group: ['rating.id']
      })
      .then((beers, err) => {
        console.log(JSON.stringify(beers ? beers : err));
      })
  })
}

getBeers();





