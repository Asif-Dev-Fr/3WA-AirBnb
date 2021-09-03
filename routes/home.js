const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const homeController = require("../controllers/home");

router.get("/", homeController);

module.exports = router