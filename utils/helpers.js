const mysql = require('mysql');

function makeSqlString(keysArray, valuesArray) {
  const keyPairArray = [];

  let sqlString = 'SELECT avg(ratings.rating) as stars, beers.name, beers.style, beers.brewer from ratings RIGHT OUTER JOIN beers on ratings.id = beers.id WHERE ';
  for (let i = 0; i < keysArray.length; i++) {
    sqlString += '?? LIKE ? AND ';
    keyPairArray.push(keysArray[i]);
    keyPairArray.push(`%${valuesArray[i]}%`);
  }
  const mysqlString = sqlString.slice(0, -4);

  const sql = mysql.format(mysqlString, keyPairArray);

  const sqlQuery = sql.replace(/`/g, '') + ' GROUP BY beers.id';
  return sqlQuery;
}

module.exports = { makeSqlString };
