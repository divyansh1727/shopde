// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import  Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SplashScreen from "./components/SplashScreen";
import ProductDetails from "./pages/ProductDetails";
import { products } from "./data/products";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <> 
     {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      {!loading && (
    <Router>
      <Navbar cartItems={cartItems} />
      

      {/* ensures content starts below navbar */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/product/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
        </Routes>
      </div>
    </Router>
      )}
    </>
  );
}
