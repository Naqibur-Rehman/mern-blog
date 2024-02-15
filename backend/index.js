import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user-routes.js";
import authRoutes from "./routes/auth-routes.js";
import postRoutes from "./routes/post-route.js";

dotenv.config();

const app = express();

app.use(express.json())
app.use(cookieParser())

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Databse Connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes)

app.use("/api/post", postRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})