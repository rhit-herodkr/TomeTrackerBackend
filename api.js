// // var dboperations = require('./dbOperations');

// // var result = null;
// // (async () => {
// //   try {
// //     console.log("Fetching the details from your database...");
// //     result = await dboperations.getLoginDetails();
// //     console.log("Result from the database:");
// //     console.log(result);
// //   } catch (error) {
// //     console.error("Error occurred while fetching details:", error);
// //   }
// // })();
// // // JSON.stringify(result)
// // console.log(typeof(result))

// // // global.window.books = result;


// const express = require('express');
// const sql = require('mssql');
// const { connect } = require('./dbConfig.js');
// const app = express();
// // const port = 3000;
// const cors = require("cors");
// const bodyParser = require("body-parser");
// // const allBooks = require("./routes.js");

// app.get('/api/', (req, res) => {
//   res.send('Hello World')
// })

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors());

// connect()
//   .then((connection) => {
//     console.log("Connected to the database.");
//   })
//   .catch((error) => {
//     console.log("Database connection failed!");
//     console.log(error);
//   });

// app.get('/get-books', async (req, res) => {
//   try {
//     // Connect to the database
//     await connect;

//     // Run a query to select all books
//     const result = await sql.query('SELECT * FROM books');

//     // Send the result back as JSON
//     res.json(result.recordset);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).send('Error executing query');
//   } finally {
//     // Close the SQL connection
//     await sql.close();
//   }
// });

// // app.use("/books", allBooks.router);

// app.listen(5000);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Load sql
const sql = require("mssql");

//Build connection
const config = {
    server: `${process.env.DB_SERVER}`,
    database: `${process.env.DB_NAME}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    
    // server: 'golem.csse.rose-hulman.edu',
    // database: 'TomeTrackerDB',
    // user: 'herodkr',
    // password: 'Cake3725!ROSE',
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    }
};

sql.connect(config)
  .then((connection) => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.log("Database connection failed!");
    console.log(error);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.get('/api/get-books', async (req, res) => {
    try {
      // Connect to the database
      let TomeTrackerDB = await sql.connect(config);
  
      // Run a query to select all books
      let result = await TomeTrackerDB.request().query('SELECT * FROM Book');
  
      // Send the result back as JSON
      res.json(result.recordset);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
    } finally {
      // Close the SQL connection
      await sql.close();
    }
  });

app.listen(3000); // start Node + Express server on port 5000