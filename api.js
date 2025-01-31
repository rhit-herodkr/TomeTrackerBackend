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

app.get('/api/get-checkedout', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run a stored procedure to select all books
    let result = await TomeTrackerDB.request().query('EXEC ReadCheckedOutTable');

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

app.get('/api/get-employees', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run a stored procedure to select all books
    let result = await TomeTrackerDB.request().query('EXEC ReadEmployeesTable');

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

app.get('/api/get-reviews', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run a stored procedure to select all books
    let result = await TomeTrackerDB.request().query('EXEC ReadReviewsTable');

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

app.post('/api/login-member', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    let result = await TomeTrackerDB.request().query(
      `EXEC LoginMember @email = '${req.body.loginEmail}', @password = '${req.body.loginPassword}'`);

    // Send the result back as JSON
    res.json(result.recordset);

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    // Close the SQL connection
    await sql.close();
  }
})

app.post('/api/login-employee', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run the stored procedure and get the result
    let result = await TomeTrackerDB.request()
      .input('email', sql.VarChar, req.body.loginEmail)
      .input('password', sql.VarChar, req.body.loginPassword)
      .query('EXEC LoginEmployee @email, @password');

    // Send the result back as JSON
    if (result.recordset && result.recordset.length > 0) {
      const isHeadLibrarian = result.recordset[0].isHeadLibrarian;
      res.json({ isHeadLibrarian }); // Send the result as a JSON response
    } else {
      res.status(401).send('Login failed');
    }
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

    // Prepare and execute the stored procedure using parameterized queries
    let request = TomeTrackerDB.request();
    request.input('name', sql.VarChar, req.body.nameValue);
    request.input('address', sql.VarChar, req.body.addressValue);
    request.input('dob', sql.VarChar, req.body.dobValue);
    request.input('email', sql.VarChar, req.body.loginEmail);
    request.input('password', sql.VarChar, req.body.loginPassword);

    //Execute the stored procedure
    let result = await request.execute('RegisterMember');

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


app.post('/api/add-book', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run a stored procedure to select all books
    let result = await TomeTrackerDB.request().query(
      `EXEC AddBook @publishedDate = '${req.body.pubDate}' , @genre = '${req.body.genre}', `
      + `@type = '${req.body.type}', @isbn = ${req.body.isbn}, `
      + `@author = '${req.body.author}', @title = '${req.body.title}'`);

    res.json(result.recordset);

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    // Close the SQL connection
    await sql.close();
  }
})

app.post('/api/add-review', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run a stored procedure to insert the review
    let result = await TomeTrackerDB.request()
      .input('memberID', sql.Int, req.body.memberID)
      .input('bookID', sql.Int, req.body.bookID)
      .input('desc', sql.VarChar(1500), req.body.desc)
      .input('stars', sql.Int, req.body.stars)
      .query('EXEC AddReview @memberID, @bookID, @desc, @stars');

    // Send response back
    res.json(result.recordset);

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    // Close the SQL connection
    await sql.close();
  }
});

app.post('/api/checkout-book', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run a stored procedure to insert the checkout record
    let result = await TomeTrackerDB.request()
      .input('BookID', sql.Int, req.body.BookID)
      .input('CardID', sql.Int, req.body.CardID)
      .query('EXEC CheckOutBook @BookID, @CardID');

    // Send response back
    res.json(result.recordset);

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    // Close the SQL connection
    await sql.close();
  }
});


app.post('/api/add-employee', async (req, res) => {
  try {
    // Connect to the database
    let TomeTrackerDB = await sql.connect(config);

    // Run the stored procedure for adding an employee with parameterized SQL
    let result = await TomeTrackerDB.request()
      .input('Name', sql.VarChar, req.body.Name)
      .input('Address', sql.VarChar, req.body.Address)
      .input('DOB', sql.VarChar, req.body.DOB)
      .input('Email', sql.VarChar, req.body.Email)
      .input('Password', sql.VarChar, req.body.Password)
      .execute('AddEmployee');  // Call the stored procedure

    res.json(result.recordset);

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
  } finally {
    // Close the SQL connection
    await sql.close();
  }
});


app.listen(3000); // start Node + Express server on port 3000, where the api layer lives