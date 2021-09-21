const Estate = require('../models/Estate')

exports.addEstate = (req, res, next) => {
    const estate = new Estate(req.body)
    estate.save()
    res.status(302).redirect('/');
}

