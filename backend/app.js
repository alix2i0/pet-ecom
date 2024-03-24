const express = require ("express");
const app = express();
const apiRoutes = require ('./routes/api');
const { errorHandler } = require('./middleware/errorMiddelware');
const db = require('./config/database');


// middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Error handling middleware
// app.use(errorHandler);

app.get('/',(req,res) => {
    res.send('rah khdam')
})

module.exports = app;