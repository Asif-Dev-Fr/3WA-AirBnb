const express = require("express");
const {addEstate, removeEstate, editEstate, updateEstate} = require("../controllers/estates");


const router = express.Router();

router.get("/add-estate", (req, res, next) => {
  res.render("estates/form-estate", {estate: false});
});

router.post("/add-estate", addEstate);

router.get("/delete-estate/:id", removeEstate);

router.get("/edit-estate/:id", editEstate);
router.post("/update-estate/:id", updateEstate);




module.exports = router;
