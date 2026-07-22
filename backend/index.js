import express from "express";
import cors from "cors"
import connectDB from "./config/config.js"
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
import productRouter from "./routes/ProductRoute.js";
import orderRouter from "./routes/order.route.js";
import paymentRoute from "./routes/payment.Route.js";
import analyticsRoute from "./routes/analytics.js";
dotenv.config()

connectDB()




const app = express()
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
        credentials: true
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.send("Shoplix backend is working...")
})

app.use('/api/auth', authRoute)
app.use('/api/product', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/payment', paymentRoute)
app.use('/api/analytics', analyticsRoute)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(Path.json(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(Path.resolve(__dirname, '../frontend/build/index.html'))
    })

}else{
    app.get('/',(req, res)=>{
        res.send('Shoplix AIP is running in Development mode...')
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server start at port ${PORT}`)
})
