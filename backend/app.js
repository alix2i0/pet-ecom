const express = require("express"); // Importing the Express framework
const app = express(); // Creating an instance of the Express application
require('./config/database'); // Importing database configuration
const session = require('express-session'); // Importing express-session for session management
const cookieParser = require('cookie-parser'); // Importing cookie-parser for parsing cookies
const userRoutes = require('./routes/userRoutes'); // Importing user routes
const authRoutes = require('./routes/authRoutes'); // Importing authentication routes
const cmdRoutes = require('./routes/orderRoutes'); // Importing order routes
const cors = require('cors');

const orderRoutes = require('./routes/orderRoutes');
const apiRoutes = require('./routes/api');

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cookieParser()); // Middleware for parsing cookies

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// // Routes
app.use('/api', apiRoutes);

app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded bodies

module.exports = app; // Exporting the Express application
