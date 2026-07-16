const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('../models/user.model');

const checkToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Login first to get access" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ _id: decoded.id }).select('-password')

        if (!user) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: "error" })
    }
}

const checkAdmin = async (req, res, next) => {

    const user = await userModel.findOne({_id :req.user.id})

    if(!user.isAdmin){
        return res.status(401).json({
            message:"Access Denied. Admin access required"
        })
    }
    next();   
}

module.exports = { checkToken, checkAdmin };