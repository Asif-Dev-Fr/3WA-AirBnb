const express = require('express');
const {getEstates, showEstate} = require("../controllers/home");

const {setUpProfile} = require("../middlewares/authMiddleware");

const router = express.Router();

// var auth = function (req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.status(401).json("not authenticated!");
// }

router.get("/", setUpProfile, getEstates);
// router.get("/", setUpProfile, getEstates);

router.get("/estate/:id", showEstate);

module.exports = router
