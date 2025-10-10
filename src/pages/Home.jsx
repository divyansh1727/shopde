import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import v1 from "../assets/images/v1.mp4";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import a1 from "../assets/images/a1.jpg"

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

      {/* 🧭 Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">
          Elevate Your Style
        </h1>
        <p className="text-gray-300 text-lg mb-6 max-w-xl">
          Black. White. Bold. Modern fashion redefined.
        </p>
        <button
  onClick={() =>
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })
  }
  className="border border-white px-6 py-2 text-lg hover:bg-white hover:text-black transition rounded-md"
>
  Shop Now
</button>



      </div>

      {/* 🛍️ Featured Products */}
      <motion.section
        id="featured"
        className="relative z-20 bg-black/80 py-16 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-10">
          Featured
        </h2>

        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-w-6xl mx-auto">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </motion.section>

      {/* 📝 About Section */}
      <motion.section
        id="about"
        className="relative z-20 bg-gray-900 py-16 px-6 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto text-center text-gray-300 text-lg mb-6">
          Welcome to <span className="text-yellow-400 font-bold">Yapper</span> – where <strong>printed shirts and hoodies</strong> are redefined with bold, minimalist designs.  
          Our designs combine modern aesthetics with timeless elegance to help you stand out.
        </p>

        <div className="max-w-6xl mx-auto py-12 grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={a1}
              alt="Fashion"
              className="rounded-xl object-cover w-full h-80"
            />
          </motion.div>

          {/* Mission & Badges */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-300 mb-4">
              To create premium fashion that lets everyone express their <strong>unique style</strong> confidently.
            </p>
            <div className="flex gap-6 mt-4 flex-wrap justify-center md:justify-start">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                Shirts
              </span>
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                Hoodies
              </span>
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                Custom Prints
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 🦶 Footer */}
      <footer className="relative z-20 bg-black py-8 px-6 text-gray-400 text-center">
        <p>&copy; {new Date().getFullYear()} Elevate Fashion. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4 text-2xl">
          <a
            href="https://www.instagram.com/pourbykay"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/7838548016"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaWhatsapp />
          </a>
        </div>
      </footer>
    </div>
  );
}
