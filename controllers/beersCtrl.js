const Sequelize = require("sequelize");
const BeerSchema = require("../schemas/Beer");
const RatingSchema = require("../schemas/Rating");
const BeersService = require("../services/beers");
const { STATUSCODES } = require('../constants');

const Beers = new BeersService(Sequelize, BeerSchema, RatingSchema);

const getBeer = (req, res) => {
  Beers.getBeer(req)
    .then(results => res.json({ data: results }))
    .catch(err => {
      res.status(STATUSCODES.NOT_FOUND);
      res.json(err);
    });
};

const editBeer = (req, res) => {
  Beers.editBeer(req, res)
    .then(results => res.json(results))
    .catch(err => {
      res.status(STATUSCODES.NOT_FOUND);
      res.json(err);
    });
};

const deleteBeer = (req, res) => {
  Beers.deleteBeer(req)
    .then(results => res.json(results))
    .catch(err => {
      res.status(STATUSCODES.NOT_FOUND);
      res.json(err);
    });
};

const addBeer = (req, res) => {
  Beers.addBeer(req, res)
    .then(results => res.json(results))
    .catch(err => {
      res.status(STATUSCODES.NOT_FOUND);
      res.json(err);
    });
};

module.exports = { editBeer, deleteBeer, addBeer, getBeer };
