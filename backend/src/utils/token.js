const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('../models/user.model');

const assignToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return token;
}

module.exports = { assignToken };