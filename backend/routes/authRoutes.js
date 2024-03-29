const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../config/passport');

router.post('/register', userController.register);
router.post('/login', passport.authenticate('local'), userController.login);
router.get('/logout', userController.logout);
router.get('/profile', isAuthenticated, userController.getProfile);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
    return next();
}
    res.status(401).json({ message: 'Unauthorized' });
}

module.exports = router;
