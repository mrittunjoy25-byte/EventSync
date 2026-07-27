const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    await transporter.verify();
    console.log("✅ SMTP connection successful");

    const info = await transporter.sendMail({
      from: '"EventSync" <mrittunjoysaha25@gmail.com>',
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.response);

    return info;
  } catch (err) {
    console.error("❌ Email Error:");
    console.error(err);
  }
};

module.exports = sendEmail;