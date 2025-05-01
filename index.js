import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import classRoutes from "./Routes/classRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api/classes",classRoutes);
app.use("/api/students",studentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
