const Estate = require('../models/Estate')

exports.getEstates = async (req, res, next) => {
    const estates = await Estate.find();
    res.render('homepage.ejs', { estates: estates })
}
