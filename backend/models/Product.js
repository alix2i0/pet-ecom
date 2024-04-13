const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  category:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // This refers to the 'Category' model
  },
  quantity: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Product', productSchema);
