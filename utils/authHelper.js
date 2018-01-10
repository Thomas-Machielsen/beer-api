const jwt = require('jsonwebtoken');
const localConfig = require('../config/localConfig');

function returnToken(user, resolve, reject) {
    if (user) {
        resolve(jwt.sign(user.get({plain: true}), localConfig.secret, {
            expiresIn: '10h'
        }));
    } else {
        reject({success: false, message: 'Failed authenticating'});
    }
}

function authToken(res, next, token, reject) {
    if (token) {
        jwt.verify(token, localConfig.secret, (err) => {
            // If jwt is undefined create error message
            if (err) {
                reject({success: false, message: 'Failed to authenticate token.'});
            } else {
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

module.exports = {returnToken, authToken};