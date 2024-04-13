const express = require("express"); // Importing the Express framework
const app = express(); // Creating an instance of the Express application
require('./config/database'); // Importing database configuration
const session = require('express-session'); // Importing express-session for session management
const cookieParser = require('cookie-parser'); // Importing cookie-parser for parsing cookies
const userRoutes = require('./routes/userRoutes'); // Importing user routes
const authRoutes = require('./routes/authRoutes'); // Importing authentication routes
const cmdRoutes = require('./routes/orderRoutes'); // Importing order routes


app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cookieParser()); // Middleware for parsing cookies

// Routes for order-related actions
app.use('/api/orders', cmdRoutes);

// Defining routes for authentication and user-related actions
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded bodies

// Another route definition for user-related actions
app.use("/api/users", userRoutes);

module.exports = app; // Exporting the Express application
