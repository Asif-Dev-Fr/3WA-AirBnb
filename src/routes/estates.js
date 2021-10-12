const express = require("express");
const {addEstate, removeEstate, editEstate, updateEstate} = require("../controllers/estates");
const upload = require("../utils/multer-init")

const router = express.Router();

router.get("/add-estate", (req, res, next) => {
  const isEdit = false
  const title = "Ajout établissement"
  // To use another layout--> attribute layout: './layout path'
  res.render("estates/form-estate", {
    isEdit,
    title,
    layout: './layouts/admin-layout'
  });
});

router.post("/add-estate", upload.array("photos", 5), addEstate);

router.get("/delete-estate/:id", removeEstate);

router.get("/edit-estate/:id", editEstate);
router.post("/update-estate/:id", updateEstate);




module.exports = router;
