import express from "express";
import { registerUser, loginUser, logoutUser, validateUser } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/validate", verifyToken, validateUser);
router.post("/logout", logoutUser);

export default router;
