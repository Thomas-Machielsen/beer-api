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
        jwt.verify(token, localConfig.secret, (err, decoded) => {
            // If jwt is undefined create error message
            if (err) {
                reject({success: false, message: 'Failed to authenticate token.'});
            } else {
                res.locals.role = decoded.role;
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

function authorizeToken(res, next, token, reject) {
    if (token) {
        jwt.verify(token, localConfig.secret, (err, decoded) => {
            if (err) {
                reject({success: false, message: 'Failed to authenticate token.'});
            } else {
                if (decoded.role === 'admin') {
                    next();
                } else {
                    return res.status(403).send({
                        success: false,
                        message: 'Insufficient permissions'
                    });
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

module.exports = {returnToken, authToken, authorizeToken};