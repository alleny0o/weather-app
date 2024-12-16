const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
};

module.exports = { generateToken };