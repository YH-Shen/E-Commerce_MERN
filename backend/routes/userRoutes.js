import express from "express";
const router = express.Router();

// import controllers
import { authUser, getUserProfile } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js";


router.post("/login", authUser);
// protect this route with middleware input
router.route("/profile").get(protect, getUserProfile);


export default router;