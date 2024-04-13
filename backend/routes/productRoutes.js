const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const { isAdmin } = require('../middleware/authMiddleware');
// const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

// router.get('/',(req,res) => {
//     res.send('rah tahwa khdam')
// })
// Fetch all products (available for all users)
router.get('/search', productController.searchProducts);

// Admin-only routes for full CRUD operations
// tested
router.get('/',isAdmin, productController.getAllProducts);
router.post('/',isAdmin, productController.createProduct);
//not yet tested
router.get('/:id',isAdmin, productController.getProductById);
router.put('/:id',isAdmin, productController.updateProductById);
router.delete('/:id',isAdmin, productController.deleteProductById);

module.exports = router;