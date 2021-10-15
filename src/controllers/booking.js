const Booking = require('../models/Booking');
const Estate = require('../models/Estate');
const User = require('../models/User');

exports.addBooking = async (req, res, next) => {
  // console.log(req.body.user);
  // const user = await User.findOne({_id: req.body._user})
  // const estate = await Estate.findOne({_id: req.body.estate})
  // console.log(estate._id, user._id);
  // res.end()
  try {
    const booking = await new Booking({
      ...req.body
    });
    booking.save();
    req.flash('success', 'Your flat is booked');
    res.status(302).redirect('/');
  } catch (error) {
    res.status(404).send('Something broke!');
  }
}

exports.allBooking = async (req, res, next) => {
  const bookings = await Booking.find({_user: res.locals.currentUser.id}, '-_user -_id').populate('_estate', 'address price photos -_id')
  let message = req.flash();
  res.render('bookings/user.ejs', {
    bookings,
    message
  });
}
