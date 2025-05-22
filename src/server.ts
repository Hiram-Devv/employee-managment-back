import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import employeeRoutes from "./routes/employeeRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);

export default app;
