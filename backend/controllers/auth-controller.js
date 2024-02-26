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
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return next(
        errorHandler(
          422,
          "User name already taken, please choose a different one."
        )
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
    return next(errorHandler(500, "Oops! an error occured."));
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
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_SECRET_KEY
    );
    const { password: password1, ...rest } = existingUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true, sameSite: "None" })
      .json(rest);
  } catch (error) {
    return next(errorHandler(500, "Login failed."));
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET_KEY
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true, sameSite: "None" })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      // Naqibur Rehman => naqiburrehman4347
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign(
        {
          userId: newUser._id,
          isAdmin: newUser.isAdmin,
        },
        process.env.JWT_SECRET_KEY
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true, sameSite: "None" })
        .json(rest);
    }
  } catch (error) {
    return next(errorHandler(501, "Something went wrong! Try again."));
  }
};
