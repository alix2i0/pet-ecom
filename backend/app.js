const express = require("express"); // Importing the Express framework
const app = express(); // Creating an instance of the Express application
require('./config/database'); // Importing database configuration
const cookieParser = require('cookie-parser'); // Importing cookie-parser for parsing cookies
const apiRoutes = require('./routes/api');


// Middleware to handle data parsing
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
    optionSuccessStatus: 200,
    methods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
  }))


app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cookieParser()); // Middleware for parsing cookies


// Utilisez Passport middleware
app.use(express.json());

// Defining routes for authentication and user-related actions
app.use('/api', apiRoutes);



app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded bodies



module.exports = app; // Exporting the Express application
