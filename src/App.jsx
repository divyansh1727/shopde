import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SplashScreen from "./components/SplashScreen";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";


export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // ✅ Toast Notification
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  // ✅ Add to Cart logic (with backend sync)
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!user || !token) {
      showToast("Please login to add items 🛒");
      window.location.href = "/login";
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCartItems((prev) => {
        const exist = prev.find((p) => p.id === product.id);
        if (exist) {
          showToast(`${product.name} quantity updated 🛍️`);
          return prev.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
          );
        } else {
          showToast(`${product.name} added to cart 🛒`);
          return [...prev, { ...product, qty: 1 }];
        }
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      showToast("Error adding to cart ❌");
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      {!loading && (
        <Router>
          <Navbar cartCount={cartCount} user={user} setUser={setUser} />

          <div className="pt-20">
            <Routes>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home addToCart={addToCart} />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/shop"
                element={<Shop addToCart={addToCart} user={user} />}
              />
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
              <Route
  path="/checkout"
  element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />}
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
