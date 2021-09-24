const bcrypt = require('bcryptjs');
const {hashPassword, validatePassword} = require("../utils/password-utils")

const User = require('../models/User');

exports.register = async (req, res) => {
    // Checking if the user is already in the database
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('Email already exists !');

    //Hash password
    const hashedPassword = await hashPassword(req.body.password)

    const user = await new User({...req.body, password: hashedPassword, avatar: req.file.path});
    user.save();
    res.status(302).redirect('/');
}


exports.login = async (req, res) => {
    // Checking if the email exists in the database :
    const userData = await User.findOne({email : req.body.email});
    if(!userData) return res.status(400).send('Email doesn\'t exist !');

    // Check if password is correct :
    const validPass = await validatePassword(req.body.password, userData.password)
    if(!validPass) return res.status(400).send('Invalid password !');
    if(req.isAuthenticated()){
        console.log(req.session);
        res.status(302).redirect('/');;
    } else {
        res.status(500).redirect('/login')
    }
}
