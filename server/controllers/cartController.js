import User from "../models/User.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // If cart doesn't exist yet, create one
    if (!user.cart) user.cart = [];

    user.cart.push({ productId, name, price, image });
    await user.save();

    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
