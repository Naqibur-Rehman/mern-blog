import bcrypt from "bcryptjs";
import User from "../models/user-model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    //   return res.status(400).json({ message: "All fields are required" });
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUSer = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUSer.save();

    res.status(201).json({ message: "Signup Successfull" });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};