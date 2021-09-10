import express from "express";
const router = express.Router();

// import controllers
import { authUser, registerUser, getUserProfile } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js";

// register
router.route("/").post(registerUser);
// login
router.post("/login", authUser);
// protect this route with middleware input
router.route("/profile").get(protect, getUserProfile);


export default router;