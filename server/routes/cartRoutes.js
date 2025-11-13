import express from "express";
import Cart from "../models/cartModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

console.log("🛒 Cart route loaded successfully!");

router.post("/add", async (req, res) => {
  console.log("📦 /api/cart/add hit!");
  console.log("📩 Request body:", req.body);
  console.log("🪪 Authorization header:", req.headers.authorization);

  try {
    // ✅ Step 1: Verify token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.error("❌ No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded JWT:", decoded);
    const userId = decoded.id || decoded._id || decoded.userId;
    console.log("👤 User ID:", userId);

    // ✅ Step 2: Extract product data
    const { productId, name, price, image, qty } = req.body;
    console.log("🛍️ Product data:", { productId, name, price, image, qty });

    if (!productId) {
      console.error("❌ Missing productId in request");
      return res.status(400).json({ message: "Product ID missing" });
    }

    // ✅ Step 3: Find or create user cart
    let cart = await Cart.findOne({ userId });
    console.log("🛒 Existing cart found:", !!cart);

    if (!cart) {
      cart = new Cart({ userId, items: [] });
      console.log("🆕 New cart created for user:", userId);
    }

    // ✅ Step 4: Update cart items
    const existingItem = cart.items.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.qty += qty || 1;
      console.log("🔁 Updated existing item quantity:", existingItem.qty);
    } else {
      cart.items.push({ productId, name, price, image, qty: qty || 1 });
      console.log("🆕 Added new item to cart");
    }

    await cart.save();
    console.log("✅ Cart saved successfully!");

    res.json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("💥 Error in /api/cart/add:", err);
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});

export default router;
