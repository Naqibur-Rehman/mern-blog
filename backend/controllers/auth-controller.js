import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
  try {
    const existingUser = await User.findOne({username });
    if (existingUser) {
      return next(
        errorHandler(422, "User name already taken, please choose a different one.")
      );
    }
  } catch (error) {
    return next(errorHandler(500, "Oops! an error occured."));
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return next(
        errorHandler(422, "User exists already, please login instead")
      );
    }
  } catch (error) {
    return next(errorHandler(500, "Oops! an error occured.")) 
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    res.status(201).json({ message: "Signup Successfull" });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(errorHandler(401, "User not found."));
    }

    const isValidPassword = bcrypt.compareSync(password, existingUser.password);
    if (!isValidPassword) {
      return next(errorHandler(401, "Invalid password."));
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({
        userId: existingUser._id,
        email: existingUser.email,
        token: token,
      });
  } catch (error) {
    return next(errorHandler(500, "Login failed."));
  }
};
