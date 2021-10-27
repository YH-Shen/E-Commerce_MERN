// Express async handler: Simple middleware for handling
//      exceptions inside of async express routes and passing
//      them to your express error handlers.
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc     Fetch all products
// @routes   Get /api/products/
// @access   Public Route
const getProducts = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};

	const products = await Product.find({ ...keyword });
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
});

// @desc     Create new review
// @routes   POST /api/products/:id/review
// @access   Public Route
const createProductReview = asyncHandler(async (req, res) => {
	// get rating and comment from request body
	const { rating, comment } = req.body;

	// find the product that's being reviewed
	const product = await Product.findById(req.params.id);

	// if product exists
	if (product) {
		// check if user has already reviewed
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);
		if (alreadyReviewed) {
			res.status(400); //bad request
			throw new Error("User already reviewed this product");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		// add review
		product.reviews.push(review);

		// update num of reviews
		product.reviews.numReviews = product.reviews.length;

		// update priduct ratings
		product.reviews.rating =
			product.reviews.reduce((acc, curItem) => curItem.rating + acc, 0) /
			product.reviews.numReviews;

		// save and add to data base
		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export { getProducts, getProductById, createProductReview };
