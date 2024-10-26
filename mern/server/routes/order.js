import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
} from "../controllers/order.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getOrdersByUserId);
router.post("/", verifyToken, createOrder);
router.get("/:orderId", verifyToken, getOrderById);

export default router;
