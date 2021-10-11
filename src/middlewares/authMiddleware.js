const User = require('../models/User');

exports.isAuth = (req, res, next) => {
  // next()
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({msg: 'You are not authorize to view this resource'})
  }
}

exports.isAdmin = (req, res, next) => {
  if(req.isAuthenticated() && req.user.role == 'admin') {
    next();
  } else {
    res.status(401).json({msg: 'You are not authorize to view this resource because your not an admin'})
  }
}

exports.setUpProfile = async (req, res, next) => {
  if(req.session.passport && !req.session.passport.user){
    next();
  } else {
    res.locals.currentUser = req.user
    next();
  }
}
