import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { API} from "../lib/api";
export default function Shop({ addToCart, user }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user);

  // ✅ Check user login state from localStorage (persists even after refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [user]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    // ✅ If not logged in, redirect to login (and remember last page)
    if (!token || !currentUser) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Added to cart:", data);
        alert("Item added to cart successfully!");
        if (addToCart) addToCart(product); // Update UI cart count
      } else {
        console.error("❌ Server error:", data);
        alert(data.message || "Failed to add item to cart");
      }
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      alert("Something went wrong while adding to cart");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-24 px-8">
      <h1 className="text-3xl font-bold text-center mb-10">Shop Our Collection</h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 p-5 rounded-2xl hover:shadow-xl transition flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl mb-4 h-56 w-full object-cover"
            />
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-400 mb-2">₹{product.price}</p>
            <div className="mt-auto flex justify-between items-center">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-white text-black px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-300 transition"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                className="text-sm text-gray-400 hover:text-white"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
