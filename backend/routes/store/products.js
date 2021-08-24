const express = require('express');
const router = express.Router();

const { store, get, find, update, remove } = require('../../controllers/productController')

const { isAuthenticatedUser, authorizeRole } = require("../../middlewares/auth")
// router.post('/',store)
router.get('/products',get)
router.post('/product', isAuthenticatedUser, authorizeRole('Admin'), store);

router.route('/product/:id')
        .get(find)
        .put(isAuthenticatedUser,authorizeRole('Admin'),update)
        .delete(isAuthenticatedUser,authorizeRole('Admin'),remove)

module.exports = router