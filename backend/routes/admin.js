const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers/authController')

const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth")

router.get('/users', isAuthenticatedUser, authorizeRole('Admin'), getUsers);

module.exports = router