import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        qty: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true, min: 1 },
    address: {
        fullName: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentId: { type: String },
    status: {
        type: String,
        enum: [
            "Pending",
            "Processing",
            "Shipped",
            "Out For Delivery",
            "Delivered",
            "Cancelled",
        ],
        default: "Pending",
    },
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema)

export default Order
