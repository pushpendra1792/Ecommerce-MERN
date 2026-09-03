const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    mobileNumber: {
        type: String
    },

    profilePhoto: {
        type: String,
        default: ""
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required:true,
        lowercase:true,
        trim:true
    },

    isSeller: {
        type: Boolean,
        default:false
    }
})

userSchema.index(
    { email: 1 },
    { unique: true }
)

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;