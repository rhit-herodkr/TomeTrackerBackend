// const { reset } = require('nodemon');
// const dboperations = require('./dbOperations');

// dboperations.getLoginDetails().then(result=>{
//  console.log("Fetching the details from your database...")
//  console.log(result);
// })

const dboperations = require('./dbOperations');
(async () => {
  try {
    console.log("Fetching the details from your database...");
    const result = await dboperations.getLoginDetails();
    console.log("Result from the database:");
    console.log(result);
  } catch (error) {
    console.error("Error occurred while fetching details:", error);
  }
})();
