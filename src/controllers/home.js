const Estate = require('../models/Estate')

exports.getEstates = async (req, res, next) => {
    const estates = await Estate.find();
    const title = 'Accueil';
    let message = req.flash();

    res.render('homepage.ejs', {
      message,
      estates,
      title,
      layout: './layouts/guest-layout'
    });
}

exports.showEstate = async (req, res) => {
    const estate = await Estate.findOne({ _id: req.params.id });
    const title = "Description estate"
    res.status(302).render("estates/estate", {estate, title})
}
