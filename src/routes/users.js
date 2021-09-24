const express = require("express");

const router = express.Router();

router.get("/register",  (req, res, next) => {
  const title="Création compte"
  res.render("users/form-register", { title });
});

// router.post("users/register/", register);


module.exports = router;