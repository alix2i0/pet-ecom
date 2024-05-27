const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.put('/:userId/decrease', cartController.decreaseCart);
router.put('/:userId/increase', cartController.increaseCart);
router.delete('/:userId/:productId', cartController.removeFromCart);
router.get('/:userId', cartController.getCart);
router.post('/:userId', cartController.addToCart);
router.put('/:userId', cartController.updateCart);
router.delete('/:userId', cartController.clearCart);

module.exports = router;
