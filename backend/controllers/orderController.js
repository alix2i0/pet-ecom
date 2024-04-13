const Order = require("../models/Order");
const { STRIPE_KEY } = require('../config/env');
const stripe = require("stripe")(STRIPE_KEY);

// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
  try {
    let query = {};

    // Check if status query parameter exists
    const { status } = req.query;
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query);
    res.json(orders);
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
    if (!req.body || !req.body.orderId) {
      return res
        .status(400)
        .json({ message: "orderId is required in request body" });
    }
    // Destructure properties from req.body
    const { orderId, customer, products, totalAmount, orderDate, status } =
      req.body;
    // Create a new Commande instance
    const newOrder = new Order({
      orderId,
      customer,
      products,
      totalAmount,
      orderDate,
      status,
    });
    //strip
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mad",
            product_data: {
              name: "Commande",
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.protocol}://${req.get(
        "host"
      )}/api/orders/success`,
      cancel_url: `${req.protocol}://${req.get(
        "host"
      )}/api/orders/cancel`,
    });
    const savedOrder = await newOrder.save();
    // res.status(201).json(savedOrder);
    res.status(201).json({url : session.url});
  } catch (err) {
    res.status(400).json({ message: err.message });
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
