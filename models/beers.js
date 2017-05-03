const helpers = require('../utils/helpers');

module.exports = new class BeersModel {

  getBeers(req) {
    return new Promise((resolve, reject) => {
      req.getConnection((error, connection) => {
        connection.query('SELECT Beer.id, Beer.name, Beer.style, Beer.brewer, AVG(ratings.rating) AS stars FROM Beers AS Beer LEFT OUTER JOIN Ratings as Ratings ON Beer.id = Ratings.BeerId GROUP BY beer.id', (err, results) => {
          console.log(results ? results : err);
          if (err) {
            reject(err);
          } else if (results.length > 0) {
            resolve(results);
          } else if (results.length === 0) {
            reject('No beers found');
          } else {
            reject(err);
          }
        });
      });
    });
  }

  singleBeer(req) {
    return new Promise((resolve, reject) => {
      req.getConnection((error, connection) => {
        connection.query('SELECT avg(ratings.rating) as stars, Ratings.id AS Ratings.id, beers.name, beers.style, beers.brewer from ratings LEFT JOIN beers on ratings.beer_id = beers.id WHERE beers.id = ?', [req.params.id], (err, results) => {
          if (results.length > 0) {
            resolve(results);
          } else if (results.length === 0) {
            reject('No beers found');
          } else {
            reject(err);
          }
        });
      });
    });
  }

  searchBeers(req, res, keysArray, valuesArray) {
    return new Promise((resolve, reject) => {
      req.getConnection((error, connection) => {
        connection.query(helpers.makeSqlString(keysArray, valuesArray), (err, results) => {
          if (results.length > 0) {
            resolve(results);
          } else if (results.length === 0) {
            reject('No beers found');
          } else {
            reject(err);
          }
        });
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
              resolve({ message: 'succes' });
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
          connection.query('INSERT INTO beers (name, brewer, style, user_id) VALUES (?)', [[req.body.name, req.body.brewer, req.body.style, res.locals.decoded.id]], (err, results) => {
            if (results) {
              resolve({ message: 'succes' });
            } else {
              reject(err);
            }
          });
        });
      }
    );
  }

}();

