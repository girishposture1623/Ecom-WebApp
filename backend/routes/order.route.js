import e from "express";
import protect from "../middelware/authMiddelware.js";
import admin from "../middelware/admimMiddelware.js";
import { downloadInvoice } from "../controllers/order.controller.js";
import { createOrder, getOrders, myOrders, updateOrderStatus } from "../controllers/order.controller.js";

const orderRouter = e.Router()

orderRouter.route('/').post(protect, createOrder).get(protect, admin , getOrders)
orderRouter.route('/myOrders').get(protect,myOrders)
orderRouter.route('/:id/status').put(protect, admin, updateOrderStatus)
orderRouter.route("/:id/invoice").get( protect, downloadInvoice);

export default orderRouter