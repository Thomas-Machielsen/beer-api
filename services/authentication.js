const jwt = require('jsonwebtoken');
const dbConfig = require('../config/db');
const Sequelize = require('sequelize');


const User = dbConfig.db.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});


module.exports = new class UsersModel {

    getToken(req, res) {
        res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
        return new Promise((resolve, reject) => {
            User
                .findOne({
                    where: {
                        username: req.body.username,
                        password: req.body.password
                    },
                    attributes: ['username']
                })
                .then((user) => {
                    if (user) {
                        const token = jwt.sign(user.get({plain: true}), 'hello', {
                            expiresIn: '10h'
                        });
                        resolve(token);
                    } else {
                        reject({success: false, message: 'Failed authenticating'});
                    }
                });
        });
    }

    // Token of users is undefined for somereason
    authenticate(req, res, next) {
        return new Promise(
            (resolve, reject) => {
                // check header or url parameters or post parameters for token
                const token = req.body.token || req.query.token || req.headers['xaccess-token'] || req.headers.authorization;
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                if (token) {
                    jwt.verify(token, 'hello', (err, decoded) => {
                        // If jwt is undefined also create error message
                        if (err) {
                            reject({success: false, message: 'Failed to authenticate token.'});
                            // If jwt is undefined also create error message
                        } else {
                            // Gief token object so you have acces to user object everywhere
                            res.locals.decoded = decoded;
                            if (req.url === '/') {
                                resolve({success: true, message: 'Token verified!'})
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

