const Cart = require('../models/Cart');
const Product = require('../models/Product');

module.exports.getCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.product');
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.addToCart = async (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
    
    try {
        let cart = await Cart.findOne({ userId });
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
            cart.bill += product.price * quantity;
        } else {
            cart = new Cart({
                userId,
                items: [{ product: productId, quantity }],
                bill: product.price * quantity
            });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.updateCart = async (req, res) => {
    const userId = req.params.userId;
    const { items } = req.body;  // Expecting items to be an array of { productId, quantity }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        let bill = 0;
        cart.items = items.map(item => {
            const product = Product.findById(item.product);
            if (product) {
                bill += product.price * item.quantity;
                return { product: item.product, quantity: item.quantity };
            }
        });

        cart.bill = bill;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// module.exports.decreaseCart = async (req, res) => {
//     const { userId } = req.params;
//     const { productId } = req.body;
  
//     try {
//       const cart = await Cart.findOne({ userId });
//       const item = cart.items.find(item => item.product.equals(productId));
  
//       if (item.quantity > 1) {
//         item.quantity--;
//         await cart.save();
//         res.json({ items: cart.items, bill: cart.bill });
//       } else {
//         res.status(400).json({ message: "Quantity cannot be less than 1" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   module.exports.increaseCart = async (req, res) => {
//     const { userId } = req.params;
//     const { productId } = req.body;
//     console.log('increaseCart');
  
//     try {
//       const cart = await Cart.findOne({ userId });
//       const item = cart.items.find(item => item.product.equals(productId));
  
//       if (item) {
//         item.quantity++;
//         await cart.save();
//         res.json({ items: cart.items, bill: cart.bill });
//       } else {
//         res.status(400).json({ message: "Item not found in cart" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
module.exports.decreaseCart = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;
  
    try {
      const cart = await Cart.findOne({ userId });
      const item = cart.items.find(item => item.product.equals(productId));
  
      if (item.quantity > 1) {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
  
        item.quantity--;
        cart.bill -= product.price;
        await cart.save();
        res.json({ items: cart.items, bill: cart.bill });
      } else {
        res.status(400).json({ message: "Quantity cannot be less than 1" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  module.exports.increaseCart = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;
    console.log('increaseCart');
  
    try {
      const cart = await Cart.findOne({ userId });
      const item = cart.items.find(item => item.product.equals(productId));
  
      if (item) {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
  
        item.quantity++;
        cart.bill += product.price;
        await cart.save();
        res.json({ items: cart.items, bill: cart.bill });
      } else {
        res.status(400).json({ message: "Item not found in cart" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
module.exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
        if (itemIndex > -1) {
            const product = await Product.findById(productId);
            if (product) {
                cart.bill -= product.price * cart.items[itemIndex].quantity;
                cart.items.splice(itemIndex, 1);
                await cart.save();
                res.status(200).json(cart);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.clearCart = async (req, res) => {
    const { userId } = req.params;

    try {
      // Find the cart by user ID
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Clear the cart items and reset the bill
      cart.items = [];
      cart.bill = 0;
      await cart.save();
  
      res.json({ items: cart.items, bill: cart.bill });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

