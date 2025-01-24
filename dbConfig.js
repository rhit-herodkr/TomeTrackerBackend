// Load environment variables
require('dotenv').config();

// Build the connection string
const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};User Id=${process.env.DB_USER};Password=${process.env.DB_PASSWORD};Driver={SQL Server Native Client 11.0}`;

// Export the connection string
module.exports = connectionString;
