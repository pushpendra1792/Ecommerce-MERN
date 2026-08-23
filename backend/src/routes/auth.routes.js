const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = express.Router();
const { loginController, registerController, logoutController, updateUserController, deleteUserController } = require('../controllers/auth.controller');
const { checkToken } = require('../middlewares/auth.middleware');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', checkToken, logoutController);
router.patch('/update-user', checkToken, updateUserController);
router.delete('/delete-user', checkToken, deleteUserController);

router.get('/user', checkToken, (req, res) => {
    res.status(201).json({
        message: "User fetched Successfully",
        user: req.user
    })
})

module.exports = router;