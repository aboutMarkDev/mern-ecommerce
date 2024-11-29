import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token." });
  }
};

export default checkToken;
