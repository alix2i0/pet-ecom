const express = require("express");
const app = express();
const db = require('./config/database');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport'); // Importez Passport

// Importez la configuration Passport
require('./config/passport');

// Utilisez Passport middleware
app.use(passport.initialize());

// Middleware Session

app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes)

db();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

module.exports = app;
