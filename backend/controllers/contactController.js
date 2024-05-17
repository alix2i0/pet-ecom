const { sendEmail } = require('../models/contactModel');
const { validationResult } = require('express-validator');

exports.sendEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await sendEmail(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
