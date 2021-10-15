const express = require('express');
const {showEstate} = require("../controllers/estates");
const {setUpProfile} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:id", setUpProfile, showEstate);

module.exports = router
