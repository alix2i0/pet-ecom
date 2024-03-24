const express = require ("express");
const app = express();
const db = require('./config/database');


// const apiRoutes = require ('./routes/api');
// const { errorHandler } = require('./middleware/errorMiddleware');

// // middleware
// app.use(express.json());

// // Routes
// app.use('/api', apiRoutes);

// // Error handling middleware
// app.use(errorHandler);

module.exports = app;