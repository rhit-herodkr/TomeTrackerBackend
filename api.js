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