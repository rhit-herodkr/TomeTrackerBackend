// Load environment variables
require('dotenv').config();

// Build the connection string
// const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Uid=${process.env.DB_USER};Pwd=${process.env.DB_PASSWORD};`;

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
  },
};

// Export the connection
module.exports = {
    connect: () => sql.connect(config),
    sql,
}