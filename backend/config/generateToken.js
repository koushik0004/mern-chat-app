const JWT = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    subject: user._id,
    name: user.name,
    email: user.email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  };
  return JWT.sign(payload, process.env.JWT_SECRET);
};

module.exports = generateToken;
