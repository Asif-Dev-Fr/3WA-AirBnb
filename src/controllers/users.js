const bcrypt = require('bcryptjs');
const { hashPassword, validatePassword } = require('../utils/password-utils');
const { registerValidation, loginValidation } = require('../validation/validation');

const User = require('../models/User');

exports.register = async (req, res) => {
  const validation = registerValidation(req.body);

  // Validation of data before creating a new user :
  if (validation.error) {
    req.flash('error', validation.error.details[0].message);
    return res.redirect('/user/register');
  }

  // Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {
    req.flash('error', 'email already used');
    return res.redirect('/user/register');
  }

  //Hash password
  const hashedPassword = await hashPassword(req.body.password);

  const user = await new User({
    ...req.body,
    password: hashedPassword,
    avatar: typeof req.file === 'undefined' ? '' : req.file.path
  });
  user.save();

	req.flash('success', 'Your register successfully');
  res.status(302).redirect('/user/login');
};

exports.login = async (req, res) => {
  // Checking if the email exists in the database :
  const userData = await User.findOne({ email: req.body.email });
  // if (!userData) return res.status(400).send("Email doesn't exist !");
	if (!userData) {
    req.flash('error', "Email doesn't exist!");
    return res.redirect('/user/register');
  }

	const validation = loginValidation(req.body);
	if (validation.error) {
    req.flash('error', validation.error.details[0].message);
    return res.redirect('/user/login');
  }

  // Check if password is correct :
  const validPass = await validatePassword(
    req.body.password,
    userData.password
  );

  // if (!validPass) return res.status(400).send('Invalid password !');
	if (!validPass) {
    req.flash('error', "Wrong password");
    return res.redirect('/user/login');
  }

  if (req.isAuthenticated()) {
    res.status(302).redirect('/');
    // res.status(302).redirect('/user/protected-route');
  } else {
    res.status(500).redirect('/user/login');
  }
};
