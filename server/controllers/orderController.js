import Order from "../models/Order.js";

// 📦 Place Order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItems, shippingInfo, payment } = req.body;

    if (!cartItems || cartItems.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const newOrder = new Order({
      user: userId,
      items: cartItems,
      shippingInfo,
      payment,
      total: cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Server error while placing order" });
  }
};

// 👤 Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
