const Estate = require('../models/Estate')


exports.homeController = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    const estates = Estate.fetchAll();
    console.log('Estate', estates)
    res.render('homepage.ejs', { estates })
}
