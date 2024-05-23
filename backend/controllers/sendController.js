const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
// resend.emails.send({
//   from: "onboarding@resend.dev",
//   to: "monsifelouarat@gmail.com",
//   subject: "Hello World",
//   html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
// });
resend.domains.create({ name: "monseeef.github.io/home" });

exports.sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;
  console.log(email, subject, message);
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      react: `
        <>
          <h1>${subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>${message}</p>
        </>`,
    });
    return res.json(data);
  } catch (error) {
    return res.json({ error });
  }
};
