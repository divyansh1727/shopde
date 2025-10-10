import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleQtyChange = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1) }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-900 p-4 rounded-xl shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1 mx-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-400">₹{item.price}</p>
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => handleQtyChange(item.id, "dec")}
                    className="bg-gray-700 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => handleQtyChange(item.id, "inc")}
                    className="bg-gray-700 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="text-lg font-bold">₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 p-4 bg-gray-800 rounded-xl text-xl font-bold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/checkout"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
