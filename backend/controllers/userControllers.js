import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { createAccessToken, setTokens } from "../utils/generateTokens.js";
import cloudinary from "../config/cloudinary.js";

// Register (CREATE)
// route: POST /users/signup
// access: Public
export const register = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      contactNumber,
      imageUrl: "", //empty strings coz we want the new user have the default imageUrl in client.
    });

    if (user) {
      // Sign accesstoken
      const accessToken = createAccessToken(user._id);

      // Set the token in cookies
      setTokens(res, accessToken);
      res.status(201).json({ message: "User successfully created" });
    } else {
      res.status(400).json({ message: "Something went wrong." });
    }
  } catch (error) {
    console.log(error);
  }
};

// Login User/set token
// route: POST /users/signin
// access: Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const accessToken = createAccessToken(user._id);
      setTokens(res, accessToken);
      res.status(201).json({ message: "Login User" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Logout User /destroy token
// route: POST /users/logout
// access: Private
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ message: "User logged out" });
};

// Get User Profile (READ)
// route: GET /user/profile
// access: Private
// getCurrentUser
export const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

// Get User By ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userFound = await User.findById(id);

    res.status(200).json(userFound);
  } catch (error) {
    console.log(error);
  }
};

// Update User Profile (UPDATE)
// route: PATCH OR PUT /users/:id
// access: Private
export const updateUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(400).json({ message: "User not found" });

    let newImageUrl;

    if (req.file) {
      // Upload new imageUrl
      const result = await cloudinary.uploader.upload(req.file.path, {
        asset_folder: "Ecommerce/Users", //folder path in cloudinary
      });

      if (!result) {
        console.log("Uploading in cloudinary failed");
        return res
          .status(500)
          .json({ message: "Something went wrong. Please try again!" });
      }

      // Before storing new secure_url in newImageUrl variable, delete the old one in cloudinary
      const { imageUrl } = user;
      if (imageUrl) {
        const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
        const deleteOldImgUrl = await cloudinary.uploader.destroy(publicId);

        if (!deleteOldImgUrl) {
          console.log("Deleting in cloudinary failed");
          return res.status(500).json({ message: "Something went wrong." });
        }
      }

      // store the secure_url of newImageUrl in newImageUrl variable. If users didn't provide any image, store an empty string in order to make it falsy value and still use the current imageUrl.
      newImageUrl = result.secure_url;
    } else {
      newImageUrl = "";
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.contactNumber = req.body.contactNumber || user.contactNumber;
    user.imageUrl = newImageUrl || user.imageUrl;

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      contactNumber: updatedUser.contactNumber,
      imageUrl: updatedUser.imageUrl,
    });
  } catch (error) {
    console.log("Error on updating user", error);
  }
};

// Get All Users
// route: Get /users/all
// access: Private (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users)
      return res.status(400).json({ message: "Fetching Users failed" });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const addUserAddress = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { shippingAddress: req.body.newAddress } },
      { new: true }
    );

    if (!user) {
      console.log("User not found");
    }
    res.status(200).json({ shippingAddress: user.shippingAddress });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneAddress = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { shippingAddress: req.body.address } },
      { new: true }
    );

    if (!user) {
      console.log("User not found");
    }

    res.status(200).json({ shippingAddress: user.shippingAddress });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(500).json({ message: "User not found." });
    }

    const { imageUrl } = userToDelete;
    if (imageUrl) {
      const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
      const deleteImgUrl = await cloudinary.uploader.destroy(publicId);

      if (!deleteImgUrl) {
        console.log("Deleting in cloudinary failed");
        return res.status(500).json({ message: "Something went wrong." });
      }
    }

    const deletedUser = await User.deleteOne({ _id: userId });

    if (deletedUser.deletedCount === 0) {
      console.log("Cannot delete user");
      return res.status(404).json({ message: "Something went wrong. " });
    }

    console.log(deletedUser);

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
  }
};
