// Load environment variables
require('dotenv').config();

// Build the connection string
const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Uid=${process.env.DB_USER};Pwd=${process.env.DB_PASSWORD};`;

// Export the connection string
module.exports = connectionString;
