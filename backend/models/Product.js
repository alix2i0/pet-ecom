// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   description: {
//     type: String
//   },
//   category: String,
//   quantity: {
//     type: Number,
//     default: 0
//   }
// });

// module.exports = mongoose.model('Product', productSchema);
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Reference to the Category model
  },
  quantity: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('Product', productSchema);
