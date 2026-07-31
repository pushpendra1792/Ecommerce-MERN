const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
})

userSchema.index(
    { username: 1 },
    { unique: true }
)
userSchema.index(
    { email: 1 },
    { unique: true }
)

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;