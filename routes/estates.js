const express = require("express");
const {addEstate} = require("../controllers/estates");
const {removeEstate} = require("../controllers/estates");
const {editEstate} = require("../controllers/estates");
const {updateEstate} = require("../controllers/estates");

const router = express.Router();

router.get("/add-estate", (req, res, next) => {
  res.render("form");
});

router.post("/add-estate", addEstate);

router.get("/delete-estate/:id", removeEstate);

router.get("/edit-estate/:id", editEstate);

router.post("/update-estate/:id", updateEstate);

module.exports = router;
