const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

const db = mongoose.connect;
db(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
 
module.exports = db;