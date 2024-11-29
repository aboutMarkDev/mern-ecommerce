import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();
import userRoutes from "./routes/usersRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import prorductsRoutes from "./routes/productsRoutes.js";
import connectDB from "./config/dbConnect.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_LOCAL_URL,
    credentials: true,
  })
);

// User Route
app.use("/users", userRoutes);
// Orders Route
app.use("/orders", ordersRoutes);
// Admin Route
app.use("/admin", adminRoutes);
// Products Route
app.use("/product", prorductsRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
