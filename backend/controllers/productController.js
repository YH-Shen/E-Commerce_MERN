import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// Express async handler: Simple middleware for handling 
//      exceptions inside of async express routes and passing 
//      them to your express error handlers.

// @desc     Fetch all products
// @routes   Get /api/products/
// @access   Public Route
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc     Fetch single product
// @routes   Get /api/products/:id
// @access   Public Route
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    // check if there's a product
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        // generates a new error object with this message
        // and it now goes through the custom error handler
        throw new Error("Product not found");
    }
})

export { getProducts, getProductById };