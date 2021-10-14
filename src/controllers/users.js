const { hashPassword, validatePassword } = require('../utils/password-utils');
const { registerValidation, loginValidation } = require('../validation/validation');
const issueJWT = require("../utils/jsw-utils")

const User = require('../models/User');

exports.register = async (req, res, next) => {
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
  user.save()
      .then((user) => {
        const jwt = issueJWT(user)
        console.log('from register', jwt);
        req.flash('success', 'Your register successfully');
        res.status(302).redirect('/user/login');
      })
      .catch(err => next(err));

	req.flash('success', 'Your register successfully');
};

exports.login = async (req, res) => {
  // Checking if the email exists in the database :
  const userData = await User.findOne({ email: req.body.email });

	if (!userData) {
    req.flash('error', "Email doesn't exist");
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

	if (!validPass) {
    req.flash('error', "Invalid password");
    return res.redirect('/user/login');
  }

  if(validPass) {
    const tokenObject = issueJWT(userData)
    res.cookie('Token', tokenObject.token)
    res.status(302).redirect('/');
  } else {
    res.status(302).redirect('/user/login');
  }
};

