const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json()); // To parse JSON bodies

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    auth: {
      user: "sourabhsahu339@gmail.com", // Replace with your email
      pass: "osdj iasc cetr ocoe",  // Replace with your email password
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com", // Replace with your email
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

app.post('/send-email', async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    await sendEmail({ email, subject, message });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
