const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const {getEstates} = require("../controllers/home");
router.get("/", getEstates);


module.exports = router