const express = require('express');
const router = express.Router();
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes.js');
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
