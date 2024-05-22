const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/cart/:userId', cartController.getCart);
router.post('/cart/:userId', cartController.addToCart);
router.put('/cart/:userId', cartController.updateCart);
router.delete('/cart/:userId/:productId', cartController.removeFromCart);

module.exports = router;
