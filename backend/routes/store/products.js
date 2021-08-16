const express = require('express');
const router = express.Router();

const { store, get, find, update } = require('../../controllers/productController')

// router.post('/',store)
router.get('/products',get)
router.post('/product',store);

router.route('/product/:id')
        .get(find)
        .put(update)

module.exports = router