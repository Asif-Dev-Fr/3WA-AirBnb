const express = require("express");
const passport = require('passport')

const { register, login } = require("../controllers/users")
const upload = require("../utils/multer-init")

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("users/form-register");
});

router.post("/register", upload.single("avatar"), register);


router.get("/login", (req, res) => {
  res.render("users/form-login");
});

router.post("/login", passport.authenticate("local"), login);
// router.post("/login", passport.authenticate("local"), (req, res)=> {

// });
// router.post("/login", passport.authenticate("local", { successRedirect: '/',
// failureRedirect: '/login',
// failureFlash: true }), login)

module.exports = router;
