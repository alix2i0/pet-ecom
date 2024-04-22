const express = require('express');
const router = express.Router();
const orderRoutes = require('./orderRoutes.js');
const productRoutes = require('./productRoutes.js');
const userRoutes = require("./userRoutes.js");
const authRoutes  = require("./authRoutes.js")


router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use("/users", userRoutes)
router.use("/auth",authRoutes)

module.exports = router;
