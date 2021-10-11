const express = require('express');
const {showEstate} = require("../controllers/estates");

const router = express.Router();

router.get("/:id", showEstate);

module.exports = router
