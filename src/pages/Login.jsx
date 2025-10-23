import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../lib/api";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Try registering
      await axios.post(`${API}/api/auth/register`, formData,{
        headers: { "Content-Type": "application/json" },
  withCredentials: true,
      });

      // Step 2: Auto-login after registration
      const loginRes = await axios.post(`${API}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      },
    {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

      // ✅ Store both token & user consistently
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));

      // Trigger Navbar refresh if it's listening
      window.dispatchEvent(new Event("storage"));

      setMessage("🎉 Welcome! Redirecting to home...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed ❌";

      // If user already exists → auto-login instead
      if (errorMsg.toLowerCase().includes("exists")) {
        try {
          const loginRes = await axios.post(`${API}/api/auth/login`, {
            email: formData.email,
            password: formData.password,
          });

          // ✅ Store the same way here too
          localStorage.setItem("token", loginRes.data.token);
          localStorage.setItem("user", JSON.stringify(loginRes.data.user));

          // Trigger Navbar refresh
          window.dispatchEvent(new Event("storage"));

          setMessage("👋 Welcome back! Redirecting...");
          setTimeout(() => navigate("/"), 1000);
          return;
        } catch (loginErr) {
          setMessage("Login failed. Please try again ❌");
          return;
        }
      }

      setMessage(errorMsg);
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
