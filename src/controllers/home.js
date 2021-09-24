const Estate = require('../models/Estate')

exports.getEstates = async (req, res, next) => {
    const estates = await Estate.find();
    const title = 'Accueil';
    res.render('homepage.ejs', { estates, title })
}
