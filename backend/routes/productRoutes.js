const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const { isAdmin } = require('../middleware/authMiddleware');

// Fetch all products (available for all users)
router.get('/search', productController.searchProducts);

// Admin-only routes for full CRUD operations

router.get('/', productController.getAllProducts);
router.post('/',isAdmin, productController.createProduct);
// router.get('/category/',isAdmin, productController.);
router.get('/category',isAdmin, productController.getAllCategories);
router.get('/:id',isAdmin, productController.getProductById);
router.put('/:id',isAdmin, productController.updateProductById);
router.delete('/:id',isAdmin, productController.deleteProductById);

module.exports = router;