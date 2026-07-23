import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/config.js";
import authRoute from "./routes/authRoute.js";
import productRouter from "./routes/ProductRoute.js";
import orderRouter from "./routes/order.route.js";
import paymentRoute from "./routes/payment.Route.js";
import analyticsRoute from "./routes/analytics.js";

dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
// Connect Database
connectDB();

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/product", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment", paymentRoute);
app.use("/api/analytics", analyticsRoute);

// Health Check
app.get("/api", (req, res) => {
  res.send("Shoplix Backend API is running...");
});

// Serve React App in Production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/build");

  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Shoplix API is running in Development mode...");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});