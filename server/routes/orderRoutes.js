import express from "express";
import PDFDocument from "pdfkit"; 
import dotenv from "dotenv";
import { Resend } from "resend";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

// ✅ Initialize Resend safely *after* env is confirmed loaded
let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log("✅ Resend initialized successfully.");
} else {
  console.warn("⚠️ RESEND_API_KEY missing — emails will be skipped.");
}

// ✅ Order API route
router.post("/", async (req, res) => {
  console.log("📦 Order API hit with data:", req.body);

  try {
    // 1️⃣ Verify token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("❌ Invalid token:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded?.id || decoded?._id || decoded?.userId;
    if (!userId) return res.status(400).json({ message: "User ID missing in token" });

    // 2️⃣ Extract order data
    const { cartItems, shippingInfo, payment } = req.body;
    if (!cartItems?.length) return res.status(400).json({ message: "Cart is empty" });

    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // 3️⃣ Save order
    const order = await Order.create({
      user: userId,
      items: cartItems.map((item) => ({
        productId: item.id || item._id || "unknown",
        name: item.name,
        price: item.price,
        image: item.image,
        qty: item.qty,
      })),
      shippingInfo,
      payment,
      total,
    });

    console.log("✅ Order saved:", order._id);

    // 4️⃣ Generate PDF
    const pdfBuffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers = [];
      doc.on("data", (data) => buffers.push(data));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      doc.fontSize(18).text("Shopde Order Invoice", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`Order ID: ${order._id}`);
      doc.text(`Customer: ${shippingInfo.name}`);
      doc.text(`Address: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zip}`);
      doc.moveDown();
      doc.text("Items:");
      cartItems.forEach((item) => {
        doc.text(`- ${item.name} x${item.qty} = ₹${item.price * item.qty}`);
      });
      doc.moveDown();
      doc.fontSize(14).text(`Total: ₹${total}`, { align: "right" });
      doc.end();
    });

    // 5️⃣ Send email only if resend exists
    if (resend) {
      try {
        const emailResponse = await resend.emails.send({
          from: "Shopde Orders <onboarding@resend.dev>",
          to: process.env.SHOP_EMAIL,
          subject: `🧾 New Order from ${shippingInfo.name}`,
          text: `You received a new order worth ₹${total}. Check the attached invoice.`,
          attachments: [
            {
              filename: `Order_${order._id}.pdf`,
              content: pdfBuffer.toString("base64"),
            },
          ],
        });

        console.log("✅ Email sent successfully:", emailResponse.id);
      } catch (mailErr) {
        console.error("❌ Email sending failed:", mailErr);
      }
    }

    res.json({
      success: true,
      message: "Order placed successfully and invoice emailed!",
      orderId: order._id,
    });

  } catch (error) {
    console.error("❌ Order route error:", error);
    res.status(500).json({ success: false, message: "Order placement failed." });
  }
});

export default router;
