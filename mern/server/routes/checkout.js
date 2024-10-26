import express from "express";
import { createCheckout, getCheckoutById, getCheckoutsByUserId } from "../controllers/checkout.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getCheckoutsByUserId);
router.post("/", verifyToken, createCheckout);
router.get("/:checkoutId", verifyToken, getCheckoutById);

export default router;
