import express from "express";
const router = express.Router();

// import controllers
import {
	getProducts,
	getProductById,
	createProductReview,
	getTopProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts);
router.get("/top", getTopProducts);
router.route("/:id").get(getProductById);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
