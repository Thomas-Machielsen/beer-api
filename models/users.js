const jwt = require('jsonwebtoken');

const getTokenQuery = 'SELECT name, id from users WHERE name = ? AND password = ?';
const getAllUsersQuery = 'SELECT name, id FROM users';

module.exports = new class UsersModel {


  getToken(req, next) {
    return new Promise(
      (resolve, reject) => {
        req.getConnection((err, connection) => {
          if (err) return (next(err));
          connection.query(getTokenQuery, [req.body.name, req.body.password], (error, results) => {
            if (results.length > 0) {
              const token = jwt.sign(results[0], 'hello', {
                expiresIn: '10h'
              });
              resolve(token);
            } else {
              reject({ success: false, message: 'Authentication failed.' });
            }
          });
        });
      }
    );
  }

  getUsers(req) {
    return new Promise(
      (resolve, reject) => {
        req.getConnection((err, connection) => {
          connection.query(getAllUsersQuery, (error, results) => {
            if (results.length > 0) {
              resolve(results);
            } else {
              reject({ succes: false, message: 'No users found' });
            }
          });
        });
      }
    );
  }

  authenticate(req, res, next) {
    return new Promise(
      (resolve) => {
        // check header or url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        if (token) {
          jwt.verify(token, 'hello', (err, decoded) => {
            if (err) {
              resolve({ success: false, message: 'Failed to authenticate token.' });
            } else {
              // Gief token object so you have acces to user object everywhere
              res.locals.decoded = decoded;
              next();
            }
          });
        } else {
          return res.status(403).send({
            success: false,
            message: 'No token provided.'
          });
        }
      }
    );
  }
}();

