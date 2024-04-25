const express = require('express');
const router = express.Router();
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes.js');
const authRoutes = require('./authRoutes.js')
const userRoutes = require('./userRoutes.js')

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
