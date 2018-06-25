const { Router } = require('express');
const router     = module.exports = Router();

// Controllers
const beerCtrl  = require('./controllers/beersCtrl');
const usersCtrl = require('./controllers/usersCtrl');
const authCtrl  = require('./controllers/authenticationCtrl');

// Route to login, get verified and get a token
router.post('/api/authenticate', [authCtrl.getToken]);

// All other routes which are accessible by everyone provided they are logged in
router.get('/api/beers', [authCtrl.isLoggedin, beerCtrl.getBeer]);
router.get('/api/users', [authCtrl.isLoggedin, usersCtrl.getUsers]);
router.get('/api/beers/:id', [authCtrl.isLoggedin, beerCtrl.getBeer]);

// Routes which require a loggedIn / admin
router.put('/api/beer/:id', [authCtrl.isLoggedin, authCtrl.isAdmin, beerCtrl.editBeer]);
router.delete('/api/beer/:id', [authCtrl.isLoggedin, authCtrl.isAdmin, beerCtrl.deleteBeer]);
router.post('/api/beer', [authCtrl.isLoggedin, authCtrl.isAdmin, beerCtrl.addBeer]);
