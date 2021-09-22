const express = require("express");

const { register } = require("../controllers/users")
const upload = require("../utils/multer-init")

const router = express.Router();

router.get("/register", (req, res, next) => {
  res.render("users/form-register");
});

router.post("/register", upload.single("avatar"), register);

module.exports = router;
