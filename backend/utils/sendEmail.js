import nodemailer from "nodemailer";
import dotenv from "dotenv";

// ⚠️ CRITICAL FIX: Only load .env in development, not on Render
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// 🔍 Diagnostic logging
console.log("=== SMTP CONFIG CHECK ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ UNDEFINED");
console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length || "❌ UNDEFINED");
console.log("========================");

// ✅ CORRECTED TRANSPORTER CONFIG
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 2525,
  secure: false,
  requireTLS: true, // ← ADD THIS (required for Render)
  auth: {
    user: process.env.EMAIL_USER?.trim(), // ← Trim whitespace
    pass: process.env.EMAIL_PASS?.trim(), // ← Trim whitespace
  },
  logger: process.env.NODE_ENV === "development", // ← Debugging
  debug: process.env.NODE_ENV === "development",
});

// ✅ ENHANCED VERIFICATION
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP VERIFY ERROR:", {
      code: err.code,
      message: err.message,
      command: err.command,
      response: err.response,
    });
  } else if (success) {
    console.log("✅ SMTP READY - Connection verified");
  }
});

// ✅ CORRECTED SEND FUNCTION
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // ⚠️ FIX: Use VERIFIED sender email directly, not formatted display name
    // Brevo requires the verified email to be the exact FROM address
    const mailOptions = {
      from: "girishposture253@gmail.com", // ← Use exact verified email
      // If you want a display name, use this format:
      // from: { name: "Shoplix", address: "girishposture253@gmail.com" },
      to,
      subject,
      text,
      html,
    };

    console.log("📧 Sending email from:", mailOptions.from);
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully:", info.messageId);
    return info;

  } catch (error) {
    // ⚠️ ENHANCED ERROR LOGGING - Now shows exact issue
    console.error("❌ Email Send Failed:", {
      code: error.code,
      message: error.message,
      command: error.command,
      response: error.response,
      status: error.statusCode,
      // Full error for debugging
      details: error.toString(),
    });
    throw error;
  }
};

export default sendEmail;