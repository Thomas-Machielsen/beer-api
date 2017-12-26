const Router    = require('express').Router;
const router    = module.exports = Router();

// Controllers
const beerCtrl  = require('./controllers/beers');
const usersCtrl = require('./controllers/users');
const authCtrl  = require('./controllers/authentication');


//todo: kan dit met router.use?
router.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Route to login, get verified and get a token
router.post('/api/authenticate', [authCtrl.getToken]);

// Protect all the routes with a token if complete call next()
router.use('/api/', [authCtrl.authenticate]);

// All other routes which are accessible by everyone
router.get('/api/beers', [beerCtrl.getBeer]);
router.get('/api/users', [usersCtrl.getUsers]);
router.get('/api/beers/:id', [beerCtrl.getBeer]);

// Routes which are protected and only accessible by admin/write rights

router.put('/api/beer/:id', [beerCtrl.editBeer]);
router.delete('/api/beer/:id', [beerCtrl.deleteBeer]);
router.post('/api/beer', [beerCtrl.addBeer]);
