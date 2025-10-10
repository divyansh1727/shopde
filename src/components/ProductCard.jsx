import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 md:h-72 object-cover transform transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
        <Link
          to={`/product/${product.id}`}
          className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <span className="text-lg font-bold">₹{product.price}</span>
      </div>
    </div>
  );
}
