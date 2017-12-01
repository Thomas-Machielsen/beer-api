
module.exports = class BeersService {

    constructor(Sequelize, BeerSchema, RatingSchema) {
        this.Sequelize = Sequelize;
        this.BeerSchema = BeerSchema;
        this.RatingSchema = RatingSchema;

        this.attributesArray = ['id', 'name', 'style', 'brewer'];
        this.starAttribute = [[this.Sequelize.fn('AVG', this.Sequelize.col('rating')), 'stars']];

        this.RatingSchema.associations(this.BeerSchema.Beer);
        this.BeerSchema.associations(this.RatingSchema.Rating);
    }

    getBeer(req) {
        let whereStatement = {};

        if(req.params.id) {
            whereStatement = { id: [req.params.id] };
        } else {
            whereStatement = {};
        }

        return new Promise((resolve, reject) => {
            this.BeerSchema.Beer
                .findAll({
                    attributes: this.attributesArray,
                    required: false,
                    include: [{
                        model: this.RatingSchema.Rating,
                        attributes: this.starAttribute
                    }],
                    raw: true,
                    nest: true,
                    group: ['id'],
                    where: whereStatement
                })
                .then((beers) => {
                    if(beers.length > 0) {
                        resolve(beers);
                    } else {
                        reject(new Error('No beers found'))
                    }
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
                        resolve(results);
                    } else {
                        reject(err);
                    }
                });
            });
            }
        );
    }

    addBeer(req) {
        return new Promise(
            (resolve, reject) => {
                req.getConnection((error, connection) => {
                connection.query('INSERT INTO beers (name, brewer, style, userId) VALUES (?)', [[req.body.name, req.body.brewer, req.body.style, 1]], (err, results) => {
                if (results) {
                    resolve(results);
                } else {
                    reject(err);
                }
                });
            });
            }
        );
    }

};

