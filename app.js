require('dotenv').config();
const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
const myConnection  = require('express-myconnection');
const mysql         = require('mysql');
const router        = require('./routes');

app.set('superSecret', process.env.SECRET);

const connectionString = process.env.CLEARDB_DATABASE_URL;

// Add middleware
app.use(myConnection(mysql, connectionString, 'single'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
const defaultPort = 3030;

const port = process.env.PORT || defaultPort;

app.listen(port, () => console.log(`App listening at http://localhost:${port}`)); //eslint-disable-line no-console
