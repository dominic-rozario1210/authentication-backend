import express from "express"
import { changePassword, forgotPassword, getProfile, login, register, verifyToken } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login);

router.post("/forgot-password",forgotPassword);
router.put("/change-password",authMiddleware,changePassword);

router.get("/verify-token",authMiddleware,verifyToken);

router.get("/profile",authMiddleware,getProfile)

export default router