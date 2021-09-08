import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import Product from "../models/productModel.js";


// Express async handler: Simple middleware for handling 
//      exceptions inside of async express routes and passing 
//      them to your express error handlers.

// @desc     Fetch all products
// @routes   Get /api/products
// @access   Public Route
router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}))

// @desc     Fetch single product
// @routes   Get /api/products/:id
// @access   Public Route
router.get("/:id", asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    // check if there's a product
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" })
    }
}))

export default router;