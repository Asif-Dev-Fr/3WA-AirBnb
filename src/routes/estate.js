const express = require('express');
const {showEstate} = require("../controllers/estates");
const {isAuth} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:id", isAuth, showEstate);

module.exports = router
