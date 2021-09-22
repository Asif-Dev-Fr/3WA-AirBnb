const User = require('../models/User')

exports.register = async (req, res) => {
    const user = await new User({...req.body, avatar: req.file.path});
    user.save();
    res.status(302).redirect('/');
}
