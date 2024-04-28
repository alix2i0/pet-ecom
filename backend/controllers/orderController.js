const Order = require("../models/Order");
const { STRIPE_KEY } = require('../config/env');
const stripe = require("stripe")(STRIPE_KEY);
const Product = require("../models/Product")
const User = require("../models/User");
// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
  try {
    let query = {};

    // Check if status and customer query parameters exist
    const { status, customer, search } = req.query;
    if (status) {
      query.status = status;
    }
    if (customer) {
      query.customer = customer; // customer is the customer ID
    }

    if (search) {
      const searchRegex = new RegExp(search, "i"); // Partial match search
      // Find users whose usernames contain the search term
      const users = await User.find({ username: searchRegex });
      const userIds = users.map(user => user._id);
      query.customer = { $in: userIds }; // Assign the user IDs to the query
    }

    const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1
    const limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10
    const skip = (page - 1) * limit; // Calculating the number of documents to skip

    let ordersQuery = Order.find(query).populate({
      path: 'customer',
      select: 'username', // Select only the username field
    }).populate({
      path: 'products.product', // Populate the products field with product details
      select: 'name', // Select only the name field of the product
    }).skip(skip).limit(limit);

    // Check if sorting query parameter exists
    const { sortBy } = req.query;
    if (sortBy === 'dateAsc') {
      ordersQuery = ordersQuery.sort({ orderDate: 1 }); // Sorting by orderDate in ascending order
    } else if (sortBy === 'dateDesc') {
      ordersQuery = ordersQuery.sort({ orderDate: -1 }); // Sorting by orderDate in descending order
    }

    let orders = await ordersQuery.exec();

    const totalOrdersCount = await Order.countDocuments(query); // Count total number of orders matching the query criteria

    // Calculating total pages
    const totalPages = Math.ceil(totalOrdersCount / limit);

    res.json({
      orders,
      currentPage: page,
      totalPages,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get a commande by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Add new order
exports.postOrder = async (req, res) => {
  try {
    // Check if req.body exists and contains orderId
    if (!req.body ) {
      return res
        .status(400)
        .json({ message: "orderId is required in request body" });
    }

    // Destructure properties from req.body
    const { customer, products } = req.body;

    // Calculate total amount based on products and their quantities
    let totalAmount = 0;
    const orderedProducts = []; // Array to hold structured product objects
    for (const product of products) {
      const { productId, quantity } = product;
      // Retrieve the product from the database to get its price
      const productDoc = await Product.findById(productId);
      if (!productDoc) {
        return res.status(404).json({ message: `Product with ID ${productId} not found` });
      }
      // Add the price of the product multiplied by its quantity to the total amount
      totalAmount += productDoc.price * quantity;
      // Push structured product object into orderedProducts array
      orderedProducts.push({ product: productId, quantity });
    }

    // Create a new Order instance
    const orderId = "ORD" + Date.now().toString(); // Generating orderId
    const orderDate = new Date(); // Creating order date
    const newOrder = new Order({
      orderId,
      customer,
      products: orderedProducts,
      totalAmount,
      orderDate
    });



    // Create a Stripe session for payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mad",
            product_data: {
              name: "Commande",
            },
            unit_amount: totalAmount * 100, // Convert total amount to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.protocol}://${req.get(
        "host"
      )}/api/orders/success/${orderId}`,
      cancel_url: `${req.protocol}://${req.get(
        "host"
      )}/api/orders/reject/${orderId}`,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    res.status(201).json({ url: session.url }); // Return the URL for Stripe checkout
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Endpoint pour le succès de la commande
exports.orderSuccess = async (req, res) => {
  try {
    console.log("checking")
    const orderId = req.params.orderId;
    console.log(orderId);
    // Mettez à jour le statut de la commande comme "Completed"
    await Order.findOneAndUpdate({ orderId }, { status: 'Completed' });
    // res.redirect('/success-page'); // Redirigez l'utilisateur vers une page de succès
    res.send('Payment was successful!')
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Endpoint pour le rejet de la commande
exports.orderReject = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    // Mettez à jour le statut de la commande comme "Rejected"
    await Order.findOneAndUpdate({ orderId }, { status: 'Rejected' });
    res.send('Rejected');
    // res.redirect('/cancel-page'); // Redirigez l'utilisateur vers une page d'annulation
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Update order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params; // Get order ID from URL params
    const { orderId, customer, products, totalAmount, status, orderDate } =
      req.body; // Get updated order data from request body

    // Find the order by ID and update its fields
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderId,
        customer,
        products,
        totalAmount,
        status,
        orderDate,
      },
      { new: true }
    ); // Set { new: true } to return the updated document

    // If the order does not exist, return an error response
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the updated order as the response
    res.json(updatedOrder);
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: err.message });
  }
};

//Delete order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params; // Get order ID from URL params

    // Find the order by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(id);

    // If the order does not exist, return an error response
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return a success message as the response
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: err.message });
  }
};
