import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("VERIFY ERROR:", err);
  } else {
    console.log("SMTP READY");
  }
});
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `"Shoplix" <girishposture253@gmail.com>`, // Verified Sender Email
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Error Sending Email:", error);
    throw error;
  }
};


export default sendEmail;