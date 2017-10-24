const Sequelize       = require('sequelize');
const BeerSchema      = require('../schemas/Beer');
const RatingSchema    = require('../schemas/Rating');
RatingSchema.associations(BeerSchema.Beer);
BeerSchema.associations(RatingSchema.Rating);

const attributesArray = ['id', 'name'];
const starAttribute   = [[Sequelize.fn('AVG', Sequelize.col('rating')), 'stars']];
let whereStatement = {};

module.exports = new class BeersModel {

    getBeer(req) {

        if(req.params.id) {
            whereStatement = { id: [req.params.id]};
        } else {
            whereStatement = {};
        }

        return new Promise((resolve, reject) => {
            BeerSchema.Beer
                .findAll({
                    attributes: attributesArray,
                    required: false,
                    include: [{
                        model: RatingSchema.Rating,
                        attributes: starAttribute
                    }],
                    raw: true,
                    nest: true,
                    group: ['id'],
                    where: whereStatement
                })
                .then((beers) => {
                    resolve(beers);
                })
                .catch((e) => {
                    reject(e)
                });
        });
    }


    searchBeers() {
        return new Promise((resolve, reject) => {
            BeerSchema.Beer
                .findAll({
                    attributes: attributesArray,
                    required: false,
                    include: [{
                        model: RatingSchema.Rating,
                        attributes: starAttribute
                    }],
                    raw: true,
                    nest: true,
                    group: ['id'],

                })
                .then((beers) => {
                    resolve(beers);
                })
                .catch((e) => {
                    reject(e)
                });
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

