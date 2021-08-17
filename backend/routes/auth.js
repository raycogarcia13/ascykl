const express = require('express');
const router = express.Router();

const { register, login, logout } = require('../controllers/authController')

const { isAuthenticatedUser } = require("../middlewares/auth")

router.post('/register',isAuthenticatedUser, register);
router.post('/login', login);
router.get('/logout', isAuthenticatedUser, logout);

module.exports = router