const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
}

const comparePassword = async (password, hashed_password) => {
    return bcrypt.compare(password,hashed_password);
}

module.exports = { hashPassword, comparePassword }