const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.register = async (req, res) => {
    // Checking if the user is already in the database
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('Email already exists !');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await new User({...req.body, password: hashedPassword, avatar: req.file.path});
    user.save();
    res.status(302).redirect('/');
}


exports.login = async (req, res) => {
    // const validation = loginValidation(req.body);

    // // Validation of data before logging in:
    // if (validation.error) return res.status(400).send(validation.error.details[0].message);

    // Checking if the email exists in the database :
    const userData = await User.findOne({email : req.body.email});
    if(!userData) return res.status(400).send('Email doesn\'t exist !');

    // Check if password is correct :
    const validPass = await bcrypt.compare(req.body.password, userData.password);
    if(!validPass) return res.status(400).send('Invalid password !');

    res.status(302).redirect('/');
}
