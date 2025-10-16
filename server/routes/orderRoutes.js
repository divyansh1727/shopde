import express from "express";
import { placeOrder, getUserOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Place a new order
router.post("/place", authMiddleware, placeOrder);

// Get orders of a logged-in user
router.get("/my-orders", authMiddleware, getUserOrders);

export default router;
