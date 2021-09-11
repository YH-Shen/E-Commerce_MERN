import express from "express";
const router = express.Router();

// import controllers
import { 
    authUser, 
    registerUser, 
    getUserProfile, 
    getUsers,
    deleteUser 
} from "../controllers/userController.js";
import { protect, isAdminCheck } from "../middleware/authMiddleware.js";

// register and also get all users for admin
router.route("/").post(registerUser).get(protect, isAdminCheck, getUsers);
// login
router.post("/login", authUser);
// protect this route with middleware input
router.route("/profile").get(protect, getUserProfile);

// delete user
router.route("/:id").delete(protect, isAdminCheck, deleteUser);
export default router;