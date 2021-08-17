const express = require('express');
const router = express.Router();

const { newOrder, get, find, findMyOrders } = require('../../controllers/orderController')

const { isAuthenticatedUser, authorizeRole } = require("../../middlewares/auth")
// router.post('/',store)
router.get('/orders',isAuthenticatedUser, authorizeRole('Admin'), get)
router.post('/order', isAuthenticatedUser , newOrder);

router.route('/order/:id')
        .get(isAuthenticatedUser, find)

router.get('/orders/me',isAuthenticatedUser, findMyOrders)

module.exports = router