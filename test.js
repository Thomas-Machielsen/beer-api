const mysql         = require('mysql');
const config        = require('./config/config');

let keysArray       = [ 'name' ];
let valuesArray     = [ 'Grolsch'];

// Add connection middleware
var connection = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'ikbengoed',
    database: 'beer_api',
    dateStrings: 'date'
})

function makeSqlString(keysArray, valuesArray){
  const keyPairArray = [];
  let sqlString = "SELECT * from beers where ";
  for (let i = 0; i < keysArray.length; i++) {
    sqlString += "?? LIKE ? AND ";
    keyPairArray.push(keysArray[i])
    keyPairArray.push('%'+valuesArray[i]+'%')
  }
  mysqlString = sqlString.slice(0, -4);
  sql = mysql.format(mysqlString, keyPairArray);
  return sql;
}

makeSqlString(keysArray, valuesArray)

const name = "bier";
const brewer = "Grolsch"
const style = "pils"

connection.query('INSERT INTO beers (name, brewer, style, user_id) VALUES (?)', [[name, brewer, style, 1]], function(err, results){
  console.log(err);
  console.log(results);
});




















