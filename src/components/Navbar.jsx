import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi"; // icons for mobile menu toggle

export default function Navbar({ cartCount, user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (typeof setUser === "function") setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center fixed w-full z-30 shadow-md">
      {/* Brand */}
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        Yapper.
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 items-center">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <AiOutlineHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/shop"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <FiShoppingBag />
            <span>Shop</span>
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <AiOutlineInfoCircle />
            <span>About</span>
          </Link>
        </li>

        {/* Login / Logout */}
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-3 py-1 bg-white text-black rounded-md hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 border border-white rounded-md hover:bg-gray-800 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}

        {/* Cart */}
        <li className="relative">
          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <FiShoppingCart />
            <span>Cart</span>
          </Link>

          {user && cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black border-t border-gray-800 flex flex-col items-center gap-6 py-6 md:hidden animate-slideDown">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
            Shop
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
            About
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-black px-4 py-1 rounded-md font-semibold hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="border border-white px-4 py-1 rounded-md font-semibold hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="bg-red-600 px-4 py-1 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <FiShoppingCart />
            <span>Cart</span>
            {user && cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
