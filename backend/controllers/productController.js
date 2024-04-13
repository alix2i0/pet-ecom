const Productmd = require('../models/Product.js');
const Category = require('../models/category.js');
// Fetch all products (accessible to both admin and normal user)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Productmd.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
    try {
      const { query } = req.query;
      
      // Perform case-insensitive search on product name and description
      const products = await Productmd.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Fetch a specific product by ID (accessible to both admin and normal user)
exports.getProductById = async (req, res) => {
  try {
    const product = await Productmd.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product (accessible only to admin)
exports.createProduct = async (req, res) => {
    // Check if the user is an admin
    // hadi commentitha bach ndir test rah khdma ghir khas roles
    // if (!req.user || req.user.role !== 'admin') {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }
  
    const { name, description, price, category, quantity } = req.body;
  
    try {
      // Check if the category exists
      let categoryObj = await Category.findOne({ name: category });
  
      // If category doesn't exist, create it
      if (!categoryObj) {
        categoryObj = await Category.create({ name: category });
      }
  
      // Create the product
      const product = new Productmd({
        name,
        description,
        price,
        category: categoryObj._id, // Assign category object ID
        quantity
      });
  
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Update an existing product by ID (accessible only to admin)
exports.updateProductById = async (req, res) => {
  // Check if the user is an admin
//   if (!req.user || req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Unauthorized' });
//   }

  try {
    const product = await Productmd.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID (accessible only to admin)
exports.deleteProductById = async (req, res) => {
  // Check if the user is an admin
//   if (!req.user || req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Unauthorized' });
//   }

  try {
    const product = await Productmd.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};