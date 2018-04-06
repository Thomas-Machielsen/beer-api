const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
const myConnection  = require('express-myconnection');
const mysql         = require('mysql');
const router        = require('./routes');
const config        = require('./utils/config');

const dbOptions     = config.config.dbOptions; //eslint-disable-line prefer-destructuring

app.set('superSecret', config.config.secret);

// Add middleware
app.use(myConnection(mysql, dbOptions, 'single'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const port = 3030;

app.listen(port, () => console.log(`App listening at http://localhost:${port}`)); //eslint-disable-line no-console
