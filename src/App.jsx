import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
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
  const [toast, setToast] = useState(null);

  // Show toast
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  // Add to Cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        showToast(`${product.name} quantity updated 🛍️`);
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, qty: (p.qty || 1) + (product.qty || 1) }
            : p
        );
      } else {
        showToast(`${product.name} added to cart 🛒`);
        return [...prev, { ...product, qty: product.qty || 1 }];
      }
    });
  };

  // Total cart quantity
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      {!loading && (
        <Router>
          <Navbar cartCount={cartCount} />

          <div className="pt-20">
            <Routes>
              <Route path="/" element={<Home addToCart={addToCart} />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop addToCart={addToCart} />} />
              <Route
                path="/cart"
                element={
                  <Cart cartItems={cartItems} setCartItems={setCartItems} />
                }
              />
              <Route
                path="/product/:id"
                element={<ProductDetails addToCart={addToCart} />}
              />
            </Routes>
          </div>
        </Router>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-lg shadow-lg font-semibold animate-bounce z-50">
          {toast}
        </div>
      )}
    </>
  );
}
