const mysql         = require('mysql');
const Sequelize     = require('sequelize');
const jwt           = require('jsonwebtoken');


const sequelize = new Sequelize('beer_api', 'root', 'ikbengoed', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const Beer = sequelize.define('Beer', {
  name: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  style: Sequelize.STRING,
  brewer: Sequelize.STRING,
  desc: Sequelize.TEXT,
  }
);

const Rating = sequelize.define('Rating', {
  rating: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  beerId: Sequelize.INTEGER,
  }
);



Rating.belongsTo(Beer, {
})
Beer.hasMany(Rating, {
});

const attributesArray = ['name', 'style', 'brewer', 'id'];
const searchAttributesArray = ['name', 'brewer', 'style'];

function convertStrtoArray(str) {
    const newString = str;
    return newString.split(/\s+/);
}

function cvtArraytoObj(searchArray, searchAttributesArray) {
    const arr = [];
    const secondArr = [];
    for (i in searchArray) {
        arr.push({
            name: {
                $like: `%${searchArray[i]}%`,
            },
            style: {
                $like: `%${searchArray[i]}%`,
            }
        })
    }

    // secondArr.push({
    //     name: {
    //         $like: arr
    //     }
    // })
    // console.log(arr[0]);
    // console.log(secondArr);
    return arr;
}


const rubberDuck = `1.  Pak de zoektermen
                    2.  Split de zoektermen als individuele items (array met strings)
                    3.  Zoek per attribute op de items (name like %grolsch% name like %heine%`


function searchBeer(searchTerm) {


    const searchQuery = cvtArraytoObj(convertStrtoArray(searchTerm));
    console.log(searchQuery);

    return new Promise((resolve, reject) => {
        Beer
            .findAll({
                attributes: attributesArray,
                required: false,
                include: [{
                    model: Rating,
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'stars']],
                }],
                raw: true,
                nest: true,
                group: ['id'],
                where: {
                    $or:
                    // [
                    //     { name:  { '$like': '%molen%' } },
                    //     { name:  { '$like': '%stout%' } },
                    //     { style: { '$like': '%stout%' } },
                    //     { style: { '$like': '%molen%' } },
                    // ]
                    searchQuery
                },
            })
            .then((beers) => {
                console.log(beers);
                resolve(beers);
            })
            .catch(reject);
    });
}

searchBeer('molen stout');
