// var config=require('./dbConfig');
//  const sql=require('msnodesqlv8');
//  const query="select * from Card";
//  async function getLoginDetails(){
//   try {
//    sql.query(config,query,(err,rows)=>{
//     console.log("Now printing your rows...")
//     console.log(rows);
//    })
//   } catch (error ) {
//    console.log(error);
//   }
//  }
//  module.exports={
//   getLoginDetails:getLoginDetails
//  }


const config = require('./dbConfig');
const sql = require('msnodesqlv8');
// console.log("Verify the drivers are installed: ",sql.getInstalledDrivers());

const query = "SELECT * FROM Book";

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
