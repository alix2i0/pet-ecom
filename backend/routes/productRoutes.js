const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// router.get('/:id', productController.getProductById);
// router.post('/:', productController.postProduct);

// const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

// router.get('/',(req,res) => {
//     res.send('rah tahwa khdam')
// })
// Fetch all products (available for all users)
router.get('/search', productController.searchProducts);

//7ta ikml luser crud then this will work fine
// Protected routes requiring admin access
// router.use(authenticateUser); // Apply authentication middleware for all routes below
// router.use(authorizeAdmin);   // Apply authorization middleware for admin-only routes

// Admin-only routes for full CRUD operations
// tested
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
//not yet tested
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

module.exports = router;
