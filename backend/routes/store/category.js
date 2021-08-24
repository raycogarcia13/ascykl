const express = require('express');
const router = express.Router();

const { storeCategory, storeSubCategory, getCategories, getSubCategories, getSubCategory } = require('../../controllers/categoryController')

const { isAuthenticatedUser, authorizeRole } = require("../../middlewares/auth")


// categories
router.get('/categories',getCategories)
router.post('/category', isAuthenticatedUser, authorizeRole('Admin'), storeCategory);

// subcategories
router.get('/subcategories',getSubCategories)
router.get('/subcategory/:id',getSubCategory)
router.post('/subcategory', isAuthenticatedUser, authorizeRole('Admin') , storeSubCategory);


module.exports = router