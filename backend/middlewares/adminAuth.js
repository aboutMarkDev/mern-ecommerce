import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const adminProtect = async (req, res, next) => {
  const { admin_token } = req.cookies;

  if (admin_token) {
    try {
      const decoded = jwt.verify(admin_token, process.env.JWT_ADMIN_SECRET);

      req.admin = await Admin.findById(decoded.adminId).select("-password");

      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token." });
  }
};

export default adminProtect;
