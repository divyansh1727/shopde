import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Render + Vercel Safe CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shopde-sigma.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests globally
app.options("*", cors());

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Health routes
app.get("/", (req, res) => res.send("✅ Backend is running successfully!"));
app.get("/test", (req, res) => res.send("🧠 Test route working fine!"));

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0", () => {console.log(`🚀 Server running on port ${PORT}`)});
