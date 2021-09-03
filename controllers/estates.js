const Estate = require('../models/Estate')


exports.addEstate = (req, res, next) => {

    const estate = new Estate(req.body)
    estate.save()
    const estates = Estate.fetchAll();

    res.status(302).render('homepage', {estates})
    
}