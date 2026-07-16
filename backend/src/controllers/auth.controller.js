const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { assignToken } = require('../utils/token')

const registerController = async (req, res) => {
    try {
        const { username, password, email, isAdmin } = req.body;
        const usernameAlreadyTaken = await userModel.findOne({
            username
        })

        if (usernameAlreadyTaken) {
            return res.status(401).json({
                message: "Username Already taken"
            })
        }

        const user = await userModel.create({
            username,
            password: await bcrypt.hash(password, 10),
            email,
            isAdmin
        })

        const token = assignToken(user);

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })
    if (!user) {
        return res.status(401).json({
            message: "User not found"
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Incorrect Password"
        })
    }

    const token = assignToken(user);

    res.cookie("token", token);

    res.json({
        message: "Logged In"
    })
}

const logoutController = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: "Logout successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { loginController, registerController, logoutController }