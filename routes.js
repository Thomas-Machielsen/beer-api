const { Router } = require('express');
const router     = module.exports = Router();

// Controllers
const beerCtrl  = require('./controllers/beers');
const usersCtrl = require('./controllers/users');
const authCtrl  = require('./controllers/authentication');

// Route to login, get verified and get a token
router.post('/api/authenticate', [authCtrl.getToken]);
//
// // Protect all the routes with a token if complete call next()
router.use('/api/', [authCtrl.authenticate]);

// All other routes which are accessible by everyone provided they are logged in
router.get('/api/beers', [beerCtrl.getBeer]);
router.get('/api/users', [usersCtrl.getUsers]);
router.get('/api/beers/:id', [beerCtrl.getBeer]);

router.use('/api/', [authCtrl.authorize]);
router.put('/api/beer/:id', [beerCtrl.editBeer]);
router.delete('/api/beer/:id', [beerCtrl.deleteBeer]);
router.post('/api/beer', [beerCtrl.addBeer]);
