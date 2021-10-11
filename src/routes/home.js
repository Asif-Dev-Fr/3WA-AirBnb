const express = require('express');
const {getEstates} = require("../controllers/home");
const {showEstate} = require("../controllers/estates");

const {setUpProfile} = require("../middlewares/authMiddleware");

const router = express.Router();

// var auth = function (req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.status(401).json("not authenticated!");
// }

router.get("/", setUpProfile, getEstates);

router.get("/:id", showEstate);

module.exports = router
