const User = require('../models/User');
const {comparePassword} = require('../services/util')

async function register(username, password) {
  const user = new User({
    username,
    hashedPassword: password,
  });
  await user.save();
}

async function login(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Incorrect username or password!');
  } else {
    return user.comparePassword(password);
  }
}

module.exports = () => (req, res, next) => {
  req.auth = {
    register,
    login,
  };

  next();
};
