const express = require ("express");
const app = express();
const db = require('./config/database');
app.use(express.json());


const cmdRoutes = require ('./routes/orderRoutes');
// const { errorHandler } = require('./middleware/errorMiddleware');

// // middleware
// app.use(express.json());

// // Routes
app.use('/api/orders', cmdRoutes);

// // Error handling middleware
// app.use(errorHandler);

module.exports = app;