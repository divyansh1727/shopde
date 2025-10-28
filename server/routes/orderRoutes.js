import express from "express";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("📦 Order API hit with data:", req.body);

  try {
    // ✅ 1. Verify and decode token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.error("❌ No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("❌ Invalid token:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // ✅ 2. Extract user ID from token payload
    const userId = decoded?.id || decoded?._id || decoded?.userId;
    if (!userId) {
      console.error("❌ No user ID found in token payload:", decoded);
      return res.status(400).json({ message: "User ID missing in token" });
    }

    // ✅ 3. Extract order details
    const { cartItems, shippingInfo, payment } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // ✅ 4. Save order in MongoDB
    const order = await Order.create({
      user: userId, // ensure this matches your schema
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

    console.log("✅ Order saved successfully:", order._id);

    // ✅ 5. Generate invoice PDF
    const generateInvoicePDF = () => {
      return new Promise((resolve, reject) => {
        try {
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
        } catch (err) {
          reject(err);
        }
      });
    };

    const pdfBuffer = await generateInvoicePDF();

    // ✅ 6. Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SHOP_EMAIL,
        pass: process.env.SHOP_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Shopde Orders" <${process.env.SHOP_EMAIL}>`,
      to: process.env.SHOP_EMAIL,
      subject: `🧾 New Order from ${shippingInfo.name}`,
      text: `You received a new order worth ₹${total}. Check the attached invoice.`,
      attachments: [
        {
          filename: `Order_${order._id}.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");

    return res.json({
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
