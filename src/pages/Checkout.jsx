import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api";

export default function Checkout({ cartItems, setCartItems }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    payment: "cod",
  });

  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
  e.preventDefault();

  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    navigate("/shop");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place your order!");
      navigate("/login");
      return;
    }

    const res = await fetch(`${API}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartItems,
        shippingInfo: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
        },
        payment: formData.payment,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("🎉 Order placed successfully!");
      setCartItems([]);
      navigate("/");
    } else {
      alert(data.message || "Failed to place order ❌");
    }
  } catch (err) {
    console.error("❌ Error placing order:", err);
    alert("Something went wrong!");
  }
};


  return (
    <div className="min-h-screen bg-black text-white py-20 px-8">
      <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT — ADDRESS FORM */}
        <form
          onSubmit={handleOrder}
          className="bg-gray-900 p-6 rounded-2xl shadow-xl flex flex-col gap-4"
        >
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-white outline-none"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-white outline-none"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-white outline-none"
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={formData.zip}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-white outline-none"
          />

          <div className="mt-4">
            <label className="block mb-2 font-medium">Payment Method:</label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black border border-gray-600 focus:border-white outline-none"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-6 bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Place Order
          </button>
        </form>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-700 py-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">
                  {item.qty} × ₹{item.price}
                </p>
              </div>
              <span className="font-semibold">₹{item.qty * item.price}</span>
            </div>
          ))}

          <div className="flex justify-between mt-6 text-xl font-bold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
