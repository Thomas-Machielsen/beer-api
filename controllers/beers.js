const Sequelize       = require('sequelize');
const BeerSchema      = require('../schemas/Beer');
const RatingSchema    = require('../schemas/Rating');
const BeersService    = require('../services/beers');

const Beers = new BeersService(Sequelize, BeerSchema, RatingSchema);

function getBeer(req, res) {
  Beers.getBeer(req)
  .then(results => res.json({ data: results }))
  .catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
}

function editBeer(req, res) {
  Beers.editBeer(req, res)
  .then(results => res.json(results))
  .catch((err) => {
    res.status(404);
      res.json(err);
  });
}

function deleteBeer(req, res) {
  Beers.deleteBeer(req)
  .then(results => res.json(results))
  .catch((err) => {
    res.status(404);
      res.json(err);
  });
}

function addBeer(req, res) {
  Beers.addBeer(req, res)
  .then(results => res.json(results))
  .catch((err) => {
    res.status(404);
      res.json(err);
  });
}

module.exports = { editBeer, deleteBeer, addBeer, getBeer };

