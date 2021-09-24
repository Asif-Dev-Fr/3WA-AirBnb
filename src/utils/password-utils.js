const bcrypt = require('bcryptjs');

exports.hashPassword = async(password) => {
  //Hash password
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

exports.validatePassword = async(enteredPassword, password) => {
  // Check if password is correct :
  try {
    return await bcrypt.compare(enteredPassword, password);
  } catch (error) {
    console.log('ERROR: ' + error);
  }
}
