import e from "express";
import protect from "../middelware/authMiddelware.js";
import admin from "../middelware/admimMiddelware.js";
import multer from "multer";
import { createProduct, deleteProduct, getProducts, getProductsById, updateProduct } from "../controllers/product.controller.js";

const upload = multer({ dest: 'uploads/' })

const productRouter = e.Router()

productRouter.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct)

productRouter.route('/:id').get(getProductsById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct)

export default productRouter