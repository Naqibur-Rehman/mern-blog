import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user-routes.js";
import authRoutes from "./routes/auth-routes.js";

dotenv.config();

const app = express();

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Databse Connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes)
