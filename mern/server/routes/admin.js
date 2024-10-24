import express from "express";
import { getUsers, getUserCart, getOrders, getCheckouts } from "../controllers/admin.js";
import {verifyToken, verifyAdmin} from "../middleware/auth.js";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.js";

const router = express.Router();

router.get("/user", verifyToken, verifyAdmin, getUsers);
router.get("/user/:id/cart", verifyToken, verifyAdmin, getUserCart);
router.get("/product", verifyToken, verifyAdmin, getProducts);
router.post("/product", verifyToken, verifyAdmin, addProduct);
router.patch("/product/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/product/:id", verifyToken, verifyAdmin, deleteProduct);
router.get("/order", verifyToken, verifyAdmin, getOrders);
router.get("/checkout", verifyToken, verifyAdmin, getCheckouts);

export default router;