import { useState } from "react";
import axios from "axios";
import { API } from "../lib/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ allows cross-origin requests with cookies
        }
      );

      console.log("✅ Registration Success:", res.data);
      setMessage("🎉 Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("❌ Registration Error:", err);
      setMessage(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-96 border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-3 rounded-lg bg-transparent border border-white/30 placeholder-gray-400 text-white focus:border-white outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="p-3 rounded-lg bg-transparent border border-white/30 placeholder-gray-400 text-white focus:border-white outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-3 rounded-lg bg-transparent border border-white/30 placeholder-gray-400 text-white focus:border-white outline-none"
            required
          />
          <button
            type="submit"
            className="mt-3 bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-300">{message}</p>
        )}

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
