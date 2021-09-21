const express = require("express");
const {addEstate} = require("../controllers/estates");

const router = express.Router();

router.get("/add-estate", (req, res, next) => {
  res.render("form");
});

router.post("/add-estate", addEstate);

module.exports = router;
