const express = require('express');
const { body } = require('express-validator');
const { sendEmail } = require('../controllers/contactController');

const router = express.Router();

router.post(
  '/send-email',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  sendEmail
);

module.exports = router;
