import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../utils/generateTokens.js";
import cloudinary from "../config/cloudinary.js";

//Sign In
export const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.comparePassword(password))) {
      const adminToken = jwt.sign(
        { adminId: admin._id },
        process.env.JWT_ADMIN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.cookie("admin_token", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });
      return res.status(200).json({ message: `Welcome ${admin.username}!` });
    } else {
      return res
        .status(400)
        .json({ message: "Something went wrong. Please try again!" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Sign Up
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists)
      return res.status(400).json({ message: "Admin already exists." });

    const admin = await Admin.create({
      username,
      email,
      password,
      imageUrl: "",
    });

    if (admin) {
      //Create a token for admin if signup success
      const adminToken = jwt.sign(
        { adminId: admin._id },
        process.env.JWT_ADMIN_SECRET,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("admin_token", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });
      return res.status(200).json({ message: `Welcome ${admin.username}.` });
    } else {
      return res.status(400).json({ message: "Something went wrong." });
    }
  } catch (error) {
    console.log(error);
  }
};

//Update Admin
export const updateById = async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId);

    if (!admin) return res.status(400).json({ message: "Admin not found" });

    // If there are no file uploaded just makes it falsy so the imageUrl in database don't change.
    let newImgUrl;

    if (req.file) {
      // Upload new img url in cloudinary
      const image = await cloudinary.uploader.upload(req.file.path, {
        asset_folder: "Ecommerce/Admin", //folder path in cloudinary
      });

      if (!image) {
        console.log("Uploading in cloudinar failed");
        return res
          .status(500)
          .json({ message: "Something went wrong. Please try again." });
      }

      // If there are imageUrl existing, but if it is the first time uploading there's no imageUrl to delete in cloudinary.
      // Before storing new secure_url in newImgUrl, delete the old imgurl in cloudinary.
      const { imageUrl } = admin;
      if (imageUrl) {
        const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
        const deleteOldImgUrl = await cloudinary.uploader.destroy(publicId);

        if (!deleteOldImgUrl) {
          console.log("Deleting in cloudinary failed");
          return res.status(500).json({ message: "Something went wrong." });
        }
      }

      newImgUrl = image.secure_url;
    } else {
      newImgUrl = "";
    }

    admin.username = req.body.username || admin.username;
    admin.email = req.body.email || admin.email;
    admin.imageUrl = newImgUrl || admin.imageUrl;

    const updatedAdmin = await admin.save();

    res.status(200).json({
      id: updatedAdmin._id,
      username: updatedAdmin.username,
      email: updatedAdmin.email,
      imageUrl: updatedAdmin.imageUrl,
      message: "Updated admin successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};

//Get Admin by token
export const getAdmin = async (req, res) => {
  const admin = req.admin;

  res.status(200).json(admin);
};

// Logout
export const logout = async (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ message: "Logout Admin" });
};
