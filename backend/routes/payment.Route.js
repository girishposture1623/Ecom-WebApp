import e from "express";
import { createOrder, verefiyPayment } from "../controllers/payment.Controller.js";

const paymentRoute = e.Router()

paymentRoute.post('/order',createOrder)
paymentRoute.post('/verify', verefiyPayment)

export default  paymentRoute