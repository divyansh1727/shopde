import express from "express";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("📦 Order API hit with data:", req.body);
  try {
    const { user, items, total, address } = req.body;

    // Save to MongoDB
    const order = await Order.create({ user, items, total, address });
    console.log("✅ Order saved in DB:", order._id);

    // Create a PDF in memory
    const doc = new PDFDocument();
    let pdfBuffer = [];
    doc.on("data", pdfBuffer.push.bind(pdfBuffer));
    doc.on("end", async () => {
      const finalBuffer = Buffer.concat(pdfBuffer);

      // Send Email with PDF attachment
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SHOP_EMAIL,
            pass: process.env.SHOP_EMAIL_PASS,
          },
        });

        console.log("📨 Sending email to:", process.env.SHOP_EMAIL);

        const mailOptions = {
          from: `"Shopde Orders" <${process.env.SHOP_EMAIL}>`,
          to: process.env.SHOP_EMAIL,
          subject: `🧾 New Order from ${user.name}`,
          text: `You received a new order worth ₹${total}. Check the attached PDF.`,
          attachments: [
            {
              filename: `Order_${order._id}.pdf`,
              content: finalBuffer,
            },
          ],
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
        res.json({ success: true, message: "Order placed and emailed!" });
      } catch (mailError) {
        console.error("❌ Email sending failed:", mailError);
        res.status(500).json({ success: false, message: "Email sending failed" });
      }
    });

    // PDF content
    doc.fontSize(18).text("Shopde Order Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Customer: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Address: ${address}`);
    doc.moveDown();
    doc.text("Items:");
    items.forEach((item) => {
      doc.text(`- ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`);
    });
    doc.moveDown();
    doc.fontSize(14).text(`Total: ₹${total}`, { align: "right" });
    doc.end();

  } catch (error) {
    console.error("❌ Order route error:", error);
    res.status(500).json({ success: false, message: "Order placement failed" });
  }
});

export default router;
