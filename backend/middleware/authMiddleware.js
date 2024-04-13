// authMiddleware.js
const authToken = require('./authToken')
const User = require('../models/User')


exports.isAdmin = async (req, res, next) => {
    try {
        // Use the authToken middleware to extract the user ID from the token
        await authToken(req, res, async () => {
            // Check if the extracted user ID is an admin
            const user = await User.findById(req.userId);
            if (user && user.isAdmin) {
                next();
            } else {
                res.status(403).json({ message: 'Admin permission required' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
