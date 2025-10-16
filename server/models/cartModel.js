import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      qty: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
