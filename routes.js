const express = require("express")
const router = express.Router();
const { executeQuery } = require("./dbConfig.js");

router.get("/allBooks", async (req, res) => {
    try {
        const result = await executeQuery("SELECT * FROM Book")
        res.send(result.recordset)
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});