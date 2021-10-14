const path = require('path');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

exports.isAuth = (req, res, next) => {
  if(req.cookies.Token){
    try {
      const {id, firstName, role, email} = jsonwebtoken.verify(req.cookies.Token, PRIV_KEY)
      res.locals.currentUser = { id, firstName, role, email }
      next()
    } catch(err) {
      res.status(401).json({msg: `Error: ${err}`})
    }
  } else {
    next()
  }
}

exports.isAdmin = (req, res, next) => {
  console.log(res.locals.currentUser);
  if(res.locals.currentUser && res.locals.currentUser.role === 'admin'){
    try {
      next()
    } catch(err) {
      res.status(401).json({msg: `Error: ${err}`})
    }
  } else {
    res.status(401).json({msg: 'You are not authorize to view this resource because your not an admin'})
  }
}
