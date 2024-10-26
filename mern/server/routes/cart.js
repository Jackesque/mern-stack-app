import express from "express";
import {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../controllers/cart.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getCartByUserId);
router.post("/", verifyToken, addItemToCart);
router.delete("/", verifyToken, removeItemFromCart);
router.delete("/:userId", verifyToken, clearCart);

export default router;
