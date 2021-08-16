const express = require('express');
const router = express.Router();

const { store, get, find, update, remove } = require('../../controllers/productController')

// router.post('/',store)
router.get('/products',get)
router.post('/product',store);

router.route('/product/:id')
        .get(find)
        .put(update)
        .delete(remove)

module.exports = router