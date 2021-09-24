const Estate = require('../models/Estate')

exports.getEstates = async (req, res, next) => {
  // console.log("home " + req.user.firstName);
    const estates = await Estate.find();
    let message = req.flash();
    res.render('homepage.ejs', {
      message: message,
      estates: estates
    });
    // res.render('homepage.ejs', { estates: estates })
}
