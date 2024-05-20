// const mongoose = require('mongoose');
// const User = require('./User');
// const Product = require('./Product');
// const Order = require('./Order');

// mongoose.connect('mongodb+srv://test:test1234@cluster0.dkjrhmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err.message);
// });

// // Assuming you have the user IDs, product IDs, and category IDs from your MongoDB database
// const users = [
//   "6601426459bf543c09c4ae1e", // John Doe
//   "662a2261a100162d2cf152ee", // alikkkkall
//   "662eaeb5f2bb2d9f5bdea19c"  // Quyn Benjamin
// ];

// const products = [
//   {
//     "_id": "664351f1108a737935331d1b",
//     "name": "Reptile Heat Lamp",
//     "price": 29.99,
//     // other fields...
//   },
//   // Add other products here...
// ];

// const getRandomUser = () => {
//   return users[Math.floor(Math.random() * users.length)];
// };

// const getRandomProducts = () => {
//   const numProducts = Math.floor(Math.random() * 3) + 2; // Randomly choose 2 to 4 products per order
//   const shuffledProducts = products.sort(() => 0.5 - Math.random()); // Shuffle products array
//   return shuffledProducts.slice(0, numProducts);
// };

// const getRandomQuantity = () => {
//   return Math.floor(Math.random() * 3) + 1; // Randomly choose quantity between 1 and 3
// };

// const generateRandomDate = (start, end) => {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// };

// const generateOrders = (numOrders, startDate, endDate) => {
//     const orders = [];
//     for (let i = 0; i < numOrders; i++) {
//       const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5); // Generate a unique identifier
//       const order = {
//         orderId: `ORD-${uniqueId}`, // Append the unique identifier to the orderId
//         customer: getRandomUser(),
//         products: getRandomProducts().map(product => ({
//           product: product._id,
//           quantity: getRandomQuantity(),
//           price: product.price
//         })),
//         totalAmount: 0,
//         status: 'Pending',
//         orderDate: generateRandomDate(startDate, endDate)
//       };
//       order.totalAmount = order.products.reduce((total, product) => {
//         return total + (product.quantity * product.price);
//       }, 0);
//       orders.push(order);
//     }
//     return orders;
//   };
  

// const insertOrders = async () => {
//   const marchOrders = generateOrders(12, new Date('2024-03-01'), new Date('2024-03-31'));
//   const aprilOrders = generateOrders(6, new Date('2024-04-01'), new Date('2024-04-30'));
//   const mayOrders = generateOrders(18, new Date('2024-05-01'), new Date('2024-05-31'));

//   const ordersToInsert = [...marchOrders, ...aprilOrders, ...mayOrders];

//   try {
//     const insertedOrders = await Order.insertMany(ordersToInsert);
//     console.log('Orders inserted successfully:', insertedOrders);
//   } catch (error) {
//     console.error('Error inserting orders:', error.message);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// insertOrders();

const date = "2024-03-08T00:31:48.392Z"
const mounth = new Date(date).getMonth()
console.log(mounth);