const express = require("express");
const multer  = require("multer");

const { register } = require("../controllers/users")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

const router = express.Router();

router.get("/register", (req, res, next) => {
  res.render("users/form-register");
});

router.post("/register", upload.single("avatar"), register);
router.post("/register", upload.array("photos", 5), register);

module.exports = router;
