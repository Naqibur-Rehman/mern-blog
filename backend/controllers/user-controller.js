import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user-model.js";

export const test = (req, res) => {
  res.json({ message: "API is working" });
};

export const updateUser = async (req, res, next) => {
  //req.params.userId = update/:userId
  //req.user.userId is from when we created jwt token in auth-controller we named it userId
  if (req.user.userId !== req.params.userId) {
    return next(
      errorHandler(
        403,
        "You are not allowed to update this user. Unauthorized access!"
      )
    );
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must me at least 6 characcters long")
      );
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters.")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username can not have any spaces."));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]*$/)) {
      return next(
        errorHandler(400, "Username can only have letters and numbers")
      );
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );

      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      return next(errorHandler(500, error.message + "Something went wrong. Try again"));
    }
  }
};


export const deleteUser = async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
       return next(
         errorHandler(
           403,
           "You are not allowed to delete this user. Unauthorized access!"
         )
       );
  }

  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json("User has been deleted")
  } catch (error) {
    return next(error)
  }
}