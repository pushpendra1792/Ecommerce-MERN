const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = express.Router();
const { loginController, registerController, logoutController } = require('../controllers/auth.controller');
const { checkToken } = require('../middlewares/auth.middleware');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout',checkToken, logoutController);

router.get('/user', checkToken, (req,res)=>{
    res.status(201).json({
        message:"User fetched Successfully",
        user:req.user
    })
})

module.exports = router;