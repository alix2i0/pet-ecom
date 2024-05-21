const Productmd = require("../models/Product.js");
const Category = require("../models/category.js");
const petCategory = require("../models/PetCategory.js")
const Order = require("../models/Order.js");
// Fetch all products (accessible to both admin and normal user)
// exports.getAllProducts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
//     const search = req.query.search || "";
//     const filters = JSON.parse(req.query.filters || "{}");
//     const query = search ? { name: new RegExp(search, "i") } : {};
//     const sort = req.query.sort || "popular";

//     // Add filters to query
//     for (let key in filters) {
//       if (filters[key].length) {
//         query[key] = { $in: filters[key] };
//       }
//     }

//     let sortOptions = {};
//     switch (sort) {
//       case "priceLowHigh":
//         sortOptions.price = 1;
//         break;
//       case "priceHighLow":
//         sortOptions.price = -1;
//         break;
//       case "newest":
//         sortOptions.createdAt = -1;
//         break;
//       // Add more sorting options if needed
//     }

//     const products = await Productmd.find(query)
//       .populate("category", "name")
//       .populate("petCategory", "name")
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit);

//     const total = await Productmd.countDocuments(query);

//     res.json({
//       success: true,
//       data: products,
//       page,
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// exports.getAllProducts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
//     const search = req.query.search || "";
//     const filters = JSON.parse(req.query.filters || "{}");
//     const petCategory = req.query.petCategory || ""; // Extract petCategory from query params

//     const query = search ? { name: new RegExp(search, "i") } : {};

//     // Add filters to query
//     for (let key in filters) {
//       if (filters[key].length) {
//         query[key] = { $in: filters[key] };
//       }
//     }

//     // Add petCategory to query if provided
//     if (petCategory) {
//       query.petCategory = petCategory;
//     }

//     let sortOptions = {};
//     switch (req.query.sort) {
//       case "priceLowHigh":
//         sortOptions.price = 1;
//         break;
//       case "priceHighLow":
//         sortOptions.price = -1;
//         break;
//       case "newest":
//         sortOptions.createdAt = -1;
//         break;
//       default:
//         sortOptions.popular = -1; // default sorting option
//     }

//     console.log("Query:", query); // Log the query for debugging
//     console.log("Sort Options:", sortOptions); // Log sort options
//     console.log("Pagination:", { skip, limit }); // Log pagination details

//     const products = await Productmd.find(query)
//       .populate("category", "name")
//       .populate("petCategory", "name")
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit);

//     const total = await Productmd.countDocuments(query);

//     res.json({
//       success: true,
//       data: products,
//       page,
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error); // Log the error for debugging
//     res.status(500).json({ message: error.message });
//   }
// };
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const filters = JSON.parse(req.query.filters || "{}");
    // const query = search ? { name: new RegExp(search, "i") } : {};
    const sort = req.query.sort || "popular";

    const query = {};
    // Handle search query
    if (search) {
      query.name = new RegExp(search, "i");
    }
    // Handle filters
    if (filters.category && filters.category !== "all") {
      const category = await Category.findOne({
        name: new RegExp(filters.category, "i"),
      });
      if (category) {
        query.category = category._id;
      }
    }

    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) {
        query.price.$gte = parseFloat(filters.minPrice);
      }
      if (filters.maxPrice) {
        query.price.$lte = parseFloat(filters.maxPrice);
      }
    }

    // Handle any other filters
    for (let key in filters) {
      if (
        key !== "category" &&
        key !== "minPrice" &&
        key !== "maxPrice" &&
        filters[key].length
      ) {
        query[key] = { $in: filters[key] };
      }
    }

    let sortOptions = {};
    switch (sort) {
      case "priceLowHigh":
        sortOptions.price = 1;
        break;
      case "priceHighLow":
        sortOptions.price = -1;
        break;
      case "newest":
        sortOptions.createdAt = -1;
        break;
      // Add more sorting options if needed
    }

    const products = await Productmd.find(query)
      .populate("category", "name")
      .populate("petCategory", "name")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Productmd.countDocuments(query);

    res.json({
      success: true,
      data: products,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProductsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const petCategory = req.query.petCategory || ""; // Extract petCategory from query params

    let query = {};

    // If petCategory is provided, filter by it
    if (petCategory) {
      query.petCategory = petCategory;
    } else {
      // Otherwise, handle other filters and search
      const search = req.query.search || "";
      const filters = JSON.parse(req.query.filters || "{}");

      if (search) {
        query.name = new RegExp(search, "i");
      }

      // Add filters to query
      for (let key in filters) {
        if (filters[key].length) {
          query[key] = { $in: filters[key] };
        }
      }
    }

    let sortOptions = {};
    switch (req.query.sort) {
      case "priceLowHigh":
        sortOptions.price = 1;
        break;
      case "priceHighLow":
        sortOptions.price = -1;
        break;
      case "newest":
        sortOptions.createdAt = -1;
        break;
      default:
        sortOptions.popular = -1; // default sorting option
    }

    const products = await Productmd.find(query)
      .populate("category", "name")
      .populate("petCategory", "name")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Productmd.countDocuments(query);

    res.json({
      success: true,
      data: products,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error for debugging
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
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Fetch a specific product by ID (accessible to both admin and normal user)
exports.getProductById = async (req, res) => {
  // try {
  //   const product = await Productmd.findById(req.params.id);
  //   if (!product) {
  //     return res.status(404).json({ message: 'Product not found' });
  //   }
  //   let categoryObj = await Category.findOne(product.category);

  //   product.category = categoryObj.name;

  //   res.json(product);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  try {
    const product = await Productmd.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product (accessible only to admin)
exports.createProduct = async (req, res) => {
  const { name, description, price, category, quantity, image } = req.body;

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
      quantity,
      image,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing product by ID (accessible only to admin)
exports.updateProductById = async (req, res) => {
  try {
    const product = await Productmd.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID (accessible only to admin)
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Productmd.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    let query = {};
    const { search, sortBy, sortOrder } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sortOptions = {};
    if (sortBy === "name" || sortBy === "description") {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const categories = await Category.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalCategoriesCount = await Category.countDocuments(query);
    const totalPages = Math.ceil(totalCategoriesCount / limit);

    res.json({
      categories,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategories = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    let cat = await Category.findOne({ name });
    if (cat) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, description });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete a category by its `id` value
exports.deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted", id: category._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMostPopularProduct = async (req, res) => {
  try {
    const popularProduct = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalQuantitySold: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 5 }

    ]);
    if (popularProduct.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    const mostPopularProduct = await Productmd.findById(popularProduct[0]._id);

    res.status(200).json(mostPopularProduct);
  } catch (error) {
    console.error("Error retrieving most popular product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Count Product
exports.countProduct = async (req, res) => {
  try {
    const count = await Productmd.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsPerCategory = async (req, res) => {
  try {
    const productsPerCategory = await Productmd.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $group: {
          _id: "$category._id",
          totalProducts: { $sum: 1 },
          name: { $first: "$category.name" },
        },
      },
    ]);
    res.json(productsPerCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Gatt all details about categorie and all product in this category
exports.getCategoryDetailsById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const products = await Productmd.find({ category: category._id });

    console.log(category);
    res.json({ category, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
