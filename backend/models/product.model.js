import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

   category: {
    type: String,
    enum: [
        // ELECTRONICS - DEVICES
        "Smartphones",
        "Laptops",
        "Tablets",
        "Smartwatches",
        "E-Readers",
        "Televisions",
        "Drones",
        
        // ELECTRONICS - AUDIO & VIDEO
        "Headphones",
        "Audio",
        "Cameras",
        
        // ELECTRONICS - GAMING
        "Gaming",
        
        // ELECTRONICS - COMPUTER COMPONENTS
        "Processors",
        "Graphics Cards",
        "Memory",
        "Storage",
        "Power Supplies",
        "PC Cases",
        "Cooling",
        "Monitors",
        
        // ELECTRONICS - PERIPHERALS & CABLES
        "Peripherals",
        "Accessories",
        "Cables",
        
        // ELECTRONICS - POWER & CHARGING
        "Power Banks",
        "Charging",
        
        // HOME & OFFICE
        "Smart Home",
        "Furniture",
        
        // GENERIC/OTHER CATEGORIES
        "Electronics",
        "Fashion",
        "Home",
        "Beauty",
        "Books",
        "Sports",
        "Toys",
        "Groceries",
        "Other",
        "Health",
        "Jewelry",
        "Tools",
        "Automotive"
    ],
    required: true
},

    stock: {
        type: Number,
        required: true,
        min: 0
    },

    imageUrl: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        default: 0
    },

    numReviews: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;