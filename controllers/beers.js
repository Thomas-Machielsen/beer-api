const BeersModel = require('./../models/beers');

function showBeers(req, res) {
  BeersModel.getBeers(req)
  .then(results => res.json({ data: results }))
  .catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
}

function singleBeer(req, res) {
  BeersModel.singleBeer(req)
  .then(results => res.json({ data: results }))
  .catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
}

function searchBeers(req, res) {
  const keysArray   = Object.keys(req.query);
  const valuesArray = Object.values(req.query);

  BeersModel.searchBeers(req, res, keysArray, valuesArray)
  .then(results => res.json({ data: results }))
  .catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
}

function editBeer(req, res) {
  BeersModel.editBeer(req, res)
  .then(results => res.json(results))
  .catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
}

function deleteBeer(req, res) {
  BeersModel.deleteBeer(req)
  .then(results => res.json(results))
  .catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
}

function addBeer(req, res) {
  BeersModel.addBeer(req, res)
  .then(results => res.json(results))
  .catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
}

module.exports = { showBeers, searchBeers, editBeer, deleteBeer, addBeer, singleBeer };

