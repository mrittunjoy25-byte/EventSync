const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
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