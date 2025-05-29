import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import employeeRoutes from "./routes/employeeRoutes";

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);

export default app;
