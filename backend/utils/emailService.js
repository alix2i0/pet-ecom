const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.EMAIL_TOKEN;
const ENDPOINT = process.env.EMAIL_HOST;

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sendEmail = async (toEmail, subject, text) => {
  const sender = {
    email: process.env.SMTP_FROM_EMAIL,
    name: process.env.SMTP_FROM_NAME,
  };

  const recipients = [
    {
      email: toEmail, 
    },
  ];

  try {
    const response = await client.send({
        from: sender,
        to: recipients,
        subject: subject,
        text: text,
        category: "Integration Test",
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
