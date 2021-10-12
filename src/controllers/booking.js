const Booking = require('../models/Booking');
const Estate = require('../models/Estate');

exports.addBooking = async (req, res, next) => {
  const booking = await new Booking({
    ...req.body
  });
  booking.save();
  req.flash('success', 'Your flat is booked');
  res.status(302).redirect('/');
}

exports.allBooking = async (req, res, next) => {
  // const bookings = Booking.find().populate({ path: '_estate', model: Estate });
  const bookings = Booking.find({_user: res.locals.currentUser._id})
  console.log(bookings);
  res.end()
  // let message = req.flash();
  // res.render('bookings.ejs', {
  //   message: message,
  //   estates: estates
  // });
}
