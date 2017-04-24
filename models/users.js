const jwt = require('jsonwebtoken');
const getTokenQuery = 'SELECT username, id from Users WHERE username = ? AND password = ?';
const getAllUsersQuery = 'SELECT username FROM Users';

module.exports = new class UsersModel {

  getToken(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    return new Promise(
      (resolve, reject) => {
        req.getConnection((err, connection) => {
          if (err) return (next(err));
          console.log(req.body)
          connection.query(getTokenQuery, [req.body.name, req.body.password], (error, results) => {
            // console.log(results);
            // console.log(error);
            if (results.length > 0) {
              const token = jwt.sign(results[0], 'hello', {
                expiresIn: '10h'
              });
              req.headers = token;
              console.log(token);
              resolve(token);
            } else {
              reject({ success: false, message: 'Failed authenticating' });
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
              console.log(results)
              resolve(results);
            } else {
              reject({ success: false, message: 'No users found' });
            }
          });
        });
      }
    );
  }

  // Token of users is undefined for somereason
  authenticate(req, res, next) {
    return new Promise(
      (resolve, reject) => {
        // check header or url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        if (token) {
          console.log('token',  token)
          jwt.verify(token, 'hello', (err, decoded) => {
            console.log('auth', err)
            // If jwt is undefined also create error message
            if (err) {
              reject({ success: false, message: 'Failed to authenticate token.' });
            // If jwt is undefined also create error message
            } else {
              // Gief token object so you have acces to user object everywhere
              res.locals.decoded = decoded;
              if (req.url === '/') {
                resolve({ success: true, message: 'Token verified!' })
              } else {
                next();
              }
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

