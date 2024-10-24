import express from "express";
import { registerUser, loginUser } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/validate", verifyToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

export default router;
