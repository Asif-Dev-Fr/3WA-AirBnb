const Estate = require('../models/Estate')

exports.getEstates = (req, res, next) => {
    const estates = Estate.fetchAll();
    res.render('homepage.ejs', { estates: estates })
}
