const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { assignToken } = require('../utils/token')
const { hashPassword, comparePassword } = require('../utils/password_hash')

const registerController = async (req, res) => {
    try {
        const { username, password, email, isAdmin } = req.body;
        const usernameOrEmailAlreadyTaken = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (usernameOrEmailAlreadyTaken) {
            return res.status(401).json({
                message: "Username or Email is Already taken"
            })
        }

        const user = await userModel.create({
            username,
            password: await hashPassword(password),
            email,
            isSeller: isAdmin
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
    const isPasswordCorrect = await comparePassword(password, user.password);

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

const updateUserController = async (req, res) => {
    const user = req.user;
    const data = req.body;
    try {
        const dbUser = await userModel.findOne({email:user.email});
        const isPasswordCorrect = comparePassword(data.password,dbUser.password);
        if(isPasswordCorrect){
            await userModel.findOneAndUpdate({ _id: user._id }, data);
            return res.json({
                message:"User Updated Successfully",
                data,
                dbUser
            })
        }else{
            return res.status(401).json({
                message:"Password Incorrect"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteUserController = async (req,res) => {
    const user = req.user;
    try{
        const isUserDeleted = await userModel.findOneAndDelete({email:user.email});
        if(isUserDeleted){
            return res.json("User deleted Successfully");
        }else{
            return res.json({
                message:"User Not Deleted"
            })
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = { loginController, registerController, logoutController, updateUserController, deleteUserController }