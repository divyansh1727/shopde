import { Link } from "react-router-dom";

export default function Navbar({ cartItems }) {
  console.log("Navbar rendered");

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-[9999]">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 text-black">
        <h1 className="text-2xl font-bold">Yapper.</h1>
        <ul className="flex gap-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        </ul>
      </div>
    </nav>
  );
}
