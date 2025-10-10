import { useState } from "react";

export default function ProductDetails({ product, addToCart }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-2xl object-cover w-full h-96"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-400 mb-6">{product.description}</p>
          <span className="text-2xl font-bold mb-6">₹{product.price}</span>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="bg-gray-700 px-3 py-1 rounded"
            >
              -
            </button>
            <span>{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="bg-gray-700 px-3 py-1 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={() => addToCart({ ...product, qty })}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
