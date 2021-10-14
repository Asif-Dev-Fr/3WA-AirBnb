const express = require('express');
const {getEstates, showEstate} = require("../controllers/home");

const {isAuth} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", isAuth, getEstates);

router.get("/estate/:id", showEstate);

module.exports = router
