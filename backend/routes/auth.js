const express = require('express');
const router = express.Router();

const { register, login, logout, verify } = require('../controllers/authController')

const { isAuthenticatedUser } = require("../middlewares/auth")

router.post('/register', register);
router.post('/verify', verify);
router.post('/login', login);
router.get('/logout', isAuthenticatedUser, logout);

module.exports = router