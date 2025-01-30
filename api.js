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

//Tells the database server what type of functions it is allowed to run
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

    // Run a stored procedure to select all books
    let result = await TomeTrackerDB.request().query('EXEC ReadBooksTable');

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

app.post('/api/register-member', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run a stored procedure to select all books
    let result = await TomeTrackerDB.request().query(
      `EXEC RegisterMember 
    @name = '${req.body.name}', 
    @address = '${req.body.address}', 
    @DOB = '${req.body.dob}', 
    @email = '${req.body.email}', 
    @password = '${req.body.password}'`);

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    // Close the SQL connection
    await sql.close();
  }
})

app.post('/api/login-member', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run a stored procedure to select all books
    let result = await TomeTrackerDB.request().query(
      `EXEC LoginMember @email = '${req.body.loginEmail}', @password = '${req.body.loginPassword}'`);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    // Close the SQL connection
    await sql.close();
  }
})

app.post('/api/add-book', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run a stored procedure to select all books
    let result = await TomeTrackerDB.request().query(
      `EXEC AddBook @publishedDate = '${req.body.pubDate}' , @genre = '${req.body.genre}', `
      + `@type = '${req.body.type}', @isbn = ${req.body.isbn}, `
      + `@author = '${req.body.author}', @title = '${req.body.title}'`);

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    // Close the SQL connection
    await sql.close();
  }
})

app.listen(3000); // start Node + Express server on port 3000, where the api layer lives