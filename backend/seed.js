import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config();

import dns from "dns"


dns.setServers(["1.1.1.1", "8.8.8.8"])
import User from './models/User.js'
import Product from './models/product.model.js'

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Shoplix-mern")
 
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }); 
  

// ====================
// Dummy Users Data
// ====================

const dummyUsers = [
  {
    name: "Admin User",
    email: "admin@shoplix.com",
    password: "Admin@123",
    role: "admin",
    verified: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "User@123",
    role: "user",
    verified: true,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "User@123",
    role: "user",
    verified: true,
  },
];

// ====================
// Dummy Products
// ====================

const dummyProducts = [
  {
    name: "Premium Wireless Headphones",
    description:
      "High-quality noise-cancelling wireless headphones with 30-hour battery life.",
    price: 199.99,
    category: "Electronics",
    stock: 50,
    imageUrl:
      "https://via.placeholder.com/400x400?text=Wireless+Headphones",
    rating: 4.5,
    numReviews: 120,
  },
  {
    name: "Smartphone Case",
    description:
      "Durable and stylish smartphone protective case made from premium materials.",
    price: 24.99,
    category: "Accessories",
    stock: 150,
    imageUrl: "https://via.placeholder.com/400x400?text=Phone+Case",
    rating: 4.3,
    numReviews: 80,
  },
  {
    name: "Gaming Mouse",
    description:
      "RGB gaming mouse with programmable buttons and adjustable DPI.",
    price: 59.99,
    category: "Electronics",
    stock: 70,
    imageUrl: "https://via.placeholder.com/400x400?text=Gaming+Mouse",
    rating: 4.7,
    numReviews: 95,
  },
  {
    name: "Mechanical Keyboard",
    description:
      "Mechanical keyboard with RGB backlight and blue switches.",
    price: 89.99,
    category: "Electronics",
    stock: 40,
    imageUrl: "https://via.placeholder.com/400x400?text=Keyboard",
    rating: 4.8,
    numReviews: 150,
  },
  {
    name: "Sports Water Bottle",
    description:
      "Insulated stanless steel water bottle for gym and travel.",
    price: 19.99,
    category: "Sports",
    stock: 120,
    imageUrl: "https://via.placeholder.com/400x400?text=Water+Bottle",
    rating: 4.4,
    numReviews: 65,
  },
];

// ====================
// Seed Function
// ====================

const seedDatabase = async () => {
  try {
    // Clear existing data
    // await User.deleteMany({});
    // await Product.deleteMany({});

    console.log("Cleared existing data");

    // Hash passwords and insert users
    const usersWithHashedPasswords = await Promise.all(
      dummyUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    const createdUsers = await User.insertMany(usersWithHashedPasswords);

    console.log(`✔ Seeded ${createdUsers.length} users`);

    // Insert products
    const createdProducts = await Product.insertMany(dummyProducts);

    console.log(`✔ Seeded ${createdProducts.length} products`);

    console.log("\n✅ Database seeded successfully!");

    console.log("\nLogin Credentials:");
    console.log("Admin: admin@shoplix.com / Admin@123");
    console.log("User: john@example.com / User@123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run Seeder
seedDatabase();