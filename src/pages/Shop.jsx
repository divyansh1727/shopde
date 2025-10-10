import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

export default function Shop({ addToCart }) {
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
                onClick={() => addToCart(product)}
                className="bg-white text-black px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-300"
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
