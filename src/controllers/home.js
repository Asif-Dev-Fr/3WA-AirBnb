const Estate = require('../models/Estate')

exports.getEstates = async (req, res, next) => {
    const estates = await Estate.find();
    let message = req.flash();
    res.render('homepage.ejs', {
      message: message,
      estates: estates
    });
}

exports.showEstate = async (req, res) => {
    const estate = await Estate.findOne({ _id: req.params.id });
    res.status(302).render("estates/estate", {estate})
}
