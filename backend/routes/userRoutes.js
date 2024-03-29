const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin } = require('../middleware/authMiddleware');

// Create a new user (only accessible to admin)
router.post('/', isAdmin, userController.createUser);

// Get all users (only accessible to admin)
router.get('/', isAdmin, userController.getAllUsers);

// Get a specific user by ID
router.get('/:userId',isAdmin, userController.getUserById);

// Update a user's details (only accessible to admin)
router.put('/:userId', isAdmin, userController.updateUser);

// Delete a user (only accessible to admin)
router.delete('/:userId', isAdmin, userController.deleteUser);

module.exports = router;