import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import connectDB from "./utils/db";
// const cors = require("cors");
import cors from "cors"

dotenv.config();

const app = express();

// Connect to the database
connectDB();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);


export default app;
