import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center fixed w-full z-30 shadow-md">
      <div className="text-2xl font-bold">Yapper.</div>
      <ul className="flex gap-8 items-center">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-gray-300 transition">
            <AiOutlineHome />
            <span className="hidden md:inline">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/shop" className="flex items-center gap-1 hover:text-gray-300 transition">
            <FiShoppingBag />
            <span className="hidden md:inline">Shop</span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="flex items-center gap-1 hover:text-gray-300 transition">
            <AiOutlineInfoCircle />
            <span className="hidden md:inline">About</span>
          </Link>
        </li>
        <li className="relative">
          <Link to="/cart" className="flex items-center gap-1 hover:text-gray-300 transition">
            <FiShoppingCart />
            <span className="hidden md:inline">Cart</span>
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
