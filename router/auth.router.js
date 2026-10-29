import express from "express"
import { changePassword, forgotPassword, getProfile, login, register, verifyAdmin, verifyToken } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login);

router.post("/forgot-password",forgotPassword);
router.put("/change-password",authMiddleware,changePassword);

router.get("/verify-token",authMiddleware,verifyToken);

router.get("/profile",authMiddleware,getProfile)

router.get("/verify-admin",authMiddleware,authorize("admin"),verifyAdmin)

export default router