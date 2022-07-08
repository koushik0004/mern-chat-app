const asyncHandler = require('express-async-handler'); // handling different scenarios
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({ name, email, password, pic });
  if (user) {
    return res.status(201).json({
      status: 'success',
      data: user,
      token: generateToken(user)
    });
  } else {
    res.status(400);
    throw new Error('Failed to create user');
  }
});

module.exports = { registerUser };
