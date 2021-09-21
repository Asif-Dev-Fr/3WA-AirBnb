const Estate = require('../models/Estate')

exports.getEstates = async (req, res, next) => {
    const estates = await Estate.find();
    // console.log(estates);
    res.render('homepage.ejs', { estates: estates })
}
