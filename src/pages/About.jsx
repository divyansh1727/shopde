export default function About() {
  return (
    <div className="relative min-h-screen bg-black text-white p-8">
      <section className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-5xl font-bold mb-6">About Our Brand</h1>
        <p className="text-gray-300 text-lg mb-6">
          At [Brand Name], we redefine fashion with bold, minimalist designs.
          We believe in quality, sustainability, and empowering your personal style.
        </p>
        <p className="text-gray-400 text-lg">
          Our collections are curated to make every wardrobe statement-worthy,
          while keeping comfort and elegance in mind.
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-12 grid md:grid-cols-2 gap-8">
        <div>
          <img
            src="/assets/images/about1.jpg"
            alt="Fashion"
            className="rounded-xl object-cover w-full h-80"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300">
            To provide premium fashion that empowers everyone to express their
            unique style confidently.
          </p>
        </div>
      </section>
    </div>
  );
}
