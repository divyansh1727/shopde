import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center fixed w-full z-30 shadow-md">
      <div className="text-2xl font-bold">Yapper.</div>
      <ul className="flex gap-8 items-center">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-gray-300 transition">
            <AiOutlineHome /> 
          </Link>
        </li>
        <li>
          <Link to="/shop" className="flex items-center gap-1 hover:text-gray-300 transition">
            <FiShoppingBag /> 
          </Link>
        </li>
        <li>
          <Link to="/about" className="flex items-center gap-1 hover:text-gray-300 transition">
            <AiOutlineInfoCircle /> 
          </Link>
        </li>
        <li>
          <Link to="/cart" className="flex items-center gap-1 hover:text-gray-300 transition">
            <FiShoppingCart /> 
          </Link>
        </li>
      </ul>
    </nav>
  );
}
