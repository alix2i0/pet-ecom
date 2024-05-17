const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmail = async (data) => {
  const { name, email, subject, message } = data;

  const mailOptions = {
    from: {
      name: 'Pet Store Customer',
      address: process.env.USER,
    },
    to: 'ismailkou674@gmail.com',
    subject: subject,
    text: `From: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, message: 'Email sent successfully.' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email.');
  }
};

module.exports = { sendEmail };
