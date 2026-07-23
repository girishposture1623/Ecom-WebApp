import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Loaded" : "Missing"
);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 2525,
  secure: false,
  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    console.log("📧 Sending Email...");

    // Verify SMTP Connection
    await transporter.verify();
    console.log("✅ SMTP READY");

    const mailOptions = {
      from: `"Shoplix" <girishposture253@gmail.com>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ EMAIL ERROR");
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Message:", error.message);
    console.error(error);

    throw error;
  }
};

export default sendEmail;