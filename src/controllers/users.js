const User = require('../models/User')

exports.register = async (req, res, next) => {
    const user = await new User({...req.body, avatar: req.file.path});
    console.log(user);
    // user.avatar = req.file.path;
    user.save();
    res.status(302).redirect('/');
}
