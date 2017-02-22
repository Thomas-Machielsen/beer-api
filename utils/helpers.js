const mysql = require('mysql');

function makeSqlString(keysArray, valuesArray) {
  const keyPairArray = [];

  let sqlString = 'SELECT * from beers where ';
  for (let i = 0; i < keysArray.length; i++) {
    sqlString += '?? LIKE ? AND ';
    keyPairArray.push(keysArray[i]);
    keyPairArray.push(`%${valuesArray[i]}%`);
  }
  const mysqlString = sqlString.slice(0, -4);
  const sql = mysql.format(mysqlString, keyPairArray);
  return sql;
}

module.exports = { makeSqlString };
