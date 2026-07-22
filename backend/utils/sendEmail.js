import nodemailer from "nodemailer";
import  dotenv  from "dotenv";

dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({
  to,
  subject,
  text,
  html,
}) => {
  try {
    const mailOptions = {
      from: `"Shoplix" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    // console.log("✅ Email Sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Error Sending Email:", error);
    throw error;
  }
};

export default sendEmail;