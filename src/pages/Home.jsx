import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import v1 from "../assets/images/v1.mp4";

export default function Home({ addToCart }) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 🎥 Background video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        src={v1}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* 🔲 Dark overlay for better contrast */}
      <div className="fixed inset-0 bg-black/60 -z-10" />

      {/* 🧭 Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">
          Elevate Your Style
        </h1>
        <p className="text-gray-300 text-lg mb-6 max-w-xl">
          Black. White. Bold. Modern fashion redefined.
        </p>
        <Link
          to="#featured"
          className="border border-white px-6 py-2 text-lg hover:bg-white hover:text-black transition rounded-md"
        >
          Shop Now
        </Link>
      </div>

      {/* 🛍️ Featured Products */}
      <section id="featured" className="relative z-20 bg-black/80 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-white mb-10">
          Featured
        </h2>

        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-w-6xl mx-auto">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}
