const express = require('express');
const {getEstates} = require("../controllers/home");
const {showEstate} = require("../controllers/estates");

const {isAuth} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", isAuth, getEstates);

router.get("/:id", showEstate);

module.exports = router
