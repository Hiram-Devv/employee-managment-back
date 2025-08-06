import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import employeeRoutes from "./routes/employeeRoutes";

dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(cors(corsConfig));

//logging
app.use(morgan("dev"));

// Read form data
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);

export default app;
