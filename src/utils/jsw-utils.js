const fs = require('fs');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const issueJWT = (user) => {
  const _id = user._id;

  const expiresIn = '1d';

  const payload = {
    id: _id,
    firstName: user.firstName,
    role: user.role,
    email: user.email,
    iat: Date.now()
  }

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn})

  return {
    token: signedToken
  }
}

module.exports = issueJWT;
