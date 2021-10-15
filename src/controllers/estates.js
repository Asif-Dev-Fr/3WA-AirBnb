const Estate = require('../models/Estate');
const axios = require('axios');

exports.addEstate = async (req, res, next) => {
    console.log("🚀 ~ file: estates.js ~ line 5 ~ req.body ~ ADDRESS", req.body.address)
    let lat;
    let lng;
    let name = req.body.name;
    let price = req.body.price;
    let address
    let zipCode;
    let country;
    let photos = req.body.photos

    const fetch = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/98 Boulevard De Sebastopol, Paris, 75003, France.json?access_token=${process.env.MAPBOX_TOKEN}&limit=1`)

    if(fetch.data.features[0] && fetch.data.features[0].geometry.coordinates[0]) lng = fetch.data.features[0].geometry.coordinates[0];
    if(fetch.data.features[0] && fetch.data.features[0].geometry.coordinates[1]) lat = fetch.data.features[0].geometry.coordinates[1];

    if(fetch.data.features[0] && fetch.data.features[0].place_name) {
        let split = fetch.data.features[0].place_name.split(",");
        address = split[0];
        country = split[2].trim() ? split[2].trim() : 'France';
        let splitZipcode = split[1].trim().split(" ");
        zipCode = splitZipcode[0]
    };

    const newEstate = {name, address, price, zipCode, country, lat, lng, photos};
    

    const estate = await new Estate(newEstate)
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
    res.render("estates/form-estate", {
        estate,
        isEdit,
        title,
        layout: './layouts/admin-layout'
    })
}

exports.updateEstate = async (req, res) => {
    await Estate.findOneAndUpdate({ _id: req.params.id }, {...req.body});
    res.status(302).redirect('/');
}

exports.showEstate = async (req, res) => {
    const title = "Description établissement"
    const estate = await Estate.findOne({ _id: req.params.id });
    res.status(302).render("estates/estate", {estate, title})
}


