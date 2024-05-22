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
