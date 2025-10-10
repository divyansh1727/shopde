import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import v1 from "../assets/images/v1.mp4";

export default function Home({ addToCart }) {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <video
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -10,
          pointerEvents: "none" // ensures video doesn't block clicks
        }}
        src={v1}
        autoPlay
        loop
        muted
        playsInline
      />
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: -9, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 20, padding: "6rem 1.5rem 3rem" }}>
        <section style={{ textAlign: "center", padding: "4rem 0", color: "#fff" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: ".75rem" }}>Elevate Your Style</h1>
          <p style={{ color: "#d1d5db", marginBottom: "1rem" }}>Black. White. Bold. Modern fashion redefined.</p>
          <Link to="/shop" style={{ border: "1px solid #fff", padding: ".5rem 1rem" }}>Shop Now</Link>
        </section>

        <h2 style={{ fontSize: "1.5rem", margin: "1.5rem 0", textAlign: "center", color: "#fff" }}>Featured</h2>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
