const helpers = require('../utils/helpers');

module.exports = class BeersService {

    constructor(Sequelize, BeerSchema, RatingSchema) {
        this.Sequelize = Sequelize;
        this.BeerSchema = BeerSchema;
        this.RatingSchema = RatingSchema;

        this.attributesArrayWithId = ['id', 'name', 'style', 'brewer'];
        this.starAttribute = [[this.Sequelize.fn('AVG', this.Sequelize.col('rating')), 'stars']];

        this.RatingSchema.associations(this.BeerSchema.Beer);
        this.BeerSchema.associations(this.RatingSchema.Rating);
    }

    getBeer(req) {

        return new Promise((resolve, reject) => {
            this.BeerSchema.Beer
                .findAll({
                    attributes: this.attributesArrayWithId,
                    required: false,
                    include: [{
                        model: this.RatingSchema.Rating,
                        attributes: this.starAttribute
                    }],
                    raw: true,
                    nest: true,
                    group: ['id'],
                    where: helpers.getWhereStatement(req.params.id)
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
            this.BeerSchema.Beer
                .update(
                    {
                        name: req.body.name,
                        brewer: req.body.brewer,
                        style: req.body.style
                    },
                    {
                        where: { id : req.params.id }
                    })
                .then(results => {
                    if(results) {
                        resolve(results);
                    } else {
                        reject(new Error)
                    }})
                .catch(err => {
                    reject(new Error(err))
                })
        });
    }

    deleteBeer(req) {
        return new Promise((resolve, reject) => {
            this.BeerSchema.Beer
                .destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(results => {
                    resolve(results);
                })
                .catch(err => {
                    reject(new Error(err))
                })
        });
    }

    addBeer(req) {
        return new Promise((resolve, reject) => {
            this.BeerSchema.Beer
                .create({
                    name: req.body.name,
                    brewer: req.body.brewer,
                    style: req.body.style,
                    userId: 1
                })
                .then(results => {
                    resolve(results);
                })
                .catch(err => {
                    reject(new Error(err))
                });
            }
        );
    }

};

