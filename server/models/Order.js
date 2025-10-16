import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        image: String,
        qty: Number,
      },
    ],
    shippingInfo: {
      name: String,
      address: String,
      city: String,
      zip: String,
    },
    payment: {
      type: String,
      enum: ["cod", "card", "upi"],
      default: "cod",
    },
    total: Number,
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
