const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishController');

router.get('/wishlist/:userId', wishlistController.getWishlist);
router.post('/wishlist/:userId/:productId', wishlistController.addToWishlist);
router.delete('/wishlist/:userId/:productId', wishlistController.removeFromWishlist);

module.exports = router;
