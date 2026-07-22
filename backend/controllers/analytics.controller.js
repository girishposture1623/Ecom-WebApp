import Order from "../models/Order.model.js"
import Product from "../models/product.model.js"
import User from "../models/User.js"


const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' })
        const totalOrders = await Order.countDocuments({})
        const totalProduct = await Product.countDocuments({})

        const orders = await Order.find({})

        const totalRevenueData = orders.reduce((acc, order) => acc + order.totalAmount, 0)

        res.json({
            totalUsers,
            totalOrders,
            totalProduct,
            totalRevenue: totalRevenueData
        })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error })
    }
}

export default getAdminStats