const Sequelize       = require('sequelize');
const BeerSchema      = require('../schemas/Beer');
const RatingSchema    = require('../schemas/Rating');
RatingSchema.associations(BeerSchema.Beer);
BeerSchema.associations(RatingSchema.Rating);


module.exports = new class BeersModel {

  getBeers() {
    return new Promise((resolve, reject) => {
      BeerSchema.Beer
        .findAll({
          attributes: ['id', 'name', 'style'],
          required: false,
          include: [{
            model: RatingSchema.Rating,
            attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'stars']]
          }],
          raw: true,
          nest: true,
          group: ['id']
        })
        .then((beers) => {
          resolve(beers);
        })
        .catch(reject)
    });
  }

  singleBeer(req) {
    return new Promise((resolve, reject) => {
      BeerSchema.Beer
        .findAll({
          attributes: ['id', 'name', 'style'],
          required: false,
          include: [{
            model: RatingSchema.Rating,
            attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'stars']]
          }],
          raw: true,
          nest: true,
          group: ['id'],
          where: {
            id : req.params.id
          }
        })
        .then((beers) => {
          resolve(beers);
        })
        .catch(reject);
    });
  }



  searchBeers() {
    return new Promise((resolve, reject) => {
      BeerSchema.Beer
        .findAll({
          attributes: ['id', 'name', 'style', 'brewer'],
          required: false,
          include: [{
            model: RatingSchema.Rating,
            attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'stars']]
          }],
          raw: true,
          nest: true,
          group: ['id'],
          where: {

          }
        })
        .then((beers) => {
          resolve(beers);
        })
        .catch(reject);

    });
  }

  editBeer(req) {
    return new Promise((resolve, reject) => {
      req.getConnection((error, connection) => {
        connection.query('UPDATE beers SET style = ?, brewer = ?, name = ? WHERE id = ?', [req.body.style, req.body.brewer, req.body.name, req.params.id], (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject(err);
          }
        });
      });
    });
  }


  deleteBeer(req) {
    return new Promise(
      (resolve, reject) => {
        req.getConnection((error, connection) => {
          connection.query('DELETE from beers where id = ?', [req.body.id], (err, results) => {
            if (results) {
              resolve({message: 'succes'});
            } else {
              reject(err);
            }
          });
        });
      }
    );
  }

  addBeer(req, res) {
    return new Promise(
      (resolve, reject) => {
        req.getConnection((error, connection) => {
          connection.query('INSERT INTO beers (name, brewer, style, userId) VALUES (?)', [[req.body.name, req.body.brewer, req.body.style, res.locals.decoded.id]], (err, results) => {
            if (results) {
              resolve({message: 'succes'});
            } else {
              reject(err);
            }
          });
        });
      }
    );
  }

}();

