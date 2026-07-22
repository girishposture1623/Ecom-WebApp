import cloudinary from "../config/cloudinary.js";
import Product from "../models/product.model.js";
import multer from "multer";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        
        return res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const getProductsById = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        if (products) {
            return res.json(products)
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        let imageUrl = "";

        if (req.file) {

            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image",
            });


            imageUrl = result.secure_url;
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
        });

        const savedProduct = await product.save();

        return res.status(201).json(savedProduct);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            product.imageUrl = result.secure_url;
        }

        const updatedProduct = await product.save();

        return res.status(200).json(updatedProduct);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            await product.deleteOne()
            res.json({ message: 'Product removed' })
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}
export { getProducts, getProductsById, createProduct, updateProduct, deleteProduct }