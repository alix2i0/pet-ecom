const express = require("express");
const app = express();
require('./config/database');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport'); 


// Importez la configuration Passport
require('./config/passport');

// Utilisez Passport middleware
app.use(express.json());

// Middleware Session

app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes)




app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

module.exports = app;
