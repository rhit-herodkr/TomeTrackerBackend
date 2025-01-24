const config = require('./dbConfig');
const sql = require('msnodesqlv8');

/**
 * Update the follwing query variable with desired query from the database
 */
const query = "SELECT * FROM Book";

/**
 * 
 * @returns 
 */
async function getLoginDetails() {
  return new Promise((resolve, reject) => {
    sql.query(config, query, (err, rows) => {
      if (err) {
        console.error("Error fetching data from database in dbOperations:", err);
        reject(err); // Reject the promise with the error
      } else {
        console.log("Now printing your rows...");
        console.log(rows); // Print rows in the console
        resolve(rows); // Resolve the promise with the rows
      }
    });
  });
}

module.exports = {
  getLoginDetails
};
