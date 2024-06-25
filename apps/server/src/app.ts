import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import connectDB from "./utils/db";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import { morganMiddleware } from "./config/logger";

dotenv.config();

const app = express();

// Connect to the database
connectDB();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morganMiddleware);
app.use(errorHandler);

// Routes
app.use("/api/users", userRoutes);

export default app;
