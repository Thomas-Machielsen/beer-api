const opdracht =
` 1. Voeg een config file toe
  2. Lees config file uit bij start applicatie
  3. Merge deze met default object
  4. En inject je config in je database connectie

  5. Implementatie met cb's
  6. En een met promises`;

//
// Callback
//

function useCallback() {  
  const fs = require('fs'); 

  function appDefaults(cb) {
    fs.readFile('./config/config.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(`No config detected exiting${err}`);
        process.exit();
      } else {
        cb(null, data);
      }
    });
  }

  appDefaults((err, data) => {
    const express       = require('express');
    const bodyParser    = require('body-parser');
    const app           = express();
    const myConnection  = require('express-myconnection');
    const mysql         = require('mysql');
    const router        = require('./routes');
    const config        = JSON.parse(data);


    // Setup serving static assets
    // app.use(express.static(path.join(__dirname, '/public')));

    console.log("Using a callback!, for rreal?!");
    app.get('/', (req, res) => {
      res.send('Express is working fine');
    });

    app.set('superSecret', config.secret); // secret variable

    const dbOptions = config.dbOptions;

    // Add middleware
    app.use(myConnection(mysql, dbOptions, 'single'));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', router);


    const port = 3030;

    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  });
}


//
// Promises
//

function usePromise() {
  const fs = require('fs');

  function startApp() {
    return new Promise(
       (resolve, reject) => {
         fs.readFile('./config/config.json', { encoding: 'utf8' },
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
       });
  }


  startApp()
  .then((data) => {
    const express       = require('express');
    const bodyParser    = require('body-parser');
    const app           = express();
    const myConnection  = require('express-myconnection');
    const mysql         = require('mysql');
    const router        = require('./routes');
    const config        = JSON.parse(data);

    console.log('Aaaah yisssh, using promises!');

    // Setup serving static assets
    // app.use(express.static(path.join(__dirname, '/public')));

    app.get('/', (req, res) => {
      res.send('Express is working fine');
    });

    app.set('superSecret', config.secret);

    const dbOptions = config.dbOptions;

    // Add middleware
    app.use(myConnection(mysql, dbOptions, 'single'));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', router);


    const port = 3030;

    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`No config detected exiting${err}`);
    process.exit();
  });
}

//
// Start app with Promise or CB
//


usePromise();
// useCallback();

