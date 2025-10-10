import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="relative min-h-screen bg-black text-white p-8">
      {/* Brand Introduction */}
      <motion.section
        className="max-w-4xl mx-auto text-center py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">About Our Brand</h1>
        <p className="text-gray-300 text-lg mb-6">
          Welcome to <span className="text-yellow-400 font-bold">Yapper</span> –  
          where <strong>printed shirts and hoodies</strong> are redefined with bold, minimalist designs.  
          We believe in quality, creativity, and empowering your personal style.
        </p>
        <p className="text-gray-400 text-lg">
          Our collections are curated to make every wardrobe statement-worthy,  
          while keeping comfort, elegance, and individuality in mind.
        </p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="max-w-6xl mx-auto py-12 grid md:grid-cols-2 gap-8"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className=""
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/assets/images/about1.jpg"
            alt="Fashion"
            className="rounded-xl object-cover w-full h-80"
          />
        </motion.div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-4">
            To create premium fashion that lets everyone express their <strong>unique style</strong> confidently.
          </p>
          <div className="flex gap-6 mt-4">
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
      </motion.section>
    </div>
  );
}

