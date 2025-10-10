import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function ProductCard({ product, addToCart }) {
  const [flying, setFlying] = useState(false);

  const handleAddToCart = () => {
    setFlying(true);
    addToCart(product);
    setTimeout(() => setFlying(false), 800); // reset animation
  };

  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-shadow duration-300">

      {/* 🖼️ Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover"
      />

      {/* 💫 Desktop Hover Overlay */}
      <div
        className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center gap-3
        opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-300 md:flex"
      >
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          <FaShoppingCart /> Add to Cart
        </button>

        {/* ✅ View Details navigates correctly */}
        <Link
          to={`/product/${product.id}`}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          <FaSearch /> View Details
        </Link>
      </div>

      {/* 📱 Mobile Buttons (always visible) */}
      <div className="flex justify-center items-center gap-3 mt-3 md:hidden px-2">
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          <FaShoppingCart /> Add to Cart
        </button>

        <Link
          to={`/product/${product.id}`}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          <FaSearch /> View Details
        </Link>
      </div>

      {/* 🛒 Fly-to-Cart Animation */}
      {flying && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black animate-flyCart z-50">
          <FaShoppingCart />
        </div>
      )}

      {/* 📋 Product Info */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price}</p>
      </div>

      {/* 🎬 Fly Animation Keyframes */}
      <style>
        {`
          @keyframes flyCart {
            0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
            50% { transform: translate(-50%, -150px) scale(1.2); opacity: 0.8; }
            100% { transform: translate(-50%, -300px) scale(0); opacity: 0; }
          }
          .animate-flyCart {
            animation: flyCart 0.8s forwards;
          }
        `}
      </style>
    </div>
  );
}
