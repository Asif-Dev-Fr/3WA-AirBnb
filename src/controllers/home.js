const Estate = require('../models/Estate')

exports.getEstates = async (req, res, next) => {
  // console.log("home " + req.user.firstName);
    const estates = await Estate.find();
    const title = 'Accueil';
    let message = req.flash();

    res.render('homepage.ejs', {
      message,
      estates,
      title
    });
    // res.render('homepage.ejs', { estates: estates })
}

exports.showEstate = async (req, res) => {
    const estate = await Estate.findOne({ _id: req.params.id });
    res.status(302).render("estates/estate", {estate})
}