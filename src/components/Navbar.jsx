import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";

export default function Navbar({ cartCount, user, setUser }) {
  const navigate = useNavigate();

  // ✅ Safe logout that doesn't break React state
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (typeof setUser === "function") setUser(null); // prevent crash if not passed
      navigate("/"); // ✅ use navigate instead of reload
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center fixed w-full z-30 shadow-md">
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        Yapper.
      </div>

      <ul className="flex gap-8 items-center">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <AiOutlineHome />
            <span className="hidden md:inline">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/shop"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <FiShoppingBag />
            <span className="hidden md:inline">Shop</span>
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <AiOutlineInfoCircle />
            <span className="hidden md:inline">About</span>
          </Link>
        </li>

        {/* ✅ Login/Register or Logout button */}
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-3 py-1 bg-white text-black rounded-md hover:bg-gray-200 transition"
            >
              Login
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

        {/* ✅ Cart (optional: hide if user not logged in) */}
        <li className="relative">
          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <FiShoppingCart />
            <span className="hidden md:inline">Cart</span>
          </Link>

          {user && cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
