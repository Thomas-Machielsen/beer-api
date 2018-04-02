const Sequelize = require("sequelize");
const BeerSchema = require("../schemas/Beer");
const RatingSchema = require("../schemas/Rating");
const BeersService = require("../services/beers");
const { STATUS_CODES } = require('../constants');


const Beers = new BeersService(Sequelize, BeerSchema, RatingSchema);

/**
 * function getBeer
 * @param {Object} req
 * @param {Object} res
 */
function getBeer(req, res) {
  Beers.getBeer(req)
    .then(results => res.json({ data: results }))
    .catch(err => {
      res.status(STATUS_CODES.NOT_FOUND);
      res.json({ error: err });
    });
}

/**
 * function editBeer
 * @param {Object} req
 * @param {Object} res
 */
function editBeer(req, res) {
  Beers.editBeer(req, res)
    .then(results => res.json(results))
    .catch(err => {
      res.status(STATUS_CODES.NOT_FOUND);
      res.json(err);
    });
}

/**
 * function deleteBeer
 * @param {Object} req
 * @param {Object} res
 */
function deleteBeer(req, res) {
  Beers.deleteBeer(req)
    .then(results => res.json(results))
    .catch(err => {
      res.status(STATUS_CODES.NOT_FOUND);
      res.json(err);
    });
}

/**
 * function addBeer
 * @param {Object} req
 * @param {Object} res
 */
function addBeer(req, res) {
  Beers.addBeer(req, res)
    .then(results => res.json(results))
    .catch(err => {
      res.status(STATUS_CODES.NOT_FOUND);
      res.json(err);
    });
}

module.exports = { editBeer, deleteBeer, addBeer, getBeer };
