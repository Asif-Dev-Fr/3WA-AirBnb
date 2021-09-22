const express = require("express");

/* const {editEstate} = require("../controllers/estates");
const {updateEstate} = require("../controllers/estates"); */

const router = express.Router();

router.get("/register",  (req, res, next) => {
  res.render("users/form-register");
});

// router.post("users/register/", register);


module.exports = router;