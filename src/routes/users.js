const express = require("express");

const { register, login } = require("../controllers/users");
const {allBooking} = require("../controllers/booking");
const upload = require("../utils/multer-init");
const {isAuth, isAdmin} = require("../middlewares/authMiddleware")
const router = express.Router();

router.get("/register", (req, res) => {
  let message = req.flash();
  res.render("users/form-register", {
    message: message,
  });
});

router.post("/register", upload.single("avatar"), register);

router.get("/login", (req, res) => {
  let message = req.flash();
  res.render("users/form-login", {
    message: message,
  });
});

router.post("/login", login);

router.get("/logout", (req, res) => {
  req.logOut();
  res.locals.currentUser = null;
  res.clearCookie('Token');
  res.redirect('/');
})

router.get('/protected', (req, res, next) => {
  res.status(200).json({success: true, msg: "you are authorize"})
})

router.get('/admin-route', isAuth, isAdmin, (req, res, next) => {
  res.send('You made it to the admin route')
})

router.get('/profile', isAuth, (req, res, next) => {
  res.render('users/profile')
})

router.get("/bookings", isAuth, allBooking);

module.exports = router;
