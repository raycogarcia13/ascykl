const express = require('express');
const router = express.Router();

const { store, get, find, update, remove } = require('../../controllers/productController')

const { isAuthenticatedUser } = require("../../middlewares/auth")
// router.post('/',store)
router.get('/products',get)
router.post('/product', isAuthenticatedUser , store);

router.route('/product/:id')
        .get(find)
        .put(isAuthenticatedUser,update)
        .delete(isAuthenticatedUser,remove)

module.exports = router