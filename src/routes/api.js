const express = require("express");
const router = express.Router();
const Estate = require("../models/Estate");

router.get("/estates", async (req, res) => {
    const data = await Estate.find()
    res.status(200).send(data);
})

module.exports = router;