const express = require('express');
const {getEstates, showEstate} = require("../controllers/home");

const router = express.Router();

router.get("/", getEstates);
router.get("/estate/:id", showEstate);


module.exports = router
