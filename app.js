const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
const myConnection  = require('express-myconnection');
const mysql         = require('mysql');
const router        = require('./routes');
const config        = require('./utils/config')
const Sequelize     = require('sequelize');


const dbOptions     = config.config.dbOptions;

// const sequelize = new Sequelize(dbOptions.database, dbOptions.user, dbOptions.password, {
//   host: 'localhost',
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
// });


app.set('superSecret', config.config.secret);


// Add middleware
app.use(myConnection(mysql, dbOptions, 'single'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);


const port = 3030;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


