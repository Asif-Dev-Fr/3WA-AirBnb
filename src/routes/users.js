const express = require("express");
const passport = require('passport');

const { register, login } = require("../controllers/users");
const upload = require("../utils/multer-init");
const {isAuth,isAdmin,setUpProfile} = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/register", (req, res) => {
  let message = req.flash();
  res.render("users/form-register", {
    message: message,
  });
  // res.render("users/form-register");
});

router.post("/register", upload.single("avatar"), register);


router.get("/login", (req, res) => {
  let message = req.flash();
  // res.render("users/form-login");
  res.render("users/form-login", {
    message: message,
  });
});

router.post("/login", passport.authenticate("local"), login);

router.get("/logout", (req, res) => {
  req.logOut();
  res.locals.user = null;
  res.redirect('/');
})

router.get('/protected-route', isAuth, setUpProfile, (req, res, next) => {
  res.send('You made it to the protected route')
})

router.get('/admin-route', isAuth, isAdmin, (req, res, next) => {
  res.send('You made it to the admin route')
})

router.get('/profile', setUpProfile, (req, res, next) => {
  res.render('users/profile')
})

module.exports = router;
