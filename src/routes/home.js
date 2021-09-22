const express = require('express');
const {getEstates} = require("../controllers/home");

const router = express.Router();

router.get("/", getEstates);

module.exports = router
