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
} else if (sortBy === 'totalAmountAsc') {
  ordersQuery = ordersQuery.sort({ totalAmount: 1 }); // Sorting by totalAmount in ascending order
} else if (sortBy === 'totalAmountDesc') {
  ordersQuery = ordersQuery.sort({ totalAmount: -1 }); // Sorting by totalAmount in descending order
} else if (sortBy === 'customerAsc') {
  ordersQuery = ordersQuery.sort({ 'customer.username': 1 }); // Sorting by customer username in ascending order
} else if (sortBy === 'customerDesc') {
  ordersQuery = ordersQuery.sort({ 'customer.username': -1 }); // Sorting by customer username in descending order
}


    let orders = await ordersQuery.exec();

    const totalOrdersCount = await Order.countDocuments(query); // Count total number of orders matching the query criteria
    const orderCount = await Order.countDocuments();
    // Calculating total pages
    const totalPages = Math.ceil(totalOrdersCount / limit);

    res.json({
      orders,
      currentPage: page,
      totalPages,
      orderCount
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getRecentOrders = async (req, res) => {
  try {
   
    const recentOrders = await Order.find()
      .sort({ orderDate: -1 }) 
      .limit(6)
      .populate('customer')
    
    res.status(200).json(recentOrders);
  } catch (error) {
    console.log("erroroororor");
    console.error('Error retrieving recent orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


exports.getOrdersByMonth = async (req, res) => {
  try {
      // Fetch all orders from the database
      const orders = await Order.find();
      // Analyze the orders by month
      const analysisResult = analysData(dataMonth, orders);
      res.json(analysisResult);
  } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer', 'username').populate({
      path: 'products.product',
      select: 'name price',
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Add new order
// exports.postOrder = async (req, res) => {
//   try {
//     // Check if req.body exists and contains orderId
//     if (!req.body ) {
//       return res
//         .status(400)
//         .json({ message: "orderId is required in request body" });
//     }

//     // Destructure properties from req.body
//     const { customer, products } = req.body;

//     // Calculate total amount based on products and their quantities
//     let totalAmount = 0;
//     const orderedProducts = []; // Array to hold structured product objects
//     for (const product of products) {
//       const { productId, quantity } = product;
//       // Retrieve the product from the database to get its price
//       const productDoc = await Product.findById(productId);
//       if (!productDoc) {
//         return res.status(404).json({ message: `Product with ID ${productId} not found` });
//       }
//       // Add the price of the product multiplied by its quantity to the total amount
//       totalAmount += productDoc.price * quantity;
//       // Push structured product object into orderedProducts array
//       orderedProducts.push({ product: productId, quantity });
//     }

//     // Create a new Order instance
//     const orderId = "ORD" + Date.now().toString(); // Generating orderId
//     const orderDate = new Date(); // Creating order date
//     const newOrder = new Order({
//       orderId,
//       customer,
//       products: orderedProducts,
//       totalAmount,
//       orderDate
//     });



//     // Create a Stripe session for payment
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "mad",
//             product_data: {
//               name: "Commande",
//             },
//             unit_amount: totalAmount * 100, // Convert total amount to cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${req.protocol}://${req.get(
//         "host"
//       )}/api/orders/success/${orderId}`,
//       cancel_url: `${req.protocol}://${req.get(
//         "host"
//       )}/api/orders/reject/${orderId}`,
//     });

//     // Save the order to the database
//     const savedOrder = await newOrder.save();
//     res.status(201).json({ url: session.url }); // Return the URL for Stripe checkout
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Endpoint pour le succès de la commande
// exports.orderSuccess = async (req, res) => {
//   try {
//     console.log("checking")
//     const orderId = req.params.orderId;
//     console.log(orderId);
//     // Mettez à jour le statut de la commande comme "Completed"
//     await Order.findOneAndUpdate({ orderId }, { status: 'Completed' });
//     // res.redirect('/success-page'); // Redirigez l'utilisateur vers une page de succès
//     res.send('Payment was successful!')
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Endpoint pour le rejet de la commande
// exports.orderReject = async (req, res) => {
//   try {
//     const orderId = req.params.orderId;
//     // Mettez à jour le statut de la commande comme "Rejected"
//     await Order.findOneAndUpdate({ orderId }, { status: 'Rejected' });
//     res.send('Rejected');
//     // res.redirect('/cancel-page'); // Redirigez l'utilisateur vers une page d'annulation
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.postOrder = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const { customer, products, totalAmount } = req.body;
    if (!customer || !products || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the products array and totalAmount are valid
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }

    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res.status(400).json({ message: "Total amount is required and must be a positive number" });
    }

    const orderedProducts = [];

    for (const product of products) {
      const { productId, quantity } = product;
      const productDoc = await Product.findById(productId);
      if (!productDoc) {
        return res.status(404).json({ message: `Product with ID ${productId} not found` });
      }
      orderedProducts.push({ product: productId, quantity });
    }

    const orderId = "ORD" + Date.now().toString();
    const orderDate = new Date();

    const newOrder = new Order({
      orderId,
      customer,
      products: orderedProducts,
      totalAmount,
      orderDate
    });

    const savedOrder = await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Order",
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/api/orders/success/${orderId}`,
      cancel_url: `${req.protocol}://${req.get("host")}/api/orders/reject/${orderId}`,
    });

    res.status(201).json({ url: session.url });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.postOrder = async (req, res) => {
//   // console.log('post order get in');
//   try {
//     if (!req.body) {
//       return res.status(400).json({ message: "Request body is required" });
//     }

//     const { customer, products, totalAmount } = req.body;
//     if (!customer || !products || !totalAmount) {
//       return res.status(400).json({ error: 'Missing required fields' });
//   }
//     // Check if the products array and totalAmount are valid
//     if (!Array.isArray(products) || products.length === 0) {
//       return res.status(400).json({ message: "Products array is required" });
//     }

//     if (typeof totalAmount !== 'number' || totalAmount <= 0) {
//       return res.status(400).json({ message: "Total amount is required and must be a positive number" });
//     }

//     const orderedProducts = [];

//     for (const product of products) {
//       const { productId, quantity } = product;
//       const productDoc = await Product.findById(productId);
//       if (!productDoc) {
//         return res.status(404).json({ message: `Product with ID ${productId} not found` });
//       }
//       orderedProducts.push({ product: productId, quantity });
//     }

//     const orderId = "ORD" + Date.now().toString();
//     const orderDate = new Date();

//     const newOrder = new Order({
//       orderId,
//       customer,
//       products: orderedProducts,
//       totalAmount,
//       orderDate
//     });

//     const savedOrder = await newOrder.save();

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Order",
//             },
//             unit_amount: totalAmount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${req.protocol}://${req.get("host")}/api/orders/success/${orderId}`,
//       cancel_url: `${req.protocol}://${req.get("host")}/api/orders/reject/${orderId}`,
//     });

//     res.status(201).json({ url: session.url });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.orderSuccess = async (req, res) => {
//   try {
//     const orderId = req.params.orderId;
//     await Order.findOneAndUpdate({ orderId }, { status: 'Completed' });
//     res.send('Payment was successful!');
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.orderSuccess = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOneAndUpdate({ orderId }, { status: 'Completed' });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Decrease the stock quantity for each product in the order
    for (const orderedProduct of order.products) {
      const productDoc = await Product.findById(orderedProduct.product);
      if (productDoc) {
        productDoc.stock -= orderedProduct.quantity;
        if (productDoc.stock < 0) {
          productDoc.stock = 0; // Ensuring stock doesn't go negative
        }
        await productDoc.save();
      }
    }

    res.send('Payment was successful and stock updated!');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.orderReject = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await Order.findOneAndUpdate({ orderId }, { status: 'Rejected' });
    res.send('Payment was rejected');
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
//Get total amount of all orders in USD
exports.getTotalAmount = async (req, res) => {
  try {
    const totalAmount = await Order.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } },
    ]);
    res.json(totalAmount[0].totalAmount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.countOrder = async(req,res)=>{

  const count = await Order.countDocuments();
  res.json(count);
}




const analysData = (dataMonth, orders) => {
  const result = [];
  for (let i = 0; i < dataMonth.length; i++) {
      let accumulator = 0;
      for (let j = 0; j < orders.length; j++) {
          let orderDate = new Date(orders[j].orderDate);
          if (orderDate.getMonth() === dataMonth[i].value) {
              accumulator++;
          }
      }
      let data = {
          ...dataMonth[i],
          Orders_In_Month : accumulator
      };
      result.push(data);
  }
  return result;
};

const dataMonth = [
  { name: "January", value: 0 },
  { name: "February", value: 1 },
  { name: "March", value: 2 },
  { name: "April", value: 3 },
  { name: "May", value: 4 },
  { name: "June", value: 5 },
  { name: "July", value: 6 },
  { name: "August", value: 7 },
  { name: "September", value: 8 },
  { name: "October", value: 9 },
  { name: "November", value: 10 },
  { name: "December", value: 11 }
];