const Estate = require('../models/Estate')

exports.addEstate = async (req, res, next) => {
    const estate = await new Estate(req.body)
    estate.save()
    res.status(302).redirect('/');
}

exports.removeEstate = async (req, res) => {
    await Estate.deleteOne({ _id: req.params.id });
    res.status(302).redirect('/');
}

exports.editEstate = async (req, res) => {
    const estate = await Estate.findOne({ _id: req.params.id });
    const isEdit = true
    const title = "Édition établissement"
    res.status(302).render("estates/form-estate", {
        estate,
        isEdit,
        title 
    })
}

exports.updateEstate = async (req, res) => {
    await Estate.findOneAndUpdate({ _id: req.params.id }, {...req.body});
    res.status(302).redirect('/');
}
