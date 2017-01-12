// TODO 
// Bcrypt
// all users add beers
// Admin who can delete beers and edit beers
// 



'use strict';
const express       = require('express');
const path          = require('path');
const session       = require('express-session');
const FileStore     = require('session-file-store')(session);
const bodyParser    = require('body-parser');
const mysql         = require('mysql');
const myConnection  = require('express-myconnection');
const app           = express();
const config        = require('./config/server');
const jwt           = require('jsonwebtoken'); 


// Setup serving static assets
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({extended: true}));

const dbOptions      = config.dbOptions;
app.set('superSecret', config.secret); // secret variable

// Add connection middleware
app.use(myConnection(mysql, dbOptions, 'single'));


const frontpageRouter = require('./build/routers/frontpage');

app.use('/', frontpageRouter)

app.get('/', function(req, res){
  res.redirect('/');
});

const apiRoutes = express.Router();


apiRoutes.post('/authenticate', function(req, res) {
  req.getConnection(function(err, connection){
    if(err){ return next(err); }
    connection.query('SELECT * from users WHERE name = ? AND password = ?', [req.body.name, req.body.password], function(err, results){
      if (results.length > 0) {

      let user = results[0];
      let token = jwt.sign(user, 'hello', {
        expiresIn: '10h'
      });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });

      } else {
        res.json({ success: false, message: 'Authentication failed.' });
      }
    })
  });
});


apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'hello', function(err, decoded) {      
      if (err) {
        console.log(err)
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });  
});

apiRoutes.get('/users', function(req, res) {

  req.getConnection(function(err, connection){
    if(err){ return next(err); }
    connection.query('SELECT * from users', function(err, results){


      res.json(results)
    })
  });
});

// Route to get all the beers
apiRoutes.get('/beers', function(req, res) {

  req.getConnection(function(err, connection){
    if(err){ return next(err); }
    connection.query('SELECT brewer, name, style from beers', function(err, results){
      res.json(results)
    })
  });
});



// Single key - values
apiRoutes.get('/beer/search*', function(req, res){

  req.getConnection(function(err, connection){
    if(err){ return next(err); }
    connection.query('SELECT * from beers where ? = ?', [req.query, req.query], function(err, results){
      res.json(results);
    })
  })
});

apiRoutes.put('/beer/:id', function(req, res){
  req.getConnection(function(err, connection){
    if(err){ return next(err) };
    res.send('put')
  })
})


app.use('/api', apiRoutes);


const port = 3010;

app.listen(port, function(){
  console.log('App listening at http://localhost:'+port);
});